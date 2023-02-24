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

import { watch, ref, onMounted } from '@nuxtjs/composition-api';
import { useAdyenExternalPaymentProvider } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'AdyenExternalPaymentProvider',
  props: {
    provider: {
      required: true,
      type: Object
    }
  },
  setup(props, { root, emit }) {
    const form = ref(null);

    const { paymentExternalResponse, getPaymentExternal } =
      useAdyenExternalPaymentProvider(props.provider);

    const sendForm = () => {
      form.value.children?.[0]?.submit();
    };

    const fetchPaymentExternal = async () => {
      await getPaymentExternal();
      if (paymentExternalResponse.value?.form !== null) {
        emit('isPaymentReady', true);
        emit('providerPaymentHandler', sendForm);
      }
    };

    watch(
      () => props.provider.id,
      () => fetchPaymentExternal(),
      { immediate: true }
    );

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
