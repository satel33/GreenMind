<template>
  <div>
    <SfHeading
      :level="3"
      :title="$t('Shipping Details')"
      class="sf-heading--left sf-heading--no-underline title mb-5"
    />

    <CheckoutAddressForm
      v-if="canAddNewAddress"
      ref="shippingForm"
      :loading="loadingShipping"
      :countries="countries"
      :current-address-data="userShipping[0]"
      class="mb-5"
      @submit="handleAddNewAddress"
    />

    <SfHeading
      :level="3"
      :title="$t('Billing details')"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <CheckoutAddressForm
      v-if="!copyShippingToBilling"
      ref="billingForm"
      :loading="loadingBilling"
      :countries="countries"
      :current-address-data="userBilling[0]"
      class="mb-5"
      @submit="handleAddNewBillingAddress"
    />

    <div class="flex justify-between my-10 px-4">
      <GreenCheckbox
        v-model="copyShippingToBilling"
        :value="copyShippingToBilling"
        :is-checked="copyShippingToBilling"
        :has-general-wrapper="false"
        :label="$t('Copy address data from shipping')"
      />
    </div>

    <div class="submit-button mb-10">
      <GreenButton
        style-type="Primary"
        color="Green"
        shape="Round"
        :size="$breakpoints.sLg ? 'Max' : 'Medium'"
        :disabled="loadingBilling || loadingShipping"
        :loading="loadingBilling || loadingShipping"
        @click="handleGoToReviewOrder"
      >
        {{ $t("GO TO REVIEW ORDER") }}
      </GreenButton>
      <GreenButton
        class="mt-4 smartphone-only"
        style-type="Tertiary"
        color="Grey"
        shape="Round"
        size="Max"
        @click="$router.push({ name: 'personaldetails' })"
      >
        {{ $t('GO BACK') }}
      </GreenButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, defineComponent } from '@nuxtjs/composition-api';
import { SfHeading } from '@storefront-ui/vue';
import { useCart, useCountrySearch, useUser, useShippingProvider } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';
import { useCheckoutShipping, useCheckoutBilling, usePartner } from '~/composables';
import { setTrackAddShippingInfo } from '~/resources/tracking';
import { GreenCart } from '~/green-api/types';
import { cartGetters } from '~/composables';

export default defineComponent({
  name: 'Shipping',
  components: {
    SfHeading
  },
  emits: ['finish', 'change'],
  setup(_, { emit, refs }) {
    const { save } = useShippingProvider();

    const { partner } = usePartner();
    const { cart } = useCart();
    const { search, countries } = useCountrySearch('countries');
    const { isAuthenticated } = useUser();

    const isFormSubmitted = ref(false);
    const shippingForm = ref(null);
    const billingForm = ref(null);
    const validationObserverRef = ref(null);
    const copyShippingToBilling = ref(true);
    const generateInvoice = ref(false);
    const accessories = computed(() => cartGetters.getAccessories(cart.value as GreenCart));
    const items = computed(() => cartGetters.getItems(cart.value as GreenCart));
    const {
      defaultShippingAddress,
      canAddNewAddress,
      hasSavedShippingAddress,
      showShippingAddresses,
      handleAddNewAddress,
      currentAddressId,
      setDefaultShippingAddress,
      loadShipping,
      shipping,
      loadUserShipping,
      loadingShipping,
      userShipping,
      handleSetCurrentShippingAddress,
      newCurrentShippingAddressId
    } = useCheckoutShipping();

    const hasSavedShippingAddressDifferentPartnerData = computed(() =>
      hasSavedShippingAddress.value && shipping.value.id !== cart?.value?.order?.partner?.id);

    const {
      defaultBillingAddress,
      canAddNewBillingAddress,
      hasSavedBillingAddress,
      showBillingAddresses,
      handleAddNewBillingAddress,
      currentBillingAddressId,
      setDefaultBillingAddress,
      newCurrentBillingAddressId,
      loadBilling,
      loadUserBilling,
      loadingBilling,
      userBilling,
      billing,
      handleSetCurrentBillingAddress
    } = useCheckoutBilling();

    const hasSavedBillingAddressDifferentPartnerData = computed(() =>
      hasSavedBillingAddress.value && billing.value.id !== cart.value?.order?.partner?.id);

    const shippingFormValid = computed(() => shippingForm.value?.validationObserverRef.flags.valid);
    const billingFormValid = computed(() => billingForm.value?.validationObserverRef.flags.valid);

    const selectedShippingMethod = computed(
      () => cart.value?.order?.shippingMethod || {}
    );

    const canGoReviewOrder = computed(() => {

      if (!shippingFormValid.value) return false;

      if (!copyShippingToBilling.value && !billingFormValid.value) return false;

      return true;
    });

    const handleValidateBillingForm = async () => {
      await billingForm.value?.validationObserverRef?.validate();

      const errorKeys = Object.keys(billingForm.value?.validationObserverRef?.errors);
      const errorIndex = [];
      errorKeys.forEach(element => {
        const item = billingForm.value?.validationObserverRef?.errors[element];
        if (item.length > 0) {
          errorIndex.push(element);
        }
      });

      const [first] = errorIndex;
      billingForm.value?.formRef?.[first]?.focus();
    };

    const handleValidateShippingForm = async () => {
      await shippingForm.value?.validationObserverRef?.validate();

      const errorKeys = Object.keys(shippingForm.value?.validationObserverRef?.errors);
      const errorIndex = [];
      errorKeys.forEach(element => {
        const item = shippingForm.value?.validationObserverRef?.errors[element];
        if (item.length > 0) {
          errorIndex.push(element);
        }
      });

      const [first] = errorIndex;
      shippingForm.value?.formRef?.[first]?.focus();
    };

    const goToOrderReview = async () => {
      if (!shippingFormValid.value) {
        await handleValidateShippingForm();
        return;
      }

      if (!billingFormValid.value && !copyShippingToBilling.value) {
        await handleValidateBillingForm();
        return;
      }

      await handleAddNewAddress(shippingForm.value.form);
      await handleAddNewBillingAddress(copyShippingToBilling.value ? shippingForm.value.form : billingForm.value.form);
      await save({ shippingMethod: {}, customQuery: { setShippingMethod: 'greenNullShippingMethod' }});

      const products = items.value?.map((item) => item.product);
      setTrackAddShippingInfo(cart.value?.order?.amountTotal, {products: products, accessories: accessories.value, orderLines: cart.value?.order?.orderLines }, selectedShippingMethod.value.name);

      emit('change', 'revieworder');
    };

    const handleGoToReviewOrder = async () => {

      if (newCurrentShippingAddressId.value && defaultShippingAddress.value) {
        await setDefaultShippingAddress({ address: { id: newCurrentShippingAddressId.value } });
      }
      if (newCurrentBillingAddressId.value && defaultBillingAddress.value) {
        await setDefaultBillingAddress({ address: { id: newCurrentBillingAddressId.value } });
      }

      goToOrderReview();
    };

    onSSR(async () => {

      await search();
      await loadBilling();
      await loadShipping();
      await loadUserShipping();
      await loadUserBilling();

      if (userShipping.value?.length === 0) {
        userShipping.value.push({
          name: partner.value?.name,
          email: partner.value?.email
        });
      }

      if (!hasSavedShippingAddressDifferentPartnerData.value) {
        canAddNewAddress.value = true;
      }
      if (!hasSavedBillingAddressDifferentPartnerData.value) {
        canAddNewBillingAddress.value = true;
      }

      validationObserverRef?.value?.validate({ silent: true });
    });

    if (cart.value?.order?.partnerShipping?.street !== cart.value?.order?.partnerInvoice?.street) {
      copyShippingToBilling.value = false;
    }

    return {
      partner,
      shippingFormValid,
      hasSavedBillingAddress,
      currentBillingAddressId,
      handleSetCurrentBillingAddress,
      defaultBillingAddress,
      userBilling,
      generateInvoice,
      showBillingAddresses,
      copyShippingToBilling,
      selectedShippingMethod,
      cart,
      billing,
      handleGoToReviewOrder,
      canGoReviewOrder,
      userShipping,
      showShippingAddresses,
      loadingShipping,
      loadingBilling,
      validationObserverRef,
      canAddNewAddress,
      canAddNewBillingAddress,
      handleAddNewBillingAddress,
      handleAddNewAddress,
      defaultShippingAddress,
      handleSetCurrentShippingAddress,
      currentAddressId,
      hasSavedShippingAddress,
      isAuthenticated,
      isFormSubmitted,
      countries,
      shippingForm,
      billingForm
    };
  },
  head: {
    title: 'Greenmind | Shipping'
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/shipping.scss";
</style>
