<template>
  <div class="promo-code" :class="$breakpoints.sMd ? 'highlighted__mobile' : 'highlighted'">
    <slot name="title" />
    <SfInput
      key="input"
      v-model.trim="couponCode"
      data-cy="cart-preview-input_promoCode"
      name="couponCode"
      :label="$t('Enter Coupon code')"
      class="sf-input--filled promo-code__input total-input mt-5 text-left"
      @keydown.space.prevent
      @keydown.tab.prevent
      @input="removeWhiteSpace"
    />
    <GreenButton
      key="button"
      class="promo-code__button"
      :disabled="loadingCoupon || !couponCode"
      :loading="loadingCoupon"
      style-type="Primary"
      color="Green"
      shape="Round"
      @click="handleAddCouponCode"
    >
      <span>{{ $t("Apply") }}</span>
    </GreenButton>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { SfInput } from '@storefront-ui/vue';
import { useCart } from '@vue-storefront/odoo';
import { useCoupon, useUiNotification } from '~/composables';

export default defineComponent({
  components: {
    SfInput
  },
  setup() {
    const { send } = useUiNotification();
    const {load, setCart } = useCart();
    const { applyCoupon, loading: loadingCoupon, error: errorCoupon } = useCoupon();
    const couponCode = ref('');

    const handleAddCouponCode = async () => {
      await applyCoupon(couponCode.value);

      if (errorCoupon.value) {
        send({ message: errorCoupon.value, type: 'danger' });
        errorCoupon.value = null;
        return;
      }
      setCart(null);
      await load({ customQuery: { cartLoad: 'greenCartLoad' } });
    };

    const removeWhiteSpace = () => {
      couponCode.value = couponCode.value.replaceAll(' ', '');
    };

    return {
      removeWhiteSpace,
      couponCode,
      loadingCoupon,
      handleAddCouponCode
    };
  }
});
</script>
<style lang="scss" scoped>
.highlighted {
    box-sizing: border-box;
    width: 100%;
    background-color: var(--c-light);
    padding: 0 var(--spacer-xl) 0;
    &:last-child {
      padding-bottom: var(--spacer-xl);
    }

    &__mobile {
      height: 85px;
      .title {
        color: black;
      }
      ::v-deep .lds-ring div {
        border-radius: 50% !important;
      }
    }
  }

  .promo-code {
    color: var(--_c-greenmind-pine-primary-dark-green);
    //height: 65px;
    &__button {
      max-width: 100px !important;
      --button-height: var(--spacer-lg);
      position: relative;
      top: -58px;
      left: 223px;
      padding: 8px

    }
    &__input {
      --input-background: var(--c-white);
      flex: 1;
      border-radius: 100px !important;
    }
    position: relative;
  }

  @media (max-width: 1024px) {
    .promo-code {
      &__button {

        position: relative;
        top: -72px;
        left: 100%;
        margin-left: -105px;
        height: 45px;
      }
     ::v-deep .is-disabled--button {
        background-color: var(--c-white);
      }
       ::v-deep input {
        padding-left: 20px;
        background-color: var(--c-light);
        border-radius: 100px !important;
       }
    }
  }

  ::v-deep .promo-code input {
    border-radius: 100px;
    padding-top: 15px;
    padding-bottom: 11px;
    padding-left: 15px;
  }

  ::v-deep .promo-code .sf-input {
    &__label {
      font-weight: 400;
      font-size: 16px;
      color: #43464e;
      font-family: var(--font-family--primary);
      padding-left: 22px;
    }

    &__wrapper {
      height: 40px;
    }
  }
</style>
