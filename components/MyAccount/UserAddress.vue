<template>
  <div>
    <p :style="userAddress.isDefault ? 'font-weight: bold;' : ''">
      {{ userAddress.name }}
    </p>
    <p>
      {{ userAddress.street }}, {{ userAddress.streetNumber }}
    </p>

    <p>
      {{ userAddress.city }}
      {{ userAddress.postalCode }}
    </p>

    <p>{{ userAddress.country }}</p>
    <p
      v-if="userAddress.phone"
      class="phone"
    >
      {{ userAddress.phone }}
    </p>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'UserAddress',
  props: {
    address: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const userAddress = computed(() => ({
      name: props.address?.name || '',
      street: props.address?.street,
      postalCode: props.address?.postalCode,
      city: props.address?.city,
      country: props.address?.country?.name,
      phone: props.address?.phone,
      isDefault: props.address
    }));

    return {
      userAddress
    };
  }
});
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.phone {
  margin-top: var(--spacer-base);
}

</style>
