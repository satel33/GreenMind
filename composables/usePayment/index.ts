import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';
import { ssrRef, ref } from '@nuxtjs/composition-api';

const usePayment = (newKey: string): any => {
  const context: Context = useVSFContext();
  const key = 'providerList' || newKey;
  const providerList = ssrRef([], key);
  const loading = ref(false);

  const getPaymentProviderList = async () => {

    const { data } = await context.$odoo.api.getPaymentAcquirerList();

    providerList.value = data?.paymentAcquirers || [];

    return providerList.value;
  };

  const getPaymentConfirmation = async () => {

    const { data, errors } = await context.$odoo.api.paymentConfirmation({}, { paymentConfirmation: 'greenConfirmationPayment' });

    if (errors && errors.length > 0) {
      throw new Error(errors[0]?.message);
    }

    return data.paymentConfirmation;
  };

  const makeGiftCardPayment = async () => {
    loading.value = true;
    const { data } = await context.$odoo.api.makeGiftCardPayment();

    loading.value = false;

    return data?.makeGiftCardPayment?.done;
  };

  return {
    loading,
    getPaymentConfirmation,
    getPaymentProviderList,
    providerList,
    makeGiftCardPayment
  };
};

export default usePayment;
