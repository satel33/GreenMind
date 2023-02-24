import { Context, useVSFContext } from '@vue-storefront/core';
import { ref } from '@vue/composition-api';
import { ApplyGiftCardInput } from '~/green-api/types';

const useGiftCard = () : any => {
  const context: Context = useVSFContext();
  const loading = ref(false);
  const error = ref(null);

  const applyGiftCard = async (code: string) => {
    loading.value = true;

    const params : ApplyGiftCardInput = {
      promo: code
    };

    try {
      const { data } = await context.$odoo.api.applyGiftCard(params);
      const errorResponse = data?.applyGiftCard?.error;

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
    applyGiftCard
  };
};

export default useGiftCard;
