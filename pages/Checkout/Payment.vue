
<template>
  <div class="payment-page">
    <h3 class="title">
      {{ $t("Payment list") }}
    </h3>
    <div v-if="$breakpoints.sMd">
      <SfHeading
        :level="3"
        :title="$t('Gift Card')"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <GreenGiftCardForm />
    </div>

    <template v-if="totals.total !== 0">
      <div v-for="provider in providerList" :key="provider.id">
        <SfHeading
          :level="3"
          :title="provider.name"
          class="sf-heading--left sf-heading--no-underline title"
        />

        <GreenCheckbox
          v-model="selectedProvider"
          :value="provider"
          :disabled="paymentLoading"
          :is-checked="selectedProvider.id === provider.id"
          :has-general-wrapper="false"
          emit-value
          :label="provider.displayAs"
          @change="selectProvider"
        />
        <abstract-payment-observer v-if="selectedProvider.provider && (selectedProvider.id === provider.id)">
          <component
            :is="getComponentProviderByName(selectedProvider.provider)"
            class="py-8"
            :provider="selectedProvider"
            :cart="cart"
            @paymentLoading="setPaymentLoading"
            @isPaymentReady="isPaymentReady = arguments[0]"
            @paymentMethod="paymentMethod = arguments[0]"
            @providerPaymentHandler="providerPaymentHandler = arguments[0]"
            @paymentDone="trackAddPaymentInfo()"
          />
        </abstract-payment-observer>

        <GreenButton
          v-if="(selectedProvider.id === provider.id) && totals.total !== 0"
          style-type="Primary"
          color="Green"
          shape="Round"
          :loading="paymentLoading"
          :disabled="paymentLoading"
          :size="$device.isMobile ? 'Max' : 'Medium'"
          class="my-5"
          @click="providerPaymentHandler();"
        >
          {{ $t("Confirm & Pay") }}
        </GreenButton>
      </div>
    </template>

    <GreenButton
      v-else
      style-type="Primary"
      color="Green"
      shape="Round"
      :loading="loading"
      :disabled="!canFinishPayment"
      :size="$device.isMobile ? 'Max' : 'Medium'"
      class="my-5"
      @click="handleMakeGiftPayment"
    >
      {{ $t("Confirm & Pay") }}
    </GreenButton>

    <p v-if="cartExceedLimitTotalAmount" class="pt-4 text-primary-red">
      You can't pass over 50000!
    </p>
  </div>
</template>

<script >
import { SfHeading, SfImage } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { cartGetters, useCart, useMakeOrder } from '@vue-storefront/odoo';
import { computed, defineComponent, ref, useRouter, onMounted, watch } from '@nuxtjs/composition-api';
import { useUiHelpers, usePayment, useUiNotification } from '~/composables';
import { setTrackAddPaymentInfo } from '~/resources/tracking';

export default defineComponent({
  name: 'Payment',
  components: {
    SfHeading,
    SfImage,
    VsfPaymentProvider: () => import('~/components/Checkout/VsfPaymentProvider'),
    AdyenDirectPaymentProvider: () => import('~/components/Checkout/AdyenDirectPaymentProvider'),
    AdyenExternalPaymentProvider: () => import('~/components/Checkout/AdyenExternalPaymentProvider'),
    WireTransferPaymentProvider: () => import('~/components/Checkout/WireTransferPaymentProvider'),
    AbstractPaymentObserver: () => import('~/components/Checkout/AbstractPaymentObserver'),
    AnyDayPaymentProvider: () => import('~/components/Checkout/AnyDayPaymentProvider')
  },
  emits: ['status', 'loading'],
  setup(props, context) {
    const { cart, load } = useCart();
    const { send } = useUiNotification();
    const router = useRouter();

    const { loading, makeGiftCardPayment, providerList, getPaymentProviderList } = usePayment(String(cart.value?.order?.id));
    const { make } = useMakeOrder();
    const th = useUiHelpers();

    const isPaymentReady = ref(false);
    const paymentLoading = ref(false);
    const terms = ref(false);
    const selectedProvider = ref(false);
    const paymentMethod = ref(null);

    const selectProvider = (provider) => {
      isPaymentReady.value = false;
      selectedProvider.value = provider || {};
      context.emit('status');
    };

    onSSR(async () => {
      await load();
      await getPaymentProviderList();
    });

    const processOrder = async () => {
      await make();
    };

    const providerPaymentHandler = () => {};

    const cartExceedLimitTotalAmount = computed(() => cart?.value?.order?.amountTotal > 50000);

    const canFinishPayment = computed(() => (!cartExceedLimitTotalAmount.value && isPaymentReady.value) || cart?.value?.order?.amountTotal === 0);

    const providerListHasMoreThanOne = computed(
      () => providerList.value.length > 1
    );

    const totals = computed(() => cartGetters.getTotals(cart.value));

    const handleMakeGiftPayment = async () => {
      const response = await makeGiftCardPayment();
      if (!response) {
        send({ message: 'Some error occurr', type: 'danger' });
        return;
      }

      router.push({ name: 'successPaymentResponse'});
    };

    const trackAddPaymentInfo = () => {
      setTrackAddPaymentInfo(cart.value?.order?.amountTotal, {products: cart.value?.order?.websiteOrderLine,
        accessories: cart.value?.order?.accessoryLines,
        orderLines: cart.value?.order?.orderLines }, paymentMethod.value?.type);

      paymentMethod.value = null;
    };

    const selectDefaultProvider = () => {
      const adyenDirectProvider = providerList.value.find(item => item.provider === 'adyen');
      selectProvider(adyenDirectProvider || providerList.value[0]);
    };

    const setPaymentLoading = (flag) => {
      paymentLoading.value = flag;
      context.emit('loading', flag);
    };

    watch(
      () => providerList.value,
      () => selectDefaultProvider()
    );

    onMounted(() => {
      selectDefaultProvider();
    });

    return {
      setPaymentLoading,
      paymentMethod,
      paymentLoading,
      cart,
      handleMakeGiftPayment,
      cartExceedLimitTotalAmount,
      canFinishPayment,
      isPaymentReady,
      terms,
      loading,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals,
      tableHeaders: ['Description', 'Size', 'Color', 'Quantity', 'Amount'],
      cartGetters,
      processOrder,
      providerList,
      selectProvider,
      selectedProvider,
      providerListHasMoreThanOne,
      providerPaymentHandler,
      getComponentProviderByName: th.getComponentProviderByName,
      trackAddPaymentInfo
    };
  },
  head: {
    title: 'Greenmind | Payment'
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/payment.scss";
</style>
