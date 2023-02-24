<template>
  <div
    v-show="false"
    ref="form"
    method="post"
    v-html="paymentExternalResponse"
  />
</template>

<script>
/* eslint-disable camelcase */

import { watch, ref } from '@nuxtjs/composition-api';
import { useAnyPayPayment } from '~/composables';

export default {
  name: 'AnyDayPaymentProvider',
  props: {
    provider: {
      required: true,
      type: Object
    }
  },
  emits: ['providerPaymentHandler', 'isPaymentReady', 'paymentLoading'],
  setup(props, { root, emit }) {
    const form = ref(null);

    const { paymentExternalResponse, getPaymentExternal } = useAnyPayPayment(props.provider.id);

    const sendForm = async () => {
      emit('paymentLoading', true);
      await getPaymentExternal();
      if (paymentExternalResponse.value !== null) {
        emit('isPaymentReady', true);

      }

      setTimeout(() => {
        form.value.children?.[0]?.submit();
        emit('paymentLoading', false);
      }, 500);
    };

    emit('providerPaymentHandler', sendForm);

    return {
      paymentExternalResponse,
      sendForm,
      form
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
