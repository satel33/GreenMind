import { Context, sharedRef, useVSFContext } from '@vue-storefront/core';
import type { Ref } from '@vue/composition-api';
import { ref } from '@vue/composition-api';
import { Partner } from '@vue-storefront/odoo-api';
import { CreateUpdatePartnerInput } from '~/green-api/types';

const usePartner = () : any => {
  const context: Context = useVSFContext();

  const loading = ref(false);

  const error = ref(null);

  const partner: Ref<Partner> = sharedRef({
    name: null,
    email: null
  }, 'partner');

  const createUpdatePartner = async (params: CreateUpdatePartnerInput) => {
    loading.value = true;

    try {
      const { data } = await context.$odoo.api.createUpdatePartner(params);
      partner.value = data.createUpdatePartner;

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
    partner,
    createUpdatePartner
  };
};

export default usePartner;
