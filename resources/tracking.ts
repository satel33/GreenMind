/* eslint-disable camelcase */
import { Category, OrderLine } from '@vue-storefront/odoo-api';
import { CombinationInfo, GreenOrderLine, GreenProduct, GA_EVENTS, IGACart, IGADataLayer, IGAECommerce, IGAProduct, IGAPurchaseInfo } from '~/green-api/types';

const pushToDataLayer = (trackingData: IGADataLayer) => {
  (window as any)?.dataLayer?.push(trackingData);
};

const createAnalyticsProductList = (mappedProducts: IGAProduct[], accessoriesProducts: IGAProduct[]) => {
  const combineProductsLists = mappedProducts.concat(accessoriesProducts);

  return combineProductsLists.map((product, index) => {
    product.index = index + 1;
    return product;
  });
};

const mapOrderLine = (orderLine: GreenOrderLine): GreenProduct => {
  const product = { ...orderLine.product };
  product.qty = orderLine.quantity;

  return product;
};

// Maps the storeFront product to Google Analytics product
// Reference: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_payment_info_item
const mapProduct = (product: GreenProduct, index = 0): IGAProduct => {
  const categories = product.categories ? product.categories[0] : null;
  const mappedCategories = categories ? mapCategories(categories) : {};
  let mappedProduct = {
    item_id: product.id,
    item_name: product?.name,
    affiliation: 'Greenmind.dk',
    currency: product.currency?.name,
    index: index + 1,
    ...mappedCategories,
    price: product?.price,
    discount: product?.combinationInfoVariant?.has_discounted_price ? product?.combinationInfoVariant?.discount : null,
    quantity: 1,
    item_variant: product.combinationInfoVariant ? product.combinationInfoVariant.grade_name : null,
    item_brand: product?.manufacturerName
  };

  if (product.googleAnalytics) {
    mappedProduct = { ...mappedProduct, ...product.googleAnalytics };
  }

  return mappedProduct;
};

const mapCategories = (category: Category) => {
  const categoriesObj = {};
  const categories = getCategories(category);

  categories.forEach((categoryName, index) => {
    if (5 > index) {
      categoriesObj[`item_category${index > 0 ? index + 1 : ''}`] = categoryName;
    }
  });

  return categoriesObj;
};

const getCategories = (category: Category, mappedCategories = []) => {
  for (const prop in category) {
    if (prop == 'parent') {
      mappedCategories.unshift(category.name);

      return getCategories(category[prop], mappedCategories);
    }
  }
  return mappedCategories;
};

const mapProducts = (products: GreenProduct[]) => {
  return products
    .map((product, index) => {
      const mappedProducts = mapProduct(product, index);

      mappedProducts.item_addon = false;

      return mappedProducts;
    })
    .filter((product) => product !== undefined);
};

const mapOrderLines = (orderLines: GreenOrderLine[], addon: boolean) => {
  return orderLines
    .map((orderLine, index) => {
      const mappedOrderLine = mapOrderLine(orderLine);
      const product = mapProduct(mappedOrderLine, index);
      product.item_addon = addon;
      return product;
    })
    .filter((product) => product !== undefined);
};

const getAnalyticValue = (combinationInfo: CombinationInfo) => {
  return combinationInfo.has_discounted_price ? combinationInfo.price : combinationInfo.list_price;
};

const trackAddPersonalInfo = (ecommerce: IGAECommerce) => {
  pushToDataLayer({ event: GA_EVENTS.addPersonalInfo, ecommerce });
};

const addItemAddon = (accessories: GreenOrderLine[] | null, orderLines: OrderLine[]) => {
  if (accessories && accessories.length > 0) {
    const accessoriesIds = accessories.map((accessories) => accessories.product.id);
    const orderLinesFilteredForAccessories = orderLines.filter((orderLine) => {
      if (accessoriesIds.indexOf(orderLine.product.id) !== -1) {
        return orderLine;
      }
    });
    const orderLineProduct = orderLinesFilteredForAccessories.map((orderLine) => {
      const product = { ...orderLine.product } as GreenProduct;

      const mappedProduct = mapProduct(product);
      mappedProduct.item_addon = true;

      return mappedProduct;
    });
    return orderLineProduct;
  } else {
    return [];
  }
};

const trackViewItem = (currency: string, value: number, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: GA_EVENTS.viewItem,
    ecommerce: {
      currency: currency,
      value: value,
      items: [...products]
    }
  });
};

const trackViewItemList = (itemListId: string, itemListName: string, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: GA_EVENTS.viewItemList,
    ecommerce: {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items: [...products]
    }
  });
};

const trackSelectItem = (itemListId: string, itemListName: string, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: GA_EVENTS.selectItem,
    ecommerce: {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items: [...products]
    }
  });
};

const trackViewCart = (currency: string, value: number, products: IGAProduct[]) => {
  pushToDataLayer({ event: GA_EVENTS.viewCart, ecommerce: { currency: currency, value: value, items: [...products] } });
};

const trackAddToCart = (currency: string, value: number, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: GA_EVENTS.addToCart,
    ecommerce: {
      currency: currency,
      value: value,
      items: [...products]
    }
  });
};

const trackRemoveFromCart = (ecommerce: IGAECommerce) => {
  pushToDataLayer({ event: GA_EVENTS.removeFromCart, ecommerce });
};

const trackAddPaymentInfo = (currency: string, value: number, paymentType: string, products: IGAProduct[], coupon?: string) => {
  (window as any)?.dataLayer?.push({
    event: GA_EVENTS.addPaymentInfo,
    ecommerce: {
      currency: currency,
      value: value,
      payment_type: paymentType,
      coupon: coupon,
      items: [...products]
    }
  });
};

const trackAddShippingInfo = (currency: string, value: number, shippingTier: string, products: IGAProduct[], coupon?: string) => {
  (window as any)?.dataLayer?.push({
    event: GA_EVENTS.addShippingInfo,
    ecommerce: {
      currency: currency,
      value: value,
      shipping_tier: shippingTier,
      coupon: coupon,
      items: [...products]
    }
  });
};

const trackBeginCheckout = (currency: string, value: number, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: GA_EVENTS.beginCheckout,
    ecommerce: {
      currency: currency,
      value: value,
      items: [...products]
    }
  });
};

const trackPurchase = (purchaseInfo: IGAPurchaseInfo, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: GA_EVENTS.purchase,
    ecommerce: {
      transaction_id: purchaseInfo.transaction_id,
      value: purchaseInfo.value,
      tax: purchaseInfo.tax,
      shipping: purchaseInfo.shipping,
      currency: purchaseInfo.currency,
      coupon: purchaseInfo?.coupon,
      items: [...products]
    }
  });
};

export const setTrackAddPersonalInfo = (value: number, cart: IGACart): void => {
  const mappedProducts = mapProducts(cart.products);

  const productAsAccessory = addItemAddon(cart.accessories, cart.orderLines);

  const analyticsProducts = createAnalyticsProductList(mappedProducts, productAsAccessory);

  const ecommerce = {
    currency: mappedProducts[0].currency,
    value: value,
    items: analyticsProducts
  };

  trackAddPersonalInfo(ecommerce);
};

export const setTrackViewItem = (product: GreenProduct): any => {
  const mappedProduct = mapProduct(product);

  const itemValue = product.combinationInfoVariant?.has_discounted_price ? product.combinationInfoVariant?.price : product.price;

  trackViewItem(product.currency?.name, itemValue, [mappedProduct]);
};

export const setTrackViewItemList = (itemListId: string, itemListName: string, products: GreenProduct[]): any => {
  const mappedProducts = products.map((product, index) => {
    return mapProduct(product, index);
  });

  mappedProducts.forEach((product) => {
    product.item_list_id = itemListId;
    product.item_list_name = itemListName;
  });

  trackViewItemList(itemListId, itemListName, mappedProducts);
};

export const setTrackSelectItem = (itemListId: string, itemListName: string, product: GreenProduct, index: number): any => {
  const mappedProduct = mapProduct(product);
  mappedProduct.index = index + 1;

  mappedProduct.item_list_id = itemListId;
  mappedProduct.item_list_name = itemListName;

  trackSelectItem(itemListId, itemListName, [mappedProduct]);
};

export const setTrackViewCart = (value: number, cart: IGACart): void => {
  const mappedProducts = mapProducts(cart.products);

  const productsAsAccessory = addItemAddon(cart.accessories, cart.orderLines);

  const analyticsProducts = createAnalyticsProductList(mappedProducts, productsAsAccessory);

  const getCurrency: string = mappedProducts[0].currency;

  trackViewCart(getCurrency, value, analyticsProducts);
};

export const setTrackBeginCheckout = (value: number, cart: IGACart, currency?: string): any => {
  const mappedProducts = cart.products
    .map((orderLine, index) => {
      const mappedOrderLine = mapOrderLine(orderLine);
      const mappedProduct = mapProduct(mappedOrderLine, index);
      mappedProduct.item_addon = false;

      return mappedProduct;
    })
    .filter((product) => product !== undefined);

  const productAsAccessory = addItemAddon(cart.accessories, cart.orderLines);

  const analyticsProducts = createAnalyticsProductList(mappedProducts, productAsAccessory);

  const getCurrency: string = currency ? currency : mappedProducts[0].currency;

  trackBeginCheckout(getCurrency, value, analyticsProducts);
};

export const setAddToCart = (product: GreenProduct, isAddon: boolean, accessories?: GreenProduct[]): void => {
  const mappedProduct = mapProduct(product);
  const currency = mappedProduct.currency;
  const itemValue = product.hasDiscountedPrice ? product.priceAfterDiscount : product.price;
  mappedProduct.item_addon = isAddon;

  let mappedAccessories = [];

  if (accessories && accessories.length > 0) {
    mappedAccessories = accessories.map((accessory) => {
      const product = mapProduct(accessory);
      product.item_addon = true;
      return product;
    });
  }

  const analyticsProducts = createAnalyticsProductList([mappedProduct], mappedAccessories);

  trackAddToCart(currency, itemValue, analyticsProducts);
};

export const setTrackRemoveFromCart = (orderLine: GreenOrderLine): void => {
  const mappedOrderLine = mapOrderLine(orderLine);
  const mappedProduct = mapProduct(mappedOrderLine);

  const getCurrency = mappedProduct?.currency;
  const itemValue = orderLine.priceTotal;

  mappedProduct.item_addon = false;

  let mappedAccessories: IGAProduct[] | [] = [];

  if (orderLine.accessories) {
    const accessoriesIds = orderLine.accessories.map((accessories) => accessories.product.id);

    const accessories = orderLine.product.accessoryProducts.filter((product) => [...accessoriesIds].indexOf(product.id) !== -1);

    mappedAccessories = accessories.map((accessory) => {
      const product = mapProduct(accessory);
      product.item_addon = true;
      return product;
    });
  }

  const analyticsProducts = createAnalyticsProductList([mappedProduct], mappedAccessories);

  trackRemoveFromCart({ currency: getCurrency, value: itemValue, items: analyticsProducts });
};

export const setTrackRemoveAccessoryFromCart = (accessoryProduct: GreenProduct): void => {
  const mappedProduct = mapProduct(accessoryProduct);
  const itemValue = getAnalyticValue(accessoryProduct.combinationInfoVariant);

  mappedProduct.item_addon = true;

  trackRemoveFromCart({ currency: 'DKK', value: itemValue, items: [mappedProduct] });
};

export const setTrackAddShippingInfo = (value: number, cart: IGACart, shippingTier: string, currency?: string): void => {
  const mappedProducts = mapProducts(cart.products);

  const productAsAccessory = addItemAddon(cart.accessories, cart.orderLines);

  const analyticsProducts = createAnalyticsProductList(mappedProducts, productAsAccessory);

  const getCurrency: string = currency ? currency : mappedProducts[0].currency;

  const getShipping = shippingTier ? shippingTier : '';

  trackAddShippingInfo(getCurrency, value, getShipping, analyticsProducts);
};

export const setTrackAddPaymentInfo = (value: number, cart: IGACart, paymentType: string): void => {
  const mappedProducts = mapOrderLines(cart.products, false);

  const productAsAccessory = addItemAddon(cart.accessories, cart.orderLines);

  const analyticsProducts = createAnalyticsProductList(mappedProducts, productAsAccessory);

  const getCurrency = mappedProducts[0].currency;

  trackAddPaymentInfo(getCurrency, value, paymentType, analyticsProducts);
};

export const setPurchaseTracking = (purchaseInfo: IGAPurchaseInfo, orderLines: GreenOrderLine[], accessories: GreenOrderLine[]): void => {
  const mappedProducts = mapOrderLines(orderLines, false);

  const mappedAccessories = mapOrderLines(accessories, true);

  const analyticsProducts = createAnalyticsProductList(mappedProducts, mappedAccessories);

  const getCurrency = mappedProducts[0].currency;

  purchaseInfo.currency = getCurrency;

  trackPurchase(purchaseInfo, analyticsProducts);
};
