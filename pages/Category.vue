<template>
  <div>
    <div id="category">
      <LazyCategoryNavbar class="mt-7" />

      <div class="main section">
        <LazyCategorySidebarFilter
          :show-filters="showProducts"
          :facets="facets"
          :range-attributes="rangeAttributes"
          :current-category="currentCategory"
        />

        <SfLoader :class="{ loading, 'self-center': loading }" :loading="loading && !buttonLoading">
          <div v-if="showProducts" class="products">
            <transition-group
              appear
              tag="div"
              name="sf-fade"
              class="products__grid"
            >
              <LazyGreenProductCard
                v-for="(product, index) in products"
                :key="product.id"
                :product="product"
                :image-width="$device.isMobile ? 160 : 248"
                :image-height="$device.isMobile ? 206 : 375"
                @click.native="trackSelectItem(product, index)"
              />
            </transition-group>
            <div class="flex justify-end">
              <GreenButton
                v-show="hasMoreProductsToLoad"
                style-type="Primary"
                color="Green"
                :loading="buttonLoading"
                :disabled="buttonLoading"
                @click="changeItemsPerPage()"
              >
                {{ $t('See More') }}
              </GreenButton>
            </div>

            <LazyCategoryWysiwygRender :text="currentCategory.seoDescription" />
          </div>

          <LazyCategoryNoResults v-else />
        </SfLoader>
      </div>

      <LazyCategoryTopBanner
        v-show="mobileOrTabletSize"
        class="mb-7"
        :width="939"
        :height="300"
      />

      <LazyCategoryTopBanner v-show="!mobileOrTabletSize" class="mb-7" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useRouter, watch } from '@nuxtjs/composition-api';
import { SfLoader } from '@storefront-ui/vue';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { onSSR } from '@vue-storefront/core';
import { facetGetters, useFacet } from '@vue-storefront/odoo';
import { useUiCategoryHelpers, useUiHelpers, useUiState } from '~/composables';
import { setTrackSelectItem, setTrackViewItemList } from '~/resources/tracking';

export default defineComponent({
  name: 'Category',
  components: { SfLoader },
  transition: 'fade',
  emits: ['close'],
  setup(props, { root }) {
    const uiState = useUiState();
    const pageSize = ref(21);
    const buttonLoading = ref(false);

    const { getFacetsFromURL } = useUiHelpers();
    const { result, search, loading } = useFacet();
    const { categoryTree, currentCategory } = useUiCategoryHelpers(result.value);

    const { addTags } = useCache();

    const products = computed(() => facetGetters.getProducts(result.value));

    const facets = computed(() => {
      return facetGetters.getGrouped(result.value, ['color', 'size']).map((facet) => {
        facet.options.sort((a, b) => a.value - b.value);
        return facet;
      });
    });

    const rangeAttributes = computed(() => ({
      minPrice: result.value?.data?.minPrice,
      maxPrice: result.value?.data?.maxPrice
    }));

    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);

    const pagination = computed(() => facetGetters.getPagination(result.value));

    const showProducts = computed(() => (!loading.value && products.value?.length > 0) || buttonLoading.value);

    const hasMoreProductsToLoad = computed(() => pageSize.value < pagination.value?.totalItems || buttonLoading.value);

    const customQueryProducts = {
      getProductTemplatesList: 'greenGetProductList'
    };
    const customQueryCategories = {
      getCategory: 'greenGetCategory'
    };

    const changeItemsPerPage = async () => {
      buttonLoading.value = true;
      pageSize.value += 21;
      const params = {
        ...getFacetsFromURL(pageSize.value),
        productParams: getFacetsFromURL(pageSize.value).productParams,
        customQueryProducts,
        customQueryCategories
      };

      await search(params);
      buttonLoading.value = false;
    };

    onSSR(async () => {
      const params = { ...getFacetsFromURL(pageSize.value), customQueryProducts, customQueryCategories };

      await search(params);
      addTags([
        {
          prefix: CacheTagPrefix.Category,
          value: currentCategory.value?.id || params.slug_1
        }
      ]);
    });

    watch(products, () => {
      if (products.value.length > 0 && currentCategory.value) {
        setTrackViewItemList(currentCategory.value.id.toString(), currentCategory.value.name, products.value);
      }
    });

    const trackSelectItem = (product, index) => {
      if (!product && currentCategory.value) {
        return;
      }
      setTrackSelectItem(currentCategory.value.id.toString(), currentCategory.value.name, product, index);
    };

    return {
      mobileOrTabletSize,
      rangeAttributes,
      ...uiState,
      hasMoreProductsToLoad,
      buttonLoading,
      changeItemsPerPage,
      currentCategory,
      products,
      categoryTree,
      loading,
      pagination,
      result,
      facets,
      showProducts,
      trackSelectItem
    };
  },
  head() {
    return {
      title: this?.currentCategory?.seoTitleTag || this?.currentCategory?.name || 'Category page',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this?.currentCategory?.seoMetaDescription || 'Category description'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this?.currentCategory?.seoMetaDescription || 'Category description'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this?.currentCategory?.seoTitleTag || this?.currentCategory?.name || 'Category page'
        },
        {
          hid: 'twitter-title',
          name: 'twitter:title',
          content: this?.currentCategory?.seoTitleTag || this?.currentCategory?.name || 'Category page'
        },
        {
          hid: 'twitter-desc',
          name: 'twitter:description',
          content: this?.currentCategory?.seoMetaDescription || 'Category description'
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org',
            '@type': 'Category',
            name: this?.currentCategory?.name || 'Category name'
          }
        }
      ]
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~assets/css/category.scss';
</style>
