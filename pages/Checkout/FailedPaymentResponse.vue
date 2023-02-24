<template>
  <div class="p-20 py-40">
    <SfLoader :class="{ loader: loading }" :loading="loading" />
    <div class="flex justify-center flex-col items-center">
      <SfHeading
        :title="$t('There was an error!')"
        :level="2"
        class="mb-10"
      />

      <SfHeading
        :title="$t('Unfortunately, an error occurred with your payment and your order could not be completed')"
        :level="4"
      />
      <SfHeading
        :title="$t('We have saved your basket so you can try the payment again')"
        :level="4"
      />

      <nuxt-link :to="{ name: 'payment'}">
        <GreenButton size="large" class="mt-10">
          {{ $t('try the payment again') }}
        </GreenButton>
      </nuxt-link>
    </div>
    </sfloader>
  </div>
</template>

<script lang="ts">
declare let Clerk: any;

import { defineComponent, onMounted, ref, Ref } from '@nuxtjs/composition-api';
import { SfHeading, SfLoader } from '@storefront-ui/vue';
import { usePayment, useUiNotification } from '~/composables';
import { GreenCart, PaymentTransactionState } from '~/green-api/types';

export default defineComponent({
  components: {
    SfHeading,
    SfLoader
  },
  emits: ['changeStep'],
  setup(props, { root, emit }) {
    emit('changeStep', 4);

    const { send } = useUiNotification();
    const paymentResponse = ref<GreenCart>(null);
    const loading = ref(false);
    const paymentStatus: Ref<PaymentTransactionState> = ref(null);
    const { getPaymentConfirmation } = usePayment('');

    onMounted(async () => {
      loading.value = true;
      try {
        const data = await getPaymentConfirmation();
        loading.value = false;
        paymentResponse.value = data as unknown as GreenCart;

        paymentStatus.value = paymentResponse?.value?.order?.lastTransaction?.state;

      } catch (err) {
        loading.value = false;
        if (err.message === 'Cart does not exist') {
          return root.$router.push({ name: 'home'});
        }

        send({ message: root.$i18n.t('An error occured').toString(), type: 'danger' });
      }

    });

    return {
      loading: false
    };
  }
});
</script>
<style lang="scss" scoped>
::v-deep .sf-heading__title.h4 {
  font-weight: 300;
}
</style>
