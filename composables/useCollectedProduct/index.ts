import { computed, Ref } from '@nuxtjs/composition-api';
import { useCart, useMultipleProduct } from '@vue-storefront/odoo';
import { Product } from '@vue-storefront/odoo-api';
import { cartGetters } from '~/composables';
import { GreenCart, GreenOrderLine, GreenProduct } from '~/green-api/types';
import { setAddToCart, setTrackRemoveAccessoryFromCart, setTrackRemoveFromCart } from '~/resources/tracking';

const useCollectedProduct = (orderLine?: Ref<GreenOrderLine>): any => {
  const { updateItemQty, cart, loading } = useCart();
  const { addMultipleProductsToCart, removeMultipleProductsFromCart, loading: multipleLoading } = useMultipleProduct();

  const orderLineHasAccessory = (accessoryProductId: number) => {
    return orderLine.value?.accessories?.map((item) => item.product.id)?.includes(accessoryProductId) || false;
  };

  const anyLoading = computed(() => loading.value || multipleLoading.value);

  const getPrice = (orderLine: GreenOrderLine) => cartGetters.getPrice(cart.value as GreenCart, orderLine);

  const handleRemoveItemAndAccessories = async (currentOrderLine: GreenOrderLine) => {
    if (anyLoading.value) {
      return;
    }

    await removeMultipleProductsFromCart({
      lineIds: [currentOrderLine.id],
      customQuery: { cartRemoveMultipleItems: 'greenCartRemoveMultipleItem' }
    });
    // GA - tracking: Remove from cart
    setTrackRemoveFromCart(currentOrderLine);
  };

  const handleUpdateItem = async (currentOrderLine: GreenOrderLine, quantity: number) => {

    if (anyLoading.value || Number(quantity) === currentOrderLine.quantity) {
      quantity = currentOrderLine.quantity;
      return;
    }
    await updateItemQty({
      product: currentOrderLine,
      quantity: Number(quantity),
      customQuery: { cartUpdateItemQty: 'greenCartUpdateItemQty' }
    });
  };

  const buildParamsToMultipleAdd = (accessoryToIds: Array<number>, productQuantity: number) => ({
    products: [
      {
        id: orderLine.value.product?.id,
        quantity: productQuantity,
        accessoryToIds
      }
    ],
    customQuery: { cartAddMultipleItems: 'greenCartAddMultipleItem' }
  });

  const handleRemoveAccessory = async (accessoryProduct: Product, productQuantity: number) => {
    const accessoryToIds = orderLine.value?.accessories
      ?.filter((acessoryLine) => acessoryLine.product.id !== accessoryProduct.id)
      .map((acessoryLine) => acessoryLine.product.id);

    await addMultipleProductsToCart(buildParamsToMultipleAdd(accessoryToIds, productQuantity));

    // GA - tracking: Remove from cart
    setTrackRemoveAccessoryFromCart(accessoryProduct as GreenProduct);
  };

  const handleAddAccessory = async (accessoryProduct: GreenProduct, productQuantity: number) => {
    const accessoriesAlreadyInOrderLine = orderLine?.value.accessories?.map((accessory) => accessory?.product?.id) || [];

    const accessoryToIds = [accessoryProduct.id, ...accessoriesAlreadyInOrderLine];

    await addMultipleProductsToCart(buildParamsToMultipleAdd(accessoryToIds, productQuantity));

    // GA - tracking:  Add to cart
    setAddToCart(accessoryProduct, true);
  };

  const handleAddOrRemoveAccessory = async (accessoryProduct: GreenProduct, productQuantity: number) => {
    if (anyLoading.value) {
      return;
    }

    if (orderLineHasAccessory(accessoryProduct.id)) {
      return handleRemoveAccessory(accessoryProduct, productQuantity);
    }

    return handleAddAccessory(accessoryProduct, productQuantity);
  };

  return {
    loading: anyLoading,
    handleRemoveItemAndAccessories,
    handleAddOrRemoveAccessory,
    handleUpdateItem,
    orderLineHasAccessory,
    getPrice
  };
};

export default useCollectedProduct;
