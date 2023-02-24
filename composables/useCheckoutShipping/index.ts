/* eslint-disable no-prototype-builtins */
import { ssrRef, ref, computed } from '@nuxtjs/composition-api';
import { useShipping, useUserShipping } from '@vue-storefront/odoo';

const useCheckoutShipping = (): any => {

  const { load: loadShipping, shipping, save, loading } = useShipping();
  const { shipping: userShipping, load: loadUserShipping, setDefaultAddress: setDefaultShippingAddress, loading: loadingUserShipping } = useUserShipping();

  const defaultShippingAddress = ref(false);
  const canAddNewAddress = ssrRef(true, 'canAddNewAddress');
  const newCurrentShippingAddressId = ref(null);

  const hasSavedShippingAddress = computed(() => {
    return Boolean(shipping.value) && !shipping.value?.name?.includes('Public');
  });

  const currentAddressId = computed(() => shipping.value?.id);

  const showShippingAddresses = computed(
    () => hasSavedShippingAddress.value && !canAddNewAddress.value
  );

  const loadingShipping = computed(() => loading.value || loadingUserShipping.value);

  const handleAddNewAddress = async (form) => {
    if (!form.city || !form.phone || !form.street || !form.zip) return;

    await save({
      params: {
        ...form,
        name: `${form.firstName} ${form.lastName}`,
        countryId: parseInt(form.country.id),
        type: 'Shipping'
      },
      shippingDetails: null,
      customQuery: { shippingAddAdress: 'greenAddAddress', shippingUpdateAddress: 'greenUpdateAddress' }
    });

    await loadShipping();
    await loadUserShipping();
    // canAddNewAddress.value = false;
  };

  const handleSetCurrentShippingAddress = (address) => {
    // canAddNewAddress.value = true;
    newCurrentShippingAddressId.value = address.id;
  };

  return {
    newCurrentShippingAddressId,
    handleSetCurrentShippingAddress,
    defaultShippingAddress,
    canAddNewAddress,
    hasSavedShippingAddress,
    showShippingAddresses,
    currentAddressId,
    handleAddNewAddress,
    setDefaultShippingAddress,
    loadShipping,
    loadUserShipping,
    loadingShipping,
    userShipping,
    shipping
  };
};

export default useCheckoutShipping;
