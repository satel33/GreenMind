<template>
  <nuxt-link
    :to="productGetters.getSlug(product)"
    :title="productGetters.getName(product)"
    :data-clerk-product-id="product.id"
  >
    <SfProductCard
      :key="product.id"
      data-cy="category-product-card"
      :style="{ '--index': product.id }"
      :image-width="imageWidth"
      :image-height="imageHeight"
      :title="productGetters.getName(product)"
      :image="
        $image(
          productGetters.getCoverImage(product),
          imageWidth,
          imageHeight,
          productGetters.getImageFilename(product)
        )
      "
      :nuxt-img-config="{ fit: 'cover' }"
      image-tag="nuxt-img"
      :badge-label="productHasDiscont ? `-${productDiscontPerc}%` : null"
      :regular-price="$currency(productGetters.getPrice(product).regular)"
      :special-price=" productGetters.getPrice(product).special && $currency(productGetters.getPrice(product).special) "
      :score-rating="false"
      :wishlist-icon="false"
      :show-add-to-cart-button="true"
      class="products__product-card hover:drop-shadow-xl"
      @click.native="clerkClick"
    >
      <div
        slot="title"
        class="title-flex flex flex-col place-items-center text-center"
      >
        <span class="green-product-card__title">{{
          productGetters.getName(product)
        }}</span>
        <span class="green-product-card__description">
          {{ product.websiteSubtitle || "-" }}
        </span>
      </div>

      <div slot="price" class="price-flex flex justify-center items-baseline">
        <span class="green-product-card__fra">{{ $t("From") }}</span>
        <span class="green-product-card__price">{{
          $currency(priceWithDiscount)
        }}</span>
      </div>
      <template #add-to-cart>
        <img
          v-if="productGetters.getWebsiteTagUrl(product)"
          :src="`${$config.baseURL}${productGetters.getWebsiteTagUrl(product)}`"
          :width="imageWidth"
          :height="104"
          alt="Tag Botom Products"
          class="tag_bottom_products"
        >
        <div v-else />
      </template>
    </SfProductCard>
  </nuxt-link>
</template>

<script lang="ts">
declare let Clerk: any;

import { SfProductCard } from '@storefront-ui/vue';
import { productGetters } from '~/composables';
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api';
import { GreenProduct } from '~/green-api/types';

export default defineComponent({
  components: {
    SfProductCard
  },
  props: {
    imageWidth: {
      type: Number,
      default: 248
    },
    imageHeight: {
      type: Number,
      default: 375
    },
    product: {
      type: Object as PropType<GreenProduct>,
      default: () => ({})
    }
  },
  setup(props) {
    const productDiscontPerc = computed(() => props.product?.combinationInfoVariant?.discount_perc);
    const productHasDiscont = computed(() => props.product?.combinationInfoVariant?.discount_perc !== 0);
    const priceWithDiscount = computed(() => props.product?.combinationInfoVariant?.price || 0);

    const clerkClick = () => {
      Clerk('click', '*[data-clerk-product-id]');
    };
    return {
      clerkClick,
      priceWithDiscount,
      productDiscontPerc,
      productHasDiscont,
      productGetters
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/greenProductCard.scss";
</style>
