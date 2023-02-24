/* eslint-disable no-prototype-builtins */
import { ssrRef, ref, computed } from '@nuxtjs/composition-api';
import { useBilling, useUserBilling } from '@vue-storefront/odoo';

const useCheckoutBilling = (): any => {

  const { load: loadBilling, billing, save: saveBilling, loading } = useBilling();
  const { billing: userBilling, load: loadUserBilling, setDefaultAddress: setDefaultBillingAddress, loading: loadingUserBilling } = useUserBilling();

  const defaultBillingAddress = ref(false);
  const canAddNewBillingAddress = ssrRef(false, 'canAddNewBillingAddress');
  const newCurrentBillingAddressId = ref(null);

  const hasSavedBillingAddress = computed(() => {
    return Boolean(billing.value) && !billing.value?.name?.includes('Public');
  });

  const currentBillingAddressId = computed(() => billing.value?.id);

  const showBillingAddresses = computed(
    () => hasSavedBillingAddress.value && !canAddNewBillingAddress.value
  );

  const loadingBilling = computed(() => loading.value || loadingUserBilling.value);

  const handleAddNewBillingAddress = async (form) => {
    if (!form.city || !form.phone || !form.street || !form.zip) return;

    await saveBilling({
      params: {
        ...form,
        name: `${form.firstName} ${form.lastName}`,
        countryId: parseInt(form.country.id),
        id: userBilling.value?.[0]?.id ? userBilling.value?.[0]?.id : null,
        type: 'Billing'
      },
      billingDetails: null,
      customQuery: { billingAddAddress: 'greenAddAddress', billingAddress: 'greenUpdateAddress' }
    });

    await loadBilling();
    await loadUserBilling();
    // canAddNewBillingAddress.value = false;
  };

  const handleSetCurrentBillingAddress = (address) => {
    canAddNewBillingAddress.value = true;
    newCurrentBillingAddressId.value = address.id;
  };

  return {
    newCurrentBillingAddressId,
    handleSetCurrentBillingAddress,
    defaultBillingAddress,
    canAddNewBillingAddress,
    hasSavedBillingAddress,
    showBillingAddresses,
    currentBillingAddressId,
    handleAddNewBillingAddress,
    setDefaultBillingAddress,
    loadBilling,
    loadUserBilling,
    loadingBilling,
    userBilling,
    billing
  };
};

export default useCheckoutBilling;
