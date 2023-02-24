import { cartGetters } from '@vue-storefront/odoo';
import { GreenOrderLine, GreenCart } from '~/green-api/types';

export const getItemTitle = (orderLine: GreenOrderLine): string =>
  `${orderLine.product?.manufacturerName} ${orderLine.product?.name}` || 'Product name';

export const getItemImageFilename = (orderLine: GreenOrderLine): string =>
  orderLine?.product?.imageFilename || 'Product filename';

export const getItemWebsiteTitle = (orderLine: GreenOrderLine): string =>
  orderLine?.product?.websiteSubtitle || null;

export const getStandGradeName = (orderLine: GreenOrderLine): string => {
  return orderLine?.product?.combinationInfoVariant?.grade_name || '';
};

export const getItemsWithoutDiscounts = (cart: GreenCart): GreenOrderLine[] => cart?.order?.websiteOrderLine
  ?.filter(item => !item.coupon && !item.giftCard) || [];

export const getItems = (cart: GreenCart): GreenOrderLine[] => cart?.order?.websiteOrderLine;

export const cartIsEmpty = (cart: GreenCart): boolean => cart?.order?.websiteOrderLine.length === 0;

export const getSubTotal = (cart: GreenCart): number => cart?.order?.amountSubtotal;

export const getDiscountsByCoupon = (cart: GreenCart): number => cart?.order?.amountDiscounts;

export const getDiscountsByGiftCards = (cart: GreenCart): number => cart?.order?.amountGiftCards;

export const getTotalItems = (cart: GreenCart): number => cart?.order?.totalCount || 0;

export const getCartDiscounts = (cart: GreenCart): number => cart?.order?.amountDiscounts || 0;

export const getOrderLineDiscount = (orderLine: GreenOrderLine): number => orderLine?.discount || 0;

export const getOrderLineFixedDiscount = (orderLine: GreenOrderLine): number => orderLine?.discountFixedPrice || 0;

export const getAccessories = (cart: GreenCart): GreenOrderLine[] => cart?.order?.accessoryLines;

export const getAccessoriesFromOrderLine = (orderLine: GreenOrderLine): GreenOrderLine[] => orderLine.accessories;

export const accessoryIsInCart = (cart: GreenCart, acessoryId: number): boolean => {
  return cart?.order?.accessoryLines?.some(item => item.product?.id === acessoryId);
};

export const getPrice = (cart: GreenCart, orderLine: GreenOrderLine): number => {
  let totalAccessoryValue = 0;
  orderLine.product?.accessoryProducts?.forEach(accessory => {
    if (accessoryIsInCart(cart, accessory.id)) {
      totalAccessoryValue += accessory?.combinationInfoVariant?.price;
    }
  });

  return totalAccessoryValue + orderLine.product?.combinationInfoVariant?.price;
};

export const getPriceWithoutDiscountFromOrderLine = (orderLine: GreenOrderLine): number => {
  return orderLine?.product?.price * orderLine.quantity;
};

const getters = {
  ...cartGetters,
  getCartDiscounts,
  getOrderLineDiscount,
  getOrderLineFixedDiscount,
  getItemTitle,
  getItemWebsiteTitle,
  getItems,
  getTotalItems,
  getAccessories,
  getPrice,
  accessoryIsInCart,
  getItemImageFilename,
  getStandGradeName,
  getDiscountsByCoupon,
  getDiscountsByGiftCards,
  getItemsWithoutDiscounts,
  getAccessoriesFromOrderLine,
  getPriceWithoutDiscountFromOrderLine,
  getSubTotal,
  cartIsEmpty
};

export default getters;
