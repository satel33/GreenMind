<template>
  <ValidationObserver
    ref="validationObserverRef"
    tag="div"
  >
    <!-- <div v-show="invalid" class="button-wrap">
        <button
          class="color-primary sf-button login-btn"
          type="button"
          @click="toggleLoginModal"
        >
          LOG INTO YOUR ACCOUNT
        </button>

        <p>or fill the details below:</p>
      </div> -->
    <SfHeading
      :level="3"
      :title="$t('Personal details')"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <form
      ref="formRef"
      class="form flex flex-wrap"
      @submit="handleFormSubmit"
    >
      <div class="flex gap-4 w-full mb-7 flex-wrap md:flex-nowrap">
        <ValidationProvider
          v-slot="{ errors }"
          name="firstName"
          rules="required"
          slim
          class="w-full md:w-6/12"
        >
          <SfInput
            v-model="form.firstName"
            :label="$t('First name')"
            name="firstName"
            class="form__element"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="lastName"
          rules="required"
          slim
          class="w-full md:w-6/12"
        >
          <SfInput
            v-model="form.lastName"
            :label="$t('Last Name')"
            name="lastName"
            class="form__element"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="flex justify-between w-full">
        <ValidationProvider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
          slim
          class="w-full"
        >
          <SfInput
            v-model="form.email"
            :label="$t('Your email address')"
            name="email"
            class="form__element email-input"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </div>
    </form>

    <!-- <GreenCheckbox
      v-model="newsLetter"
      :value="newsLetter"
      :has-general-wrapper="false"
      class="mt-10"
      :label="$t('Join newsletter')"
    />

    <span class="italic text-sm">{{ $t('By subscribing to the newsletter, you also accept Green Minds privacy policy') }}</span> -->
    <!-- <nuxt-link
      :to="{ name: 'gdpr' }"
      class="italic text-sm underline"
      :title="$t('read more')"
    >
      {{ $t('read more') }}
    </nuxt-link> -->

    <!-- <p v-show="invalid" class="title">
        Enjoy these perks with your free account!
      </p>

      <CheckoutPerks />

      <div class="flex flex-wrap mb-5 items-baseline" style="height: 69px;">
        <GreenCheckbox
          v-show="invalid"
          v-model="wantRegister"
          :value="wantRegister"
          class="pt-3"
          :has-general-wrapper="false"
          :label="$t('I want to create an account')"
        />

        <ValidationProvider
          v-show="wantRegister"
          v-slot="{ errors }"
          name="password"
          :rules="wantRegister ? 'required' : ''"
          slim
          style="max-width: 50%"
        >
          <SfInput
            v-model="form.password"
            label="Password"
            name="password"
            type="password"
            class="form__element password"
            required
            style="margin: 0"
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </div> -->
    <div class="submit-button mb-5">
      <GreenButton
        style-type="Primary"
        color="Green"
        shape="Round"
        :size="$device.isMobile ? 'Max' : 'Medium'"
        class="my-5"
        :disabled="loading"
        :loading="loading"
        @click="handleFormSubmit"
      >
        {{ $t("GO TO SHIPPING") }}
      </GreenButton>
    </div>
  </ValidationObserver>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, watch, computed } from '@nuxtjs/composition-api';
import { SfButton, SfHeading, SfInput } from '@storefront-ui/vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { useCart, useUser } from '@vue-storefront/odoo';
import { useUiState, useUiNotification, usePartner } from '~/composables';
import { setTrackAddPersonalInfo } from '~/resources/tracking';
import { cartGetters } from '~/composables';

export default defineComponent({
  name: 'Personaldetails',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    ValidationProvider,
    ValidationObserver
  },
  emits: ['change'],
  setup(props, { root, emit }) {

    const { cart } = useCart();
    const { register, isAuthenticated } = useUser();
    const { toggleLoginModal } = useUiState();
    const { send } = useUiNotification();
    const { createUpdatePartner, error, loading } = usePartner();
    const items = computed(() => cartGetters.getItems(cart.value));

    const accessories = computed(() => cartGetters.getAccessories(cart.value));

    const isFormSubmitted = ref(false);
    const formRef = ref(false);
    const validationObserverRef = ref(null);
    const newsLetter = ref(false);
    const wantRegister = ref(false);

    const form = reactive({
      firstName: '',
      lastName: '',
      password: '',
      companyName: '',
      vat: '',
      email: null
    });

    const loadUser = () => {
      if (cart.value?.order?.partner && !cart.value?.order?.partner?.name?.includes('Public')) {
        form.email = cart.value?.order?.partner.email;
        form.firstName = cart?.value?.order?.partner?.name?.split(' ')[0];
        form.lastName = cart?.value.order?.partner?.name?.split(' ')[1];
      }
    };

    const goToShipping = () => emit('change', 'shipping');

    const handleFormSubmit = async () => {
      const valid = await validationObserverRef?.value?.validate();

      if (!valid) {
        const errorKeys = Object.keys(validationObserverRef?.value?.errors);
        const errorIndex = [];

        errorKeys.forEach(element => {
          const item = validationObserverRef?.value?.errors[element];
          if (item.length > 0) {
            errorIndex.push(element);
          }
        });
        const [first] = errorIndex;
        formRef?.value?.[first]?.focus();

        return;
      }

      await createUpdatePartner({
        email: form.email,
        subscribeNewsletter: newsLetter.value,
        name: `${form.firstName} ${form.lastName}`
      });

      if (error.value) {
        send({ message: error?.value?.message, type: 'danger' });
        return;
      }

      const products = items.value?.map((item) => item.product);

      setTrackAddPersonalInfo(cart.value.order.amountTotal, {
        products: products,
        accessories: accessories.value,
        orderLines: cart.value.order.orderLines
      });

      goToShipping();
    };

    watch(
      () => isAuthenticated.value,
      (value) => {
        if (value) goToShipping();
      }
    );

    watch(
      () => cart.value,
      () => loadUser(),
      { deep: true }
    );

    onMounted(async () => {
      loadUser();
      validationObserverRef?.value?.validate({ silent: true });
    });

    return {
      toggleLoginModal,
      handleFormSubmit,
      loading,
      cart,
      validationObserverRef,
      form,
      newsLetter,
      wantRegister,
      formRef,
      isFormSubmitted,
      goToShipping
    };
  },
  head: {
    title: 'Greenmind | Personaldetails'
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/personalDetails.scss";
</style>
