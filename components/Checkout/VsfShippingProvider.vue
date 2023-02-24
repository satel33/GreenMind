<template>
  <div>
    <!-- <SfRadio
      v-for="method in shippingMethods"
      :key="method.id"
      v-model="selectedMethod"
      :label="method.name"
      :value="String(method.id)"
      :description="method.name"
      :selected="isSelected(method.id)"
      name="shippingMethod"
      class="form__radio shipping"
      @change="selectMethod(method.id)"
    >
      <div class="shipping__label">
        {{ method.name }}
      </div>

      <div class="shipping__description">
        {{ method.name }}
      </div>
    </SfRadio> -->
  </div>
</template>

<script>
import { SfRadio } from '@storefront-ui/vue';
import { ref, onMounted, watch, defineComponent } from '@nuxtjs/composition-api';
import { useShippingProvider } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';

export default defineComponent({
  name: 'VsfShippingProvider',
  components: { SfRadio },
  props: {
    selectedShippingMethodId: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props) {
    const selectedMethod = ref(props.selectedShippingMethodId ? String(props.selectedShippingMethodId) : null);
    const { load, state: shippingMethods, save } = useShippingProvider();

    const selectMethod = async (methodId) => {
      await save({ shippingMethod: { id: methodId } });
    };

    const isSelected = (id) => String(props?.selectedShippingMethodId) === id;

    onSSR(async () => {
      // await load();
      await save({ shippingMethod: {}, customQuery: { setShippingMethod: 'greenNullShippingMethod' }});
      // selectMethod(shippingMethods.value[0].id);
    });

    return {
      isSelected,
      shippingMethods,
      selectedMethod,
      selectMethod
    };
  }
});
</script>

<style lang="scss" scoped>
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
