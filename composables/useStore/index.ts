import { useVSFContext, sharedRef } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';
import { ref, computed } from '@nuxtjs/composition-api';
import { GetStockInput } from '~/green-api/types';

const useStore = (productId: number): any => {
  const context: Context = useVSFContext();
  const stockList = sharedRef([], `stockList-${productId}`);
  const loading = ref(false);
  const error = ref({
    getStock: null
  });

  const getStock = async (params: GetStockInput): Promise<any> => {
    loading.value = true;

    try {
      const { data } = await context.$odoo.api.getStock(params);
      stockList.value = data?.stores?.stores?.map(element =>
        ({ ...element, qtyInWarehouse: data.stores.stock[element.id]})
      ) || [];

    } catch (err) {
      error.value.getStock = err.response?.data?.graphQLErrors?.[0];
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    stockList,
    getStock
  };
};

export default useStore;
