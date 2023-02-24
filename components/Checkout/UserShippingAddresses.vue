<template>
  <div>
    <SfAddressPicker
      :selected="`${currentAddressId}`"
      class="flex flex-wrap mb-5 gap-6"
      @change="setCurrentAddress($event)"
    >
      <SfAddress
        v-for="address in addresses"
        :key="address.id"
      >
        <MyAccountUserAddress :address="address" />
        <template #icon>
          <img
            v-show="currentAddressId === address.id"
            alt="checkmark"
            class="sf-address-picker-icon"
            :src="require('/assets/images/checkout/checkmark.svg')"
          >
        </template>
      </SfAddress>
    </SfAddressPicker>
    <!-- <SfCheckbox
      v-show="currentAddressId && addresses.length > 1"
      v-model="defaultAddress"
      :selected="`${value}`"
      name="setAsDefault"
      label="Use this address as my default one."
      class="shipping__setAsDefault my-10"
      @change="$emit('input', defaultAddress)"
    /> -->
  </div>
</template>

<script lang="ts">
import { SfCheckbox, SfAddressPicker } from '@storefront-ui/vue';
import { userShippingGetters } from '@vue-storefront/odoo';
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'UserShippingAddresses',
  components: {
    SfCheckbox,
    SfAddressPicker
  },
  props: {
    currentAddressId: {
      type: [String, Number],
      required: true
    },
    addresses: {
      type: [Array, Object],
      default: () => []
    }
    // value: {
    //   type: Boolean,
    //   required: true
    // }
  },
  emits: ['input', 'set-current-address'],
  setup(props, { emit }) {
    // /const defaultAddress = ref(props.value);

    const setCurrentAddress = (addressId) => {
      const selectedAddress = props.addresses?.filter(
        (item) => item.id === Number.parseInt(addressId)
      );

      emit('set-current-address', selectedAddress?.[0] || {});
    };

    return {
      // defaultAddress,
      setCurrentAddress,
      userShippingGetters
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep .sf-address {
  border-radius: 14px;
}

::v-deep .sf-radio__content {
  margin: 0;
  font-family: var(--font-family--primary);
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
}

.sf-divider,
.form__action-button--margin-bottom {
  margin-bottom: var(--spacer-xl);
}

.sf-address-picker-icon {
  position: absolute;
  right: 18px;
}
</style>
