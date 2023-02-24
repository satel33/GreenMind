/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ref, ref } from '@nuxtjs/composition-api';
import { Context, useVSFContext } from '@vue-storefront/core';

interface IUseAnyPayPayment {
  getPaymentExternal: () => void;
  paymentExternalResponse: Ref<any>
}

const useAnyPayPayment = (acquirerId: number) : IUseAnyPayPayment => {
  const context: Context = useVSFContext();

  const paymentExternalResponse = ref(null);

  const getPaymentExternal = async () => {

    const { data } = await context.$odoo.api.anyPayPaymentMakeExternal({
      acquirerId
    });

    paymentExternalResponse.value = data.anydayTransaction.transaction;
  };

  return {
    getPaymentExternal,
    paymentExternalResponse
  };
};

export default useAnyPayPayment;
