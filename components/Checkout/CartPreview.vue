<template>
  <div class="py-5">
    <div v-if="currentStep !== 'revieworder'">
      <div class="highlighted mb-5">
        <SfHeading
          :level="3"
          :title="$t('Totals')"
          class="sf-heading--left sf-heading--no-underline title"
        />
      </div>
      <div class="highlighted">
        <SfProperty
          :name="$t('Products')"
          :value="totalItems"
          class="sf-property--full-width sf-property--large property"
        />

        <SfProperty
          :name="$t('Subtotal')"
          :value="$currency(subtotal)"
          class="sf-property--full-width sf-property--large property"
        />

        <SfProperty
          v-if="cartDiscounts > 0"
          :name="$t('Coupon')"
          :value="`-${$currency(cartDiscounts)}`"
          class="sf-property--full-width sf-property--large property"
        />

        <SfProperty
          v-if="discountGiftCards < 0"
          :name="$t('Gift Card')"
          :value="$currency(discountGiftCards)"
          class="sf-property--full-width sf-property--large property"
        />

        <SfProperty
          v-if="shippingMethodPrice > 0"
          :name="$t('Shipping')"
          :value="$currency(shippingMethodPrice)"
          class="sf-property--full-width sf-property--large property"
        />

        <SfProperty
          v-if="totals.special > 0"
          :value="$currency(totals.special)"
          class="
            sf-property--full-width sf-property--small
            property
            special-price
          "
        />
        <SfProperty
          v-if="!(shippingMethodPrice > 0) && !isPersonalOrShippingPage"
          :name="$t('Shipping')"
          :value="$t('Free')"
          class="sf-property--full-width sf-property--large property"
        />

        <SfProperty
          :name="$t('Total price')"
          :value="$currency(totals.total)"
          class="
            sf-property--full-width sf-property--large
            property-total
            total-price
          "
        />

        <slot name="extra-middle" />
      </div>
    </div>
    <div v-else>
      <div class="highlighted">
        <SfHeading
          :level="3"
          :title="$t('Order Review')"
          class="sf-heading--left sf-heading--no-underline title"
        />
      </div>
      <div class="highlighted pb-0">
        <div class="personal-detail flex justify-between">
          <div class="detail-adress grow">
            <p class="font-bold mb-4 text-lg">
              {{ $t('Personal details') }}
            </p>
            <p class="mb-4">
              <span>{{ partner.name }}</span> <br>
            </p>
            <p>{{ partner.email }}</p>
            <p class="mb-4">
              {{ partner.phone }}
            </p>
          </div>
          <div class="detail-edit">
            <SfLink
              :link="{ name: 'personaldetails' }"
              class="font-bold"
            >
              {{ $t('EDIT') }}
            </SfLink>
          </div>
        </div>
        <div class="personal-detail flex justify-between">
          <div class="detail-adress grow">
            <p class="font-bold mb-4 text-lg">
              {{ $t('Shipping details') }}
            </p>
            <p class="mb-4">
              <span>{{ partnerShipping.name }}</span> <br>
              <span v-if="partnerShipping.street">{{ partnerShipping.street }}</span><br v-if="partnerShipping.street2">
              <span v-if="partnerShipping.street2">{{ partnerShipping.street2 }}</span><br>
              <span>{{ partnerShipping.zip }} </span>
              <span v-if="partnerShipping.city">{{ partnerShipping.city }}</span>
            </p>
          </div>
          <div class="detail-edit">
            <SfLink
              :link="{ name: 'shipping' }"
              class="font-bold"
            >
              {{ $t('EDIT') }}
            </SfLink>
          </div>
        </div>
        <div
          class="
            personal-detail
            flex
            justify-between
            border-b-2 border-white
            rounded-none
          "
        >
          <div class="detail-adress grow">
            <p class="font-bold mb-4 text-lg">
              {{ $t('Billing address') }}
            </p>
            <p class="mb-4">
              <span>{{ partnerInvoice.name }}</span> <br>
              <span v-if="partnerInvoice.street">{{ partnerInvoice.street }}</span><br v-if="partnerInvoice.street2">
              <span v-if="partnerInvoice.street2">{{ partnerInvoice.street2 }}</span><br>
              <span>{{ partnerInvoice.zip }} </span>
              <span v-if="partnerInvoice.city">{{ partnerInvoice.city }}</span>
            </p>
          </div>
          <div class="detail-edit">
            <SfLink
              :link="{ name: 'shipping' }"
              class="font-bold"
            >
              {{ $t('EDIT') }}
            </SfLink>
          </div>
        </div>
      </div>
    </div>

    <GreenCouponForm v-if="$route.name === 'revieworder' && $breakpoints.lLg" class="text-center mt-5" />

    <GreenGiftCardForm v-if="$route.name === 'payment' && $breakpoints.lLg" class="text-center mt-5" />

    <div class="highlighted pt-10">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="$t(characteristic.title)"
        :description="$t(characteristic.description)"
        :icon="characteristic.icon"
        class="characteristic"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, useRoute } from '@nuxtjs/composition-api';
import { SfCharacteristic, SfHeading, SfLink, SfProperty } from '@storefront-ui/vue';
import { checkoutGetters, useCart } from '@vue-storefront/odoo';
import { cartGetters } from '~/composables';
import { GreenCart } from '~/green-api/types';

export default defineComponent({
  name: 'CartPreview',
  components: {
    SfHeading,
    SfProperty,
    SfCharacteristic,
    SfLink
  },
  setup(props, context) {
    const { cart } = useCart();
    const { name } = useRoute().value;

    const currentStep = computed(() =>
      context.root.$route.path.split('/').pop()
    );
    const listIsHidden = ref(false);
    const partner = computed(() => cart?.value?.order?.partner || {});
    const partnerShipping = computed(() => cart?.value?.order?.partnerShipping || {});
    const partnerInvoice = computed(() => cart?.value?.order?.partnerInvoice || {});
    const products = computed(() => cartGetters.getItems(cart.value as GreenCart));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value as GreenCart));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const subtotal = computed(() => cartGetters.getSubTotal(cart.value as GreenCart));
    const cartDiscounts = computed(() => cartGetters.getCartDiscounts(cart.value as GreenCart));
    const discountCoupons = computed(() => cartGetters.getDiscountsByCoupon(cart.value as GreenCart));
    const discountGiftCards = computed(() => cartGetters.getDiscountsByGiftCards(cart.value as GreenCart));
    const shippingMethodPrice = computed(() =>
      checkoutGetters.getShippingMethodPrice(cart.value?.order?.shippingMethod)
    );

    const isPersonalOrShippingPage = computed(() => ['personaldetails', 'shipping'].includes(name));

    return {
      cartDiscounts,
      subtotal,
      discountCoupons,
      discountGiftCards,
      isPersonalOrShippingPage,
      cart,
      currentStep,
      partner,
      partnerShipping,
      partnerInvoice,
      shippingMethodPrice,
      totalItems,
      listIsHidden,
      products,
      totals,
      checkoutGetters,
      cartGetters,
      characteristics: [
        {
          title: 'Safety',
          description: 'It carefully packaged with a personal touch',
          icon: 'safety'
        },
        {
          title: 'Easy shipping',
          description:
            'You’ll receive dispatch confirmation and an arrival date',
          icon: 'shipping'
        },
        {
          title: 'Changed your mind?',
          description: 'Rest assured, we offer free returns within 30 days',
          icon: 'return'
        }
      ]
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/cartPreview.scss';
</style>
