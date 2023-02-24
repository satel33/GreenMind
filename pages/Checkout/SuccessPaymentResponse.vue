<template>
  <div class="p-20 py-40">
    <SfLoader :class="{ loader: loading }" :loading="loading">
      <div>
        <SfHeading
          :title="$t('Thank you for your order')"
          :level="2"
          class="mb-10"
        />

        <SfHeading
          :title="$t('- and thank you for helping the environment!')"
          :level="4"
        />

        <SfHeading
          :title="$t('you are now involved in the fight against the 50 million tonnes of electronic waste that is thrown away every year')"
          :level="4"
        />

        <SfHeading
          class="mt-10"
          :title="$t('you will receive an email confirming that we have received your order')"
          :level="4"
        />
      </div>
    </SfLoader>
  </div>
</template>There is a problem with the order

<script lang="ts" >
declare let Clerk: any;

import { computed, defineComponent, onMounted, ref, Ref, watch } from '@nuxtjs/composition-api';
import { SfButton, SfHeading, SfLoader } from '@storefront-ui/vue';
import { cartGetters, useCart } from '@vue-storefront/odoo';
import { GreenCart, PaymentTransactionState } from '~/green-api/types';
import { setPurchaseTracking } from '~/resources/tracking';
import { useUiNotification, usePayment } from '~/composables';
import { IGAPurchaseInfo } from '~/green-api/types';

export default defineComponent({
  components: {
    SfHeading,
    SfButton,
    SfLoader
  },
  emits: ['changeStep'],
  setup(props, { root, emit }) {
    emit('changeStep', 4);

    const { send } = useUiNotification();
    const { setCart } = useCart();
    const paymentResponse = ref<GreenCart>(null);
    const loading = ref(false);
    const paymentStatus: Ref<PaymentTransactionState> = ref(null);
    const { getPaymentConfirmation, error } = usePayment('');

    const companyDetails = ref({
      name: 'Divante Headquarter',
      street: 'St. Dmowskiego 17, 53-534',
      city: 'Wroclaw, Poland',
      email: 'demo@vuestorefront.io'
    });

    onMounted(async () => {
      loading.value = true;
      try {
        const data = await getPaymentConfirmation();
        setCart(null);
        loading.value = false;
        paymentResponse.value = data as unknown as GreenCart;

        paymentStatus.value = paymentResponse?.value?.order?.lastTransaction?.state || PaymentTransactionState?.Error;

      } catch (err) {
        loading.value = false;

        if (err?.message === 'Cart does not exist') {
          return root.$router.push({ name: 'home'});
        }

        send({ message: root.$i18n.t('An error occured').toString(), type: 'danger' });
      }

    });

    const redirectToPayment = () => {
      return root.$router.push('/checkout/payment');
    };

    const paymentSuccess = computed(() => paymentStatus.value === 'Authorized' || paymentStatus.value === 'Confirmed');

    watch(paymentSuccess, () => {
      if (!paymentSuccess.value) {
        return;
      }

      setCart(null);

      const { websiteOrderLine, accessoryLines } = paymentResponse.value.order;

      const purchaseInfo: IGAPurchaseInfo = {
        // eslint-disable-next-line camelcase
        transaction_id: `${paymentResponse.value.order?.id}`,
        affiliation: 'Greenmind.dk',
        value: paymentResponse.value.order?.amountTotal,
        tax: paymentResponse.value.order?.amountTax,
        shipping: paymentResponse.value.order?.amountDelivery
      };

      setPurchaseTracking(purchaseInfo, websiteOrderLine, accessoryLines);

      const clerkProducts = websiteOrderLine?.concat(accessoryLines)?.map((orderLine) => {
        return { id: orderLine.product.id, quantity: orderLine.quantity, price: orderLine.priceTotal };
      });

      Clerk('call', 'log/sale', {
        sale: paymentResponse.value.order?.name,
        products: clerkProducts,
        email: paymentResponse.value.order?.partner?.email
      });

    });

    return {
      loading,
      paymentStatus,
      cartGetters,
      paymentResponse,
      paymentSuccess,
      redirectToPayment,
      companyDetails
    };
  }
});
</script>
<style lang="scss" scoped>
::v-deep .sf-heading__title.h4 {
  font-weight: 300;
}
</style>
