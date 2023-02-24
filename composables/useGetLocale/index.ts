/* eslint-disable no-prototype-builtins */
import { ssrRef } from '@nuxtjs/composition-api';
import { Context } from '@vue-storefront/core';
import { useVSFContext } from '@vue-storefront/core';

const useGetLocale = (): any => {
  const context: Context = useVSFContext();

  const getLocale = () => {
    return context.$config;
  };
  return {
    getLocale
  };
};

export default useGetLocale;
