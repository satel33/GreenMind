import { Ref, ref, ssrRef } from '@nuxtjs/composition-api';
import { Context, useVSFContext } from '@vue-storefront/core';
import { WebsiteLayout } from '~/green-api/types';

interface IUseWebsite {
  getLayout: () => void;
  getInfo: () => void;
  layout: Ref<WebsiteLayout>
  info: Ref<boolean>
}

const useWebsite = (): IUseWebsite => {
  const context: Context = useVSFContext();
  const info = ref(false);
  const layout = ssrRef<any>(null, 'webisteLayout');

  const getInfo = async (): Promise<any> => {
    const { data } = await context.$odoo.api.getWebsiteInfo();
    info.value = data?.website;
  };

  const getLayout = async (): Promise<any> => {
    const { data } = await context.$odoo.api.getWebsiteLayoutData();
    layout.value = data?.websiteLayout;
  };

  return {
    getLayout,
    getInfo,
    info,
    layout
  };
};

export default useWebsite;
