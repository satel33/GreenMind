<template>
  <SfCollectedProduct
    :key="cartGetters.getItemSku(orderLine)"
    data-cy="collected-product-cart-sidebar"
    :image="$image(cartGetters.getItemImage(orderLine), 140, 236, cartGetters.getItemImageFilename(orderLine))"
    :title="cartGetters.getItemTitle(orderLine)"
    :regular-price="$currency(cartGetters.getItemPrice(orderLine).regular)"
    :image-width="140"
    :image-height="236"
    :special-price="
      cartGetters.getItemPrice(orderLine).special && $currency(cartGetters.getItemPrice(orderLine).special)
    "
    :class="isGiftCardOrCoupon ? 'gift-coupon' : ''"
    :max-qty="quantityInStock"
    :min-qty="1"
    :qty="cartGetters.getItemQty(orderLine)"
    class="collected-product"
    @input="handleUpdateItem(orderLine, $event)"
    @click:remove="
      handleRemoveItemAndAccessories(orderLine);
    "
  >
    <template #image>
      <div v-if="isGiftCardOrCoupon" />
    </template>
    <template #title>
      <nuxt-link
        :to="productGetters.getSlug(orderLine.product)"
        :title="productGetters.getName(orderLine.product)"
        :data-clerk-product-id="orderLine.product.id"
      >
        <span
          class="custom-product-title"
          :style="isGiftCardOrCoupon ? { 'margin-top': '11px' } : ''"
          @click="toggleCartSidebar"
        >
          {{ cartGetters.getItemTitle(orderLine) }}
        </span>
      </nuxt-link>
      <span class="custom-subtitle"> {{ cartGetters.getItemWebsiteTitle(orderLine) }} </span>
      <span class="custom-stand"> {{ cartGetters.getStandGradeName(orderLine) }} </span>
    </template>
    <template #configuration>
      <div />
    </template>
    <template #more-actions>
      <div />
    </template>

    <template #price>
      <span class="green-collected-product__price">
        {{
          isGiftCardOrCoupon ? $currency(cartGetters.getItemPrice(orderLine).regular) : $currency(getPrice(orderLine))
        }}
      </span>

      <div class="mt-3 w-8/12 md:w-full">
        <span
          v-if="accessoryProducts.length > 0"
          class="green-collected-product__checkbox-title mb-1"
        >
          {{ $t('Acquisition') }}
        </span>

        <GreenCheckbox
          v-for="acessoryProduct in accessoryProducts"
          :key="acessoryProduct.id"
          :value="acessoryProduct.id"
          :disabled="loading"
          :title="acessoryProduct.combinedName"
          :price="$currency(acessoryProduct.combinationInfoVariant.price)"
          :is-checked="orderLineHasAccessory(acessoryProduct.id)"
          :border="true"
          class="mb-5"
          @change="handleAddOrRemoveAccessory(acessoryProduct , cartGetters.getItemQty(orderLine))"
        />
      </div>
    </template>
  </SfCollectedProduct>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, toRefs } from '@nuxtjs/composition-api';
import { SfCollectedProduct } from '@storefront-ui/vue';
import { cartGetters, useCollectedProduct, productGetters, useUiState } from '~/composables';
import { GreenOrderLine } from '~/green-api/types';

export default defineComponent({
  components: {
    SfCollectedProduct
  },
  props: {
    orderLine: {
      type: Object as PropType<GreenOrderLine>,
      default: () => ({})
    }
  },
  setup(props) {

    onMounted(() => {
      window.addEventListener('input', (evt) => {
        const target = (evt as any).target;

        if (Number(target.value) < 1 && target?.id?.includes('quantitySelector')) {
          target.value = 1;
        }
      });
    });

    const { toggleCartSidebar } = useUiState();
    const { orderLine } = toRefs(props);
    const {
      handleRemoveItemAndAccessories,
      handleAddOrRemoveAccessory,
      handleUpdateItem,
      orderLineHasAccessory,
      getPrice,
      loading
    } = useCollectedProduct(orderLine);

    const accessoryProducts = computed(
      () => props.orderLine?.product?.accessoryProducts?.filter((accessory) => accessory.isInStock) || []
    );

    const quantityInStock = computed(() => props.orderLine?.product?.qty || 0);

    const isGiftCardOrCoupon = computed(() => props.orderLine?.giftCard || props.orderLine.coupon);

    return {
      toggleCartSidebar,
      isGiftCardOrCoupon,
      quantityInStock,
      loading,
      orderLineHasAccessory,
      handleAddOrRemoveAccessory,
      accessoryProducts,
      cartGetters,
      getPrice,
      handleRemoveItemAndAccessories,
      handleUpdateItem,
      productGetters
    };
  }
});
</script>

<style
  scoped
  lang="scss"
>
@import '~/assets/css/collectedPoduct.scss';
</style>
