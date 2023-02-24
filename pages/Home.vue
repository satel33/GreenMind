<template>
  <div>
    <LazyHydrate when-visible>
      <HomeMainSection :image="imageHeroBanner" :highlights="highlights" />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <LazyHomeProductListSection :popular-title="popularTitle" :products="popularProducts" />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <LazyHomeCallToActionSection
        :list="banners"
      />
    </LazyHydrate>

    <!-- <LazyHydrate when-idle>
      <HomeBlogArticleSection />
    </LazyHydrate>

    <LazyHydrate when-idle>
      <HomeCustomerReviewsSection />
    </LazyHydrate> -->

    <LazyHydrate when-idle>
      <LazyFooterMarqueeSection class="mt-16" :notices="notices" />
    </LazyHydrate>
  </div>
</template>

<script >
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { onSSR } from '@vue-storefront/core';
import { useWebsiteHomePageData, useWebsite, useClerk } from '~/composables';
import LazyHydrate from 'vue-lazy-hydration';

export default defineComponent({
  components: {
    LazyHydrate
  },
  setup(_props, { root}) {
    const { addTags } = useCache();
    const { info, getInfo } = useWebsite();
    const { getData, websiteHomePageData } = useWebsiteHomePageData();
    const { getPopularProducts, popularProducts } = useClerk();

    onSSR(async () => {
      await getData();
      await getInfo();
      await getPopularProducts();

      addTags([{ prefix: CacheTagPrefix.View, value: 'Home' }]);
    });

    const imageHeroBanner = computed(() => websiteHomePageData.value?.websiteHomepageHeroBanner?.[0] || {});
    const highlights = computed(() => websiteHomePageData.value?.websiteHomepageHighlight || []);
    const banners = computed(() => websiteHomePageData.value?.websiteHomepageBanner || []);
    const notices = computed(() => websiteHomePageData.value?.websiteHomepageNotice || []);
    const popularTitle = computed(() => websiteHomePageData.value?.websiteHomepagePopularTitle?.[0] || {});

    return {
      popularTitle,
      popularProducts,
      highlights,
      imageHeroBanner,
      banners,
      info,
      notices
    };
  },
  head() {
    return {
      title: this.info?.homepageTitleTag || 'GreenMind | Brugt elektronik med 3 års garanti',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this?.info?.homepageMetaDescription || 'Hos GreenMind kan du købe brugte telefoner, computere, tablets og andet elektronik med omtanke for miljøet. Alle vores produkter er kvalitetstestet, renset og istandsat af GreenMinds specialister. Se vores store udvalg online og i vores landsdækkende butikker.'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this?.info?.homepageMetaDescription || 'Hos GreenMind kan du købe brugte telefoner, computere, tablets og andet elektronik med omtanke for miljøet. Alle vores produkter er kvalitetstestet, renset og istandsat af GreenMinds specialister. Se vores store udvalg online og i vores landsdækkende butikker.'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this?.info?.homepageTitleTag || 'GreenMind | Brugt elektronik med 3 års garanti'
        }
      ]
    };
  },
  errorCaptured(err, vm, info) {
    if (vm.$config.logBrowserErrorsInApi === 'true') {
      vm.$vsf.$odoo.api.log({
        label: '[BROWSER ERROR]',
        userAgent: window?.navigator?.userAgent || '',
        level: 'error',
        route: vm.$route.path,
        queryParams: vm.$route?.query || '',
        component: vm.$options._componentTag,
        message: err.message,
        info
      });
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
