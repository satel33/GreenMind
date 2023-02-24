<template>
  <div class="flex justify-between">
    <SfCollectedProduct
      :key="cartGetters.getItemSku(orderLine)"
      data-cy="collected-product-cart-sidebar"
      :image="$image(cartGetters.getItemImage(orderLine), 140, 236, cartGetters.getItemImageFilename(orderLine))"
      :title="cartGetters.getItemTitle(orderLine)"
      :regular-price="$currency(cartGetters.getItemPrice(orderLine).regular)"
      :image-width="140"
      :image-height="236"
      :special-price="
        cartGetters.getItemPrice(orderLine).special &&
          $currency(cartGetters.getItemPrice(orderLine).special)
      "

      :qty="cartGetters.getItemQty(orderLine)"
      class="collected-product"
      @input="handleUpdateItem(orderLine, $event)"
      @click:remove="handleRemoveItemAndAccessories(orderLine)"
    >
      <template #title>
        <span class="custom-product-title "> {{ cartGetters.getItemTitle(orderLine) }} </span>
        <span class="custom-subtitle mt-3"> {{ cartGetters.getItemWebsiteTitle(orderLine) }} </span>
        <span class="custom-stand mt-1 mb-3"> {{ cartGetters.getStandGradeName(orderLine) }} </span>

        <SfQuantitySelector
          v-model="quantity"
          :max="quantityInStock"
          :min="1"
          aria-label="Quantity"
        />
      </template>

      <template #remove>
        <div />
      </template>
      <template #price>
        <div />
      </template>
      <template #configuration>
        <div />
      </template>
      <template #input>
        <div />
      </template>
      <template #actions>
        <div />
      </template>
    </SfCollectedProduct>

    <div>
      <span v-if="accessoryProducts.length > 0" class="green-collected-product__checkbox-title mb-1">
        {{ $t('Acquisition') }}
      </span>

      <GreenCheckbox
        v-for="acessoryProduct in accessoryProducts"
        :key="acessoryProduct.id"
        :value="acessoryProduct.id"
        :disabled="loading"
        :title="acessoryProduct.name"
        :price="$currency(acessoryProduct.price)"
        :is-checked="orderLineHasAccessory(acessoryProduct.id)"
        @change="handleAddOrRemoveAccessory(acessoryProduct.id)"
      />
    </div>

    <div class="grid">
      <span class="custom-edit-remove-text" @click="handleRemoveItemAndAccessories(orderLine)">
        {{ $t('REMOVE') }}
      </span>
      <span class="self-end custom-price">
        {{ $currency(getPrice(orderLine)) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { SfCollectedProduct, SfQuantitySelector } from '@storefront-ui/vue';
import { cartGetters, useCollectedProduct } from '~/composables';
import { defineComponent, PropType, computed, ref, watch, toRefs } from '@nuxtjs/composition-api';
import { GreenOrderLine } from '~/green-api/types';

export default defineComponent({
  components: {
    SfCollectedProduct,
    SfQuantitySelector
  },
  props: {
    orderLine: {
      type: Object as PropType<GreenOrderLine>,
      default: () => ({})
    },
    checkboxTitle: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { orderLine } = toRefs(props);
    const {
      handleRemoveItemAndAccessories,
      handleAddOrRemoveAccessory,
      handleUpdateItem,
      orderLineHasAccessory,
      getPrice,
      loading
    } = useCollectedProduct(orderLine);

    const accessoryProducts = computed(() => props.orderLine?.product?.accessoryProducts || []);

    const quantityInStock = computed(() => props.orderLine?.product?.qty || 0);

    const quantity = ref(props.orderLine?.quantity || 0);

    watch(
      () => props.orderLine.quantity,
      () => quantity.value = props.orderLine.quantity
    );

    watch(
      () => quantity.value,
      () => handleUpdateItem(props.orderLine, quantity.value)
    );

    return {
      quantityInStock,
      quantity,
      loading,
      handleAddOrRemoveAccessory,
      accessoryProducts,
      cartGetters,
      getPrice,
      handleRemoveItemAndAccessories,
      handleUpdateItem,
      orderLineHasAccessory
    };
  }
});
</script>

<style scoped lang="scss">
@import '~/assets/css/detailedCollectedProduct.scss'
</style>
