<template>
  <ValidationObserver
    v-slot="{ handleSubmit, invalid }"
    tag="div"
    class="w-full"
  >
    <form @submit.prevent="handleSubmit(submitForm)">
      <div class="flex justify-between">
        <ValidationProvider
          v-slot="{ errors }"
          name="firstName"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-model="form.name"
            class="w-full"
            label="First name"
            name="firstName"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </div>

      <div class="flex flex-row gap-3">
        <ValidationProvider
          v-slot="{ errors }"
          name="streetName"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-model="form.street"
            class="w-full"
            label="Street name"
            name="streetName"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="city"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-model="form.city"
            label="City"
            name="city"
            class="w-full"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </div>

      <div class="flex flex-row gap-3">
        <ValidationProvider
          v-slot="{ errors }"
          name="zipCode"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-model="form.zip"
            label="Zip-code"
            name="zipCode"
            class="form__element w-full"
            :class="{
              'basis-1/3': countryStates.length > 0,
              'basis-1/2': countryStates.length === 0,
            }"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          class="basis-1/3"
          name="country"
          rules="required"
          slim
        >
          <SfSelect
            v-model="form.country.id"
            label="Country"
            name="country"
            class="form__select sf-select--underlined w-full"
            required
            :class="{
              'basis-1/3': countryStates.length > 0,
              'basis-1/2': countryStates.length === 0,
            }"
            :valid="!errors[0]"
            :error-message="errors[0]"
          >
            <SfSelectOption
              v-for="countryOption in countries"
              :key="countryOption.id"
              :value="countryOption.id"
            >
              {{ countryOption.name }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>

        <ValidationProvider
          v-if="countryStates.length > 0"
          v-slot="{ errors }"
          name="state"
          rules="required"
          slim
        >
          <SfSelect
            v-model="form.state.id"
            label="State/Province"
            name="state"
            class="form__select sf-select--underlined w-full basis-1/3"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          >
            <SfSelectOption
              v-for="countryStateOption in countryStates"
              :key="countryStateOption.id"
              :value="countryStateOption.id"
            >
              {{ countryStateOption.name }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
      </div>
      <ValidationProvider
        v-slot="{ errors }"
        name="phone"
        rules="required|digits:9"
        slim
      >
        <SfInput
          v-model="form.phone"
          label="Phone number"
          name="phone"
          class="form__element form__element--half"
          required
          :valid="!errors[0]"
          :error-message="errors[0]"
        />
      </ValidationProvider>
      <div class="flex flex-row gap-3 mt-10">
        <GreenButton
          style-type="Primary"
          color="Green"
          size="Medium"
          type="submit"
          :disabled="invalid || loading"
          :loading="loading"
        >
          {{ isNew ? 'Add the address' : 'Update the address' }}
        </GreenButton>

        <GreenButton
          style-type="Tertiary"
          color="Grey"
          size="Medium"
          shape="Round"
          @click="$emit('cancel')"
        >
          Cancel
        </GreenButton>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  defineComponent,
  onMounted, reactive,
  watch
} from '@nuxtjs/composition-api';
import { SfButton, SfCheckbox, SfInput, SfSelect } from '@storefront-ui/vue';
import { useCountrySearch, useShipping } from '@vue-storefront/odoo';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { useUiNotification } from '~/composables';
export default defineComponent({
  name: 'AddressForm',
  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    address: {
      type: Object,
      default: {}
    },
    isNew: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const { search, countries, countryStates } = useCountrySearch('my-account-shipping');
    const { save, loading } = useShipping();
    const { send } = useUiNotification();

    const form = reactive({
      name: props.address.name,
      street: props.address.street,
      city: props.address.city,
      country: { id: String(props.address?.country?.id) },
      zip: props.address.zip,
      phone: props.address.phone,
      ...(props.isNew ? {} : { id: props.address.id })
    });

    const submitForm = async () => {
      try {
        await save({
          params: {
            ...form,
            countryId: Number(form.country.id),
            type: 'Shipping'
          },
          customQuery: {
            shippingUpdateAddress: 'greenUpdateAddress',
            shippingAddAdress: 'greenAddAddress'
          }
        });

        emit('save');
      } catch (error) {
        send({ message: error, type: 'danger' });
      }
    };

    onMounted(async () => {
      await search();
      form.country.id = String(countries.value?.[0]?.id);
    });

    return {
      loading,
      form,
      submitForm,
      countries,
      countryStates
    };
  }
});
</script>

<style lang='scss' scoped>
.flex {
  margin-bottom: 7%;
}

::v-deep .sf-select {
  padding: 29px 0 0 0;
}
</style>
