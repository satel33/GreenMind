<template>
  <div class="img-info-wrap">
    <div class="image-container">
      <NuxtImg
        :src=" $image( cartGetters.getItemImage(orderLine), 82, 104, cartGetters.getItemImageFilename(orderLine) ) "
        :alt="cartGetters.getItemTitle(orderLine)"
        height="82"
        width="104"
        loading="eager"
      />
      <div v-if="cartGetters.getOrderLineDiscount(orderLine) > 0" class="badge-discount">
        <span>
          -{{ cartGetters.getOrderLineDiscount(orderLine) }} %
        </span>
      </div>
    </div>
    <div class="product-info">
      <SfCircleIcon
        icon="cross"
        icon-size="12px"
        @click="handleRemoveItemAndAccessories(orderLine)"
      />

      <div class="product-title flex justify-between">
        <nuxt-link
          :to="productGetters.getSlug(orderLine.product)"
          :title="productGetters.getName(orderLine.product)"
          :data-clerk-product-id="orderLine.product.id"
        >
          <div>
            {{ cartGetters.getItemTitle(orderLine) }}
          </div>
          <div class="flex">
            {{ `${cartGetters.getItemWebsiteTitle(orderLine)} ${cartGetters.getStandGradeName(orderLine)}` }}
          </div>
        </nuxt-link>
        <div class="price">
          <SfPrice
            class="justify-end"
            :regular="orderLine.discount > 0 ? $currency(cartGetters.getPriceWithoutDiscountFromOrderLine(orderLine)) : null"
            :special="$currency(orderLine.priceTotal)"
          />
          <div v-if="orderLine.discountFixedPrice">
            <div>
              <span class="fixed-discount">{{ $t('Discount') }}</span>
              <span>
                -{{ $currency(orderLine.discountFixedPrice) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <template
          v-for="( accessory, acessoryIndex ) in cartGetters.getAccessoriesFromOrderLine(orderLine)"
        >
          <div :key="acessoryIndex" class="gadget flex justify-between">
            <span>+ {{ accessory.name }}</span>
            <span class="price">
              {{ $currency(accessory.priceTotal) }}
            </span>
          </div>
        </template>
      </div>

      <div class="flex my-3">
        <SfQuantitySelector
          :qty="orderLine.quantity"
          :max="orderLine.product.qty"
          :min="1"
          aria-label="Quantity"
          @input="handleUpdateItem(orderLine, $event)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';
import { SfCircleIcon, SfPrice, SfQuantitySelector } from '@storefront-ui/vue';
import { cartGetters, productGetters, useCollectedProduct } from '~/composables';
import { GreenOrderLine } from '~/green-api/types';

export default defineComponent({
  components: {
    SfQuantitySelector,
    SfPrice,
    SfCircleIcon
  },
  props: {
    orderLine: {
      type: Object as PropType<GreenOrderLine>,
      required: true
    }
  },
  onMounted() {
    window.addEventListener('input', (evt) => {
      const target = (evt as any).target;

      if (Number(target.value) < 1 && target?.id?.includes('quantitySelector')) {
        target.value = 1;
      }
    });
  },
  setup(props) {
    const { handleUpdateItem } = useCollectedProduct();
    const {handleRemoveItemAndAccessories } = useCollectedProduct(ref(props.orderLine));

    return {
      handleRemoveItemAndAccessories,
      handleUpdateItem,
      cartGetters,
      productGetters
    };
  }
});
</script>
<style scoped lang="scss">
.img-info-wrap {
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
 .img-info-wrap:hover .sf-circle-icon {
  visibility: inherit;
}
.image-container {
    max-width: 82px;
    width: 100%;
    margin-right: 42px;
  }

.product-info {
    width: 100%;
    & .product-title {
      font-size: 18px;
      font-weight: 400;
      color: #1d1f22;
      @include for-mobile {
        gap: 10px;
        margin-bottom: 10px;
      }
    }
    & .gadget {
      color: #43464e;
      font-weight: 400;
      font-size: 16px;
      span:first-child {
        width: 72.3%;
      }
      @include for-mobile {
        margin-bottom: 8px;
      }
    }
    & .code {
      color: #72757e;
      font-size: 16px;
      font-weight: 400;
      padding-top: 4px;
    }
}

.costs .price {
    color: #1d1f22;
    font-size: 18px;
    font-weight: 400;
}
.costs p {
    color: #43464e;
    font-size: 16px;
    font-weight: 400;
}

.costs {
    text-align: end;
    padding-right: 8px;
}

::v-deep .sf-circle-icon {
  height: 26px;
  width: 26px;
  bottom: 15px;
  float: right;
  left: 16px;
  @include for-desktop {
    visibility: hidden;
  }
}

::v-deep .sf-circle-icon:hover {
  visibility: initial;
}
</style>
