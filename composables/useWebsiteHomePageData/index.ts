import { Ref, ssrRef } from '@nuxtjs/composition-api';
import { Context, useVSFContext } from '@vue-storefront/core';
import { WebsiteHomepage } from '~/green-api/types';

interface IUseWebsiteHomePageData {
  getData: () => void;
  mapColorClass: (color: string) => string;
  websiteHomePageData: Ref<WebsiteHomepage>
}

const useWebsiteHomePageData = (): IUseWebsiteHomePageData => {
  const context: Context = useVSFContext();
  const websiteHomePageData = ssrRef<WebsiteHomepage>(null, 'webisteHomePage');

  const getData = async () => {
    const { data } = await context.$odoo.api.getWebsiteHomePageData();
    websiteHomePageData.value = data?.websiteHomepage || {};
  };

  const mapColorClass = (odooColorName: string) : string => {
    switch (odooColorName) {
      case 'black': return 'text-black';
      case 'white': return 'text-white';
      case 'dark_green': return 'text-pine-primary-dark';
      case 'light_green': return 'text-fern-primary-light';
      default: return odooColorName;
    }
  };

  return {
    websiteHomePageData,

    mapColorClass,
    getData
  };
};

export default useWebsiteHomePageData;
