<template>
  <div>
    <div class="checkout  mb-10">
      <div class="checkout__main">
        <SfSteps
          :active="currentStepIndex"
          :class="{ checkout__steps: true }"
          @change="handleStepByNumber"
        >
          <SfStep
            v-for="(step, key) in STEPS"
            :key="key"
            :name="$t(step)"
          >
            <nuxt-child @change="handleStepClick" @loading="loading = arguments[0]" />
          </SfStep>
        </SfSteps>
      </div>
      <div class="checkout__aside">
        <transition name="fade">
          <LazyCheckoutCartPreview key="order-summary" />
        </transition>
      </div>
    </div>
    <GreenProductRecommendationsClerk
      v-if="clerkProductId"
      :id="'checkout-accessories-products-recommendation'"
      class="layout py-14 mx-auto"
      :attr="{
        'data-template': '@checkout-flow-accessories-recommendation',
        'data-products': `[${clerkProductId}]`,
      }"
    >
      <SfHeading
        class="mb-10 product-recommendations__heading"
        :title="$t('Missing something')"
        :level="2"
      />
    </GreenProductRecommendationsClerk>
  </div>
</template>
<script>
import { computed, defineComponent, onMounted, ref, useRoute, useRouter } from '@nuxtjs/composition-api';
import { SfHeading, SfSteps } from '@storefront-ui/vue';
import { useCart } from '@vue-storefront/odoo';
import GreenProductRecommendationsClerk from '~/components/core/organisms/GreenProductRecommendationsClerk.vue';
import { usePartner } from '~/composables';
import { setTrackBeginCheckout } from '~/resources/tracking';
import { cartGetters } from '~/composables';

const STEPS = {
  personaldetails: 'Personal details',
  shipping: 'Shipping',
  revieworder: 'Review Order',
  payment: 'Payment'
};

export default defineComponent({
  name: 'Checkout',
  components: {
    SfSteps,
    SfHeading,
    GreenProductRecommendationsClerk
  },
  layout: 'checkout',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { load, cart, setCart } = useCart();
    const { partner } = usePartner();
    const clerkProductId = ref(null);
    const loading = ref(false);

    partner.value.name = cart?.value?.order?.partnerShipping?.name || null;
    partner.value.email = cart?.value?.order?.partnerShipping?.email || null;

    const currentStep = computed(() => route.value.path?.split('/').pop());
    const currentStepIndex = computed(() => Object.keys(STEPS).findIndex((s) => s === currentStep.value));
    const accessories = computed(() => cartGetters.getAccessories(cart.value));

    const hasPartnerShipping = computed(
      () =>
        cart.value?.order?.partnerShipping?.id !== null &&
        cart.value?.order?.partnerShipping?.email !== null &&
        cart.value?.order?.partnerShipping?.country !== null &&
        cart.value?.order?.partnerShipping?.name !== null &&
        cart.value?.order?.partnerShipping?.phone !== null &&
        cart.value?.order?.partnerShipping?.street !== null &&
        cart.value?.order?.partnerShipping?.zip !== null
    );

    const hasPartnerInvoice = computed(
      () =>
        cart.value?.order?.partnerInvoice?.id !== null &&
        cart.value?.order?.partnerInvoice?.email !== null &&
        cart.value?.order?.partnerInvoice?.country !== null &&
        cart.value?.order?.partnerInvoice?.name !== null &&
        cart.value?.order?.partnerInvoice?.phone !== null &&
        cart.value?.order?.partnerInvoice?.street !== null &&
        cart.value?.order?.partnerInvoice?.zip !== null
    );

    const partnerIsSaved = computed(
      () => partner?.value?.name && !partner?.value?.name?.toUpperCase()?.includes('PUBLIC')
    );

    const handleStepClick = async (step) => {
      if (loading.value) {
        return;
      }

      setCart(null);
      loading.value = true;
      await load({ customQuery: { cartLoad: 'greenCartLoadUpdate' } });
      loading.value = false;

      if (!partnerIsSaved.value) {
        return;
      }

      if (step === 'revieworder' && (!hasPartnerShipping.value || !hasPartnerInvoice.value)) {
        return;
      }

      if (step === 'payment' && (!hasPartnerShipping.value || !hasPartnerInvoice.value) && !partnerIsSaved.value) {
        return;
      }
      router.push(`/checkout/${step}`);
    };

    const handleStepByNumber = async (stepNumber) => {
      if (loading.value) {
        return;
      }

      const stepNameIndex = Object.keys(STEPS)[stepNumber];
      if (!partnerIsSaved.value) {
        return;
      }

      if (stepNameIndex === 'revieworder' && (!hasPartnerShipping.value || !hasPartnerInvoice.value)) {
        return;
      }

      if (stepNameIndex === 'payment') {
        return;
      }

      loading.value = true;
      setCart(null);
      await load({ customQuery: { cartLoad: 'greenCartLoadUpdate' } });
      loading.value = false;

      router.push({ name: stepNameIndex });
    };

    const findMostExpensiveProductId = (products) => {
      return products.reduce((prev, current) => {
        return prev.product.price > current.product.price ? prev : current;
      }).product.id;
    };

    onMounted(() => {
      const products = cart.value?.order?.websiteOrderLine?.map((orderLine) => orderLine);
      const orderLines = cart.value?.order?.orderLines;
      if (products && products.length > 0) {
        if (products.length === 1) clerkProductId.value = products[0].product.id;
        else clerkProductId.value = findMostExpensiveProductId(products);

        if (currentStepIndex.value === 0) {
          setTrackBeginCheckout(cart.value?.order?.amountTotal, {products: products, accessories: accessories.value, orderLines: orderLines});
        }
      }
    });

    return {
      loading,
      cart,
      hasPartnerInvoice,
      hasPartnerShipping,
      partner,
      partnerIsSaved,
      handleStepByNumber,
      handleStepClick,
      STEPS,
      currentStepIndex,
      currentStep,
      clerkProductId
    };
  }
});
</script>

<style
  lang="scss"
  scoped
>
@import '~/assets/css/checkout.scss';
</style>
