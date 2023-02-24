<template>
  <div>
    <SfLoader :class="{ loader: loading }" :loading="loading" />
    <div id="dropin-container" ref="dropinDivElement" />
  </div>
</template>

<script>
/* eslint-disable camelcase */

import { ref, onMounted, useRouter, onUnmounted } from '@nuxtjs/composition-api';
import { useAdyenDirectPayment, useUiNotification } from '~/composables';
import { SfLoader } from '@storefront-ui/vue';
import { usePayment } from '~/composables';
import '@adyen/adyen-web/dist/adyen.css';
export default {
  name: 'AdyenDirectPaymentProvider',
  components: {
    SfLoader
  },
  props: {
    provider: {
      required: true,
      type: Object
    },
    cart: {
      required: true,
      type: Object
    }
  },
  emits: ['isPaymentReady', 'providerPaymentHandler', 'paymentLoading', 'paymentMethod', 'paymentDone'],
  setup(props, { emit, root }) {
    const adyenDropin = ref(null);
    const router = useRouter();
    const dropinDivElement = ref(null);
    const loading = ref(false);
    const loadingMakePayment = ref(false);
    const { send } = useUiNotification();
    const { getPaymentConfirmation } = usePayment('');

    const {
      openAdyenTransaction,
      getAdyenAcquirerInfo,
      getAdyenPaymentMethods,
      getAdyenTransactionInfo,
      paymentMethods,
      acquirerInfo,
      adyenMakeDirectPayment,
      transaction,
      transactionInfo,
      getAdyenPaymentDetails
    } = useAdyenDirectPayment(props.provider.id, props.cart?.order?.id);

    onMounted(async() => {
      const AdyenCheckout = require('@adyen/adyen-web');
      emit('paymentLoading', true);

      loading.value = true;
      try {
        await openAdyenTransaction();
        await getAdyenAcquirerInfo();
        await getAdyenPaymentMethods();
        await getAdyenTransactionInfo(transaction.value.reference);

      } catch (error) {
        send({ message: error, type: 'danger' });
      }

      const amount = {
        currency: transactionInfo.value?.currency?.name,
        value: transactionInfo.value?.amount
      };

      const environment = acquirerInfo.value.state === 'test' ? 'test' : 'live';

      const configuration = {
        locale: root.$config.nodeLocale,
        environment,
        clientKey: acquirerInfo.value.client_key,
        paymentMethodsResponse: paymentMethods.value,
        analytics: {
          enabled: false
        },
        paymentMethodsConfiguration: {
          googlepay: {
            // https://docs.adyen.com/payment-methods/google-pay/web-drop-in
            amount: {
              currency: transactionInfo.value?.currency?.name,
              value: transactionInfo.value?.amount * 100
            },
            environment,
            countryCode: process.env.NODE_LOCALE,
            showPayButton: true
          },
          paypal: {
            // https://docs.adyen.com/payment-methods/paypal/web-drop-in
            amount,
            showPayButton: true,
            onClick: () => {
            },
            onInit: (data, actions) => {
            }
          }
        },
        onPaymentCompleted: (result, component) => {
          router.push({name: 'paymentResponse'});
        },
        onError: (error, component) => {
          if (error.errorText !== 'error was cleared' && error.errorText !== 'incomplete field' &&
          (error.includes && !error?.includes('User closed the Payment'))) {
            send({ message: error?.message || error?.errorI18n || error?.errorText, type: 'danger' });
          }

          emit('paymentLoading', false);
        },
        onAdditionalDetails: async (state, dropin) => {
          if (state.data.details.paymentSource === 'paypal') {
            await getAdyenPaymentDetails({
              acquirerId: props.provider.id,
              reference: transaction.value.reference,
              details: state.data
            });

            const data = await getPaymentConfirmation();
            const paymentSuccess = data?.order?.lastTransaction?.state === 'Authorized' || data?.order?.lastTransaction?.state === 'Confirmed';
            if (paymentSuccess) {
              router.push({name: 'successPaymentResponse'});
              return;
            }
            router.push({name: 'failedPaymentResponse', query: root.$route.query});

          }
        },
        onChange: (state, component) => {

          if (component.isValid) {
            emit('isPaymentReady', true);
            return;
          }
          emit('isPaymentReady', false);
        },
        onSubmit: async(state, dropin) => {
          emit('isPaymentReady', false);
          emit('paymentLoading', true);
          emit('paymentMethod', state.data.paymentMethod);
          const response = await adyenMakeDirectPayment({
            acquirerId: props.provider.id,
            reference: transaction.value.reference,
            paymentMethod: state.data.paymentMethod,
            token: transaction.value.access_token,
            browserInfo: state.data?.browserInfo || {}
          });

          if (response.action?.type) {
            adyenDropin.value.handleAction(response.action);
            emit('paymentLoading', false);
            return;
          }

          const data = await getPaymentConfirmation({ customQuery: { paymentConfirmation: 'greenConfirmationPayment' } });
          const paymentSuccess = data?.order?.lastTransaction?.state === 'Authorized' || data.order?.lastTransaction?.state === 'Confirmed';

          emit('paymentLoading', false);
          emit('paymentDone', false);

          if (paymentSuccess) {
            router.push({name: 'successPaymentResponse'});
            return;
          }

          router.push({name: 'failedPaymentResponse'});
        }
      };

      const checkout = new AdyenCheckout(configuration);

      adyenDropin.value = checkout.create(
        'dropin', {

          openFirstPaymentMethod: true,
          openFirstStoredPaymentMethod: false,
          showStoredPaymentMethods: false,
          showPaymentMethods: true,
          showPayButton: false,
          setStatusAutomatically: true,
          onSelect: (component) => {
            if (component.isValid) {
              emit('isPaymentReady', true);
              return;
            }
            emit('isPaymentReady', false);
          }
        }
      ).mount('#dropin-container');

      emit('paymentLoading', false);
      loading.value = false;

      emit('providerPaymentHandler', adyenDropin.value.submit);
    });

    onUnmounted(() => {
      adyenDropin.value?.unmount();
      adyenDropin.value = null;
    });

    return {
      loading,
      dropinDivElement,
      adyenDropin,
      acquirerInfo
    };
  }
};
</script>

<style lang="scss" scoped>
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
