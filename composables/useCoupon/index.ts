import { Context, useVSFContext } from '@vue-storefront/core';
import { ref } from '@vue/composition-api';
import { ApplyCouponInput } from '~/green-api/types';

const useCoupon = () : any => {
  const context: Context = useVSFContext();
  const loading = ref(false);
  const error = ref(null);

  const applyCoupon = async (code: string) => {
    loading.value = true;

    const params : ApplyCouponInput = {
      promo: code
    };

    try {
      const { data } = await context.$odoo.api.applyCoupon(params);
      const errorResponse = data?.applyCoupon?.error;

      if (errorResponse && errorResponse !== 'false') {
        error.value = errorResponse || 'Some error occur.';
        return;
      }

      return data;
    } catch (err) {
      error.value = err.response?.data?.graphQLErrors?.[0]?.message;
    } finally {
      loading.value = false;
    }

  };

  return {
    loading,
    error,
    applyCoupon
  };
};

export default useCoupon;
