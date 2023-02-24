import { Ref } from '@nuxtjs/composition-api';
import { Context, sharedRef, useVSFContext } from '@vue-storefront/core';
import { GreenProduct } from '~/green-api/types';

interface IUseClerk {
  getPopularProducts: () => void;
  popularProducts: Ref<GreenProduct>
}

const useClerk = (): IUseClerk => {
  const context: Context = useVSFContext();
  const popularProducts = sharedRef([], 'popular-products');

  const getPopularProducts = async (): Promise<any> => {
    const { data } = await context.$odoo.api.getClerkPopularProducts();

    popularProducts.value = data?.products?.products || [];
  };

  return {
    getPopularProducts,
    popularProducts
  };
};

export default useClerk;
