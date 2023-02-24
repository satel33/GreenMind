<template>
  <div>
    <LazyHydrate when-visible>
      <LayoutTheHeader :headers="headers" />
    </LazyHydrate>

    <LazyHydrate when-idle>
      <LayoutTheNavbar :menu="megaMenu" />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <LazyLayoutTheMegaMenuMobile :headers="headers" :menu="megaMenu" />
    </LazyHydrate>

    <main>
      <nuxt :key="$route.fullPath" class="pt-[147px]" />
    </main>

    <LazyHydrate when-idle>
      <LazyLayoutTheCartSidebar />
    </LazyHydrate>

    <LazyHydrate when-idle>
      <LazyLayoutTheNotification />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <LazyLayoutTheLoginModal />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LazyLayoutTheFooter :menu="footer" />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfOverlay :visible="isOverlayOpen" />
    </LazyHydrate>
  </div>
</template>

<script lang="ts">
import LazyHydrate from 'vue-lazy-hydration';
import { defineComponent, onMounted, computed } from '@nuxtjs/composition-api';
import { useWebsite, useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import { SfOverlay } from '@storefront-ui/vue';

export default defineComponent({
  name: 'DefaultLayout',

  components: {
    LazyHydrate, SfOverlay
  },
  setup({}, { root }) {
    const { getLayout, layout } = useWebsite();
    const { isOverlayOpen } = useUiState();

    onSSR(async () => {
      await getLayout();
    });

    const headers = computed(() => layout.value?.websiteMenu || []);
    const megaMenu = computed(() => layout.value?.websiteMegaMenu || []);
    const footer = computed(() => layout.value?.websiteFooter || []);

    /**
     * Including third party scripts on mounted to avoid them block the js parse and be late on waterfall loading
     * Include them in nuxt.config will work, but silently will slow performace
     */
    onMounted(() => {
      const e = document.createElement('script');
      e.type = 'text/javascript';
      e.id = 'Cookiebot';
      e.setAttribute('data-cbid', root.$config.cookieBotKey);
      e.src = 'https://consent.cookiebot.com/uc.js';
      const s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(e, s);
    });

    return {
      footer,
      megaMenu,
      headers,
      isOverlayOpen
    };
  },
  head: {
    script: [
      {
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'GreenMind',
          url: 'https://greenmind.dk/',
          logo: 'https://greenmind.dk/_nuxt/img/logo.21cf041.webp',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '',
            contactType: ''
          },
          sameAs: [
            'https://www.facebook.com/greenminddanmark',
            'https://www.youtube.com/channel/UChB0iRELVD0LzuRkWtwydyQ'
          ]
        }
      }
    ]
  }
});
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles';
@import '~/assets/styles.scss';
</style>
