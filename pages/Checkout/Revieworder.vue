<template>
  <div>
    <SfHeading
      :level="3"
      :title="$t('Order Details')"
      class="sf-heading--left sf-heading--no-underline title mb-5"
    />
    <div class="orders">
      <a
        v-for="(orderLine, index) in orderLines"
        :key="index"
        class="order"
      >
        <CheckoutCollectedProduct :order-line="orderLine" />
      </a>
    </div>
    <div class="total-price-wrap mt-10">
      <div v-if="discountGiftCards < 0" class="flex justify-between gift mb-5">
        <p>{{ $t("Gift Card") }}:</p>
        <p class="price">
          {{
            $currency(discountGiftCards)
          }}
        </p>
      </div>
      <div class="shipping">
        <p>{{ $t("Shipping") }}:</p>
        <p class="price">
          {{
            shippingMethodPrice ? $currency(shippingMethodPrice) : $t("Free")
          }}
        </p>
      </div>

      <div class="total-price">
        <p class="total">
          {{ $t("Total price") }}:
        </p>

        <p class="price">
          {{ $currency(totals.total) }}
        </p>
      </div>
      <GreenCouponForm v-if="$breakpoints.sMd" />
    </div>
    <div class="checkbox-button-wrap">
      <div class="checkbox-wrap">
        <form>
          <GreenCheckbox
            v-model="agreeTermsConditions"
            :valid="!touched || agreeTermsConditions"
            :error-message="$t('This field is required.')"
            :value="agreeTermsConditions"
            :is-checked="agreeTermsConditions"
            :has-general-wrapper="true"
          >
            <template #label>
              <span class="ml-3">
                {{ $t("I agree to") }}
                <nuxt-link
                  target="_blank"
                  to="/handelsbetingelser"
                  :title="$t('Terms and conditions')"
                >
                  {{ $t("Terms and conditions") }}
                </nuxt-link>
              </span>
            </template>
          </GreenCheckbox>
          <!-- <transition name="sf-fade" mode="out-in">
            <span v-if="agreeTermsConditions" class="ml-8 pointer">
              Do you want to subscribe to newsletter ?
            </span>
          </transition> -->
        </form>
      </div>
      <div class="submit-button">
        <GreenButton
          style-type="Primary"
          color="Green"
          shape="Round"
          :size="$breakpoints.sLg ? 'Max' : 'Medium'"
          :disabled="cartIsEmpty"
          @click="handleGoToPayment"
        >
          {{ $t("GO TO PAYMENT") }}
        </GreenButton>

        <GreenButton
          class="mt-4 smartphone-only"
          style-type="Tertiary"
          color="Grey"
          shape="Round"
          size="Max"
          @click="$router.push({ name: 'shipping' })"
        >
          {{ $t('GO BACK') }}
        </GreenButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import { SfHeading } from '@storefront-ui/vue';
import { checkoutGetters, useCart } from '@vue-storefront/odoo';
import { cartGetters, productGetters } from '~/composables';
import { GreenCart } from '~/green-api/types';

export default defineComponent({
  name: 'Revieworder',
  components: { SfHeading },
  setup(props, { emit }) {

    const touched = ref(false);
    const { cart } = useCart();
    const orderLines = computed(() =>
      cartGetters.getItemsWithoutDiscounts(cart.value as GreenCart)
    );

    const totals = computed(() => cartGetters.getTotals(cart.value));
    const agreeTermsConditions = ref(false);

    const subtotal = computed(() => cartGetters.getSubTotal(cart.value as GreenCart));
    const discountCoupons = computed(() => cartGetters.getDiscountsByCoupon(cart.value as GreenCart));
    const discountGiftCards = computed(() => cartGetters.getDiscountsByGiftCards(cart.value as GreenCart));
    const cartIsEmpty = computed(() => cartGetters.cartIsEmpty(cart.value as GreenCart));
    const shippingMethodPrice = computed(() => checkoutGetters.getShippingMethodPrice(cart.value?.order?.shippingMethod));

    const handleGoToPayment = () => {
      touched.value = true;

      if (agreeTermsConditions.value) {
        emit('change', 'payment');
      }
    };

    return {
      cartIsEmpty,
      handleGoToPayment,
      discountCoupons,
      discountGiftCards,
      subtotal,
      shippingMethodPrice,
      cart,
      agreeTermsConditions,
      cartGetters,
      totals,
      orderLines,
      productGetters,
      touched
    };
  },
  head: {
    title: 'Greenmind | Revieworder'
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/revieworder.scss";
</style>
