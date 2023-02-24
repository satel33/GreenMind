<template>
  <div>
    <LazyHydrate when-idle>
      <LazyCheckoutAppHeader class="mb-10" />
    </LazyHydrate>

    <nuxt :key="$route.fullPath" />

    <LazyHydrate when-idle>
      <LayoutTheNotification />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LazyLayoutTheFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import { computed, onMounted, useRouter } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { usePartner } from '~/composables';
import { useCart } from '@vue-storefront/odoo';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'DefaultLayout',
  components: {
    LazyHydrate
  },
  setup (_, { root }) {
    const router = useRouter();
    const { load, cart } = useCart();
    const { partner } = usePartner();

    const hasPartnerShipping = computed(() =>
      cart.value?.order?.partnerShipping?.id !== null &&
      cart.value?.order?.partnerShipping?.email !== null &&
      cart.value?.order?.partnerShipping?.country !== null &&
      cart.value?.order?.partnerShipping?.name !== null
    );
    const hasPartnerInvoice = computed(() =>
      cart.value?.order?.partnerInvoice?.id !== null &&
      cart.value?.order?.partnerInvoice?.email !== null &&
      cart.value?.order?.partnerInvoice?.country !== null &&
      cart.value?.order?.partnerInvoice?.name !== null
    );

    const partnerIsSaved = computed(() => partner?.value?.name && !partner?.value?.name?.toUpperCase()?.includes('PUBLIC'));

    onSSR(async () => {
      await load({ customQuery: { cartLoad: 'greenCartLoadUpdate' } });
    });

    onMounted(() => {
      if (cart.value?.order?.websiteOrderLine.length === 0) {
        return router.push('/');
      }
      if (!partnerIsSaved.value) {
        return router.push('/checkout/personaldetails');
      }

      if (!hasPartnerShipping.value || !hasPartnerInvoice.value) {
        return router.push('/checkout/shipping');
      }
    });

    return {
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
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";
</style>
