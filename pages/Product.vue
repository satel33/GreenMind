<template>
  <div
    v-if="loading"
    style="height: 500px"
  >
    <SfLoader :loading="loading" />
  </div>
  <div
    v-else
    id="product"
  >
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <div>
        <GreenGallery
          :bullets="$breakpoints.sMd"
          :images="productGallery"
          :image-width="mainImageWidth"
          :image-height="mainImageHeigth"
          :thumb-width="160"
          :thumb-height="160"
          :slider-options="{ classes: 'items-center' }"
          :discount-percentage="product.combinationInfoVariant.discount_perc !== 0 ? product.combinationInfoVariant.discount_perc : null"
          image-tag="nuxt-picture"
          :nuxt-img-config="{
            fit: 'cover',
            sizes: `md:${mainImageWidth}px`,
            loading: 'eager',
          }"
          :thumb-nuxt-img-config="{ fit: 'cover' }"
          image-loading="eager"
          class="product__gallery"
        >
          <template #up-bullets>
            <img
              v-show="productGetters.getWebsiteTagUrl(product)"
              :src="`${$config.baseURL}${productGetters.getWebsiteTagUrl(product)}`"
              :width="$breakpoints.sLg ? 290 : 480"
              :height="104"
              alt="Tag Botom Products"
              class="tag_bottom_products"
            >
          </template>
        </GreenGallery>
      </div>

      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left product_title mb-1"
          />
        </div>
        <SfHeading
          :title="product.websiteSubtitle"
          :level="3"
          class="sf-heading--no-underline sf-heading--left product_variants mb-4"
        />

        <div v-show="!productPriceIsLessThanFive" class="total-price-buttons mt-7 ">
          <SfPrice
            v-show="productInStock"
            :special="combinationInfo.discount_perc !== 0 ? $currency(combinationInfo.price) : null"
            :regular="$currency(combinationInfo.list_price)"
          />
          <p
            v-show="!productInStock"
            class="total-price"
          >
            {{ $t('Out of stock') }}
          </p>
        </div>
        <client-only>
          <div class="flex justify-center lg:justify-start">
            <anyday-price-tag
              v-if="!productPriceIsLessThanThreeHundreds && productInStock && !loading"
              currency="DKK"
              :price-tag-token="$config.anyDayTagToken"
              :total-price="combinationInfo.discount_perc !== 0 ? toInteger(combinationInfo.price) : toInteger(combinationInfo.list_price)"
              environment="production"
            />
          </div>
        </client-only>
        <div class="mt-5">
          <LazyProductSelectGrade
            v-show="productGrades && productGrades.length > 0"
            :product-grades="productGrades"
            :product-variant-id="combinationInfo.product_id"
            @update="handleSelectNewGrade"
          />

          <div
            v-show="accessoryProducts && accessoryProducts.length > 0"
            class="checkbox-title-wrap"
          >
            <div class="title">
              {{ $t('Purchases') }}
            </div>
            <GreenCheckbox
              v-for="accessoryProduct in accessoryProducts"
              :key="accessoryProduct.id"
              :value="accessoryProduct.id"
              :emit-value="true"
              :title="accessoryProduct.combinedName"
              :description="accessoryProduct.description"
              :price="$currency(accessoryProduct.combinationInfoVariant.price)"
              :has-image="true"
              :disabled="!productInStock"
              :image="$image(accessoryProduct.image, 82, 70, accessoryProduct.imageFilename)"
              @change="selectAcessories(accessoryProduct)"
            />
          </div>

          <div v-show="!productPriceIsLessThanFive" class="total-price-buttons mt-7 justify-center">
            <div v-show="!productInStoreOnly && productInStock">
              <SfQuantitySelector
                v-show="productInStock"
                v-model="quantity"
                :max="product.qty"
                :min="1"
              />
              <div class="text-center w-full mt-5 text-md font-light	">
                {{ maxQty }} {{ $t('in stock') }}
              </div>
            </div>
            <div class="buttons">
              <GreenButton
                v-show="!productPriceIsLessThanFive"
                style-type="Primary"
                color="Green"
                shape="Round"
                size="Medium"
                class="mb-3"
                :class="productInStoreOnly ? 'pseudo-disable' : ''"
                :disabled="anyLoading || !productInStock"
                :loading="anyLoading"
                @click="handleAddItem()"
              >
                <template v-if="productInStoreOnly">
                  {{ $t('Only available in store') }}
                </template>
                <template v-else>
                  {{ productInStock ? $t('Add to Cart') : $t('Out of stock') }}
                </template>
              </GreenButton>

              <GreenButton
                v-show="productInStock"
                style-type="Tertiary"
                color="Grey"
                shape="Round"
                size="Medium"
                @click="handleStoreStatus"
              >
                {{ $t('SEE STOCK STATUS IN STORE') }}
              </GreenButton>
            </div>
          </div>
        </div>

        <LazyHydrate when-idle>
          <LazyProductBanner />
        </LazyHydrate>

        <LazyHydrate when-idle>
          <LazyProductTabs :product="product" />
        </LazyHydrate>
      </div>
    </div>

    <LazyHydrate when-idle>
      <ProductStoreStatus :id="product.id" />
    </LazyHydrate>

    <SfBottomModal
      v-show="!productPriceIsLessThanFive && !userInBottomOfPage && !isCartSidebarOpen && !isHamburguerMenuOpen"
      id="bottom-modal"
      is-open
    >
      <GreenButton
        v-show="!productPriceIsLessThanFive"
        class="w-full h-full text-white text-2xl font-light "
        style-type="Primary"
        color="Green"
        shape="Rectangle"
        size="Medium"
        :class="productInStoreOnly ? 'pseudo-disable' : ''"
        :disabled="anyLoading || !productInStock"
        :loading="anyLoading"
        @click="handleAddItem()"
      >
        <template>
          <div v-show="productInStoreOnly">
            {{ $t('Only available in store') }}
          </div>
          <div v-show="!productInStoreOnly">
            {{ $currency(totalPriceWithSelectedAccessories) }} | {{ productInStock ? $t('Add to Cart') : $t('Out of stock') }}
          </div>
        </template>
      </GreenButton>
      <template #close-mobile>
        <div />
      </template>
    </SfBottomModal>
  </div>
</template>
<script>
import { computed, defineComponent, onMounted, reactive, ref, useRoute, useRouter, watch } from '@nuxtjs/composition-api';
import { SfBreadcrumbs, SfHeading, SfLoader, SfPrice, SfQuantitySelector, SfBottomModal } from '@storefront-ui/vue';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { onSSR } from '@vue-storefront/core';
import { useFacet, useMultipleProduct, useProduct } from '@vue-storefront/odoo';
import LazyHydrate from 'vue-lazy-hydration';
import { facetGetters, productGetters, useUiState, useCurrency } from '~/composables';
import { setAddToCart, setTrackViewItem } from '~/resources/tracking';
export default defineComponent({
  name: 'Product',
  components: {
    SfHeading,
    SfLoader,
    SfBreadcrumbs,
    LazyHydrate,
    SfQuantitySelector,
    SfPrice,
    SfBottomModal
  },
  beforeRouteLeave(to, from, next) {
    if (this.isStoreModalOpen) {
      this.toggleStoreModal();
    }

    next();
  },
  transition: 'fade',
  setup(props, { root }) {
    const { path } = useRoute().value;
    const selectedAccessories = reactive(new Set([]));
    const selectedAccessoriesPrice = ref([]);
    const quantity = ref(1);
    const userInBottomOfPage = ref(false);
    const loading = ref(false);
    const { toggleStoreModal, isStoreModalOpen } = useUiState();
    const { toggleCartSidebar, isCartSidebarOpen, isHamburguerMenuOpen } = useUiState();
    const { products, search } = useProduct(`products-${path}`);
    const { products: relatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    const { addMultipleProductsToCart, loading: addLoading } = useMultipleProduct();
    const { addTags } = useCache();
    const router = useRouter();
    const { toInteger } = useCurrency();

    const product = computed(() => {
      return {
        ...products.value
      };
    });

    const properties = computed(() => productGetters.getProperties(product.value));
    const code = computed(() => productGetters.getCode(product.value));
    const combinationInfo = computed(() => product.value?.combinationInfoVariant || {});
    const maxQty = computed(() => product.value.qty > 10 ? '10+' : product.value.qty);
    const breadcrumbs = computed(() => facetGetters.getBreadcrumbsByProduct(product.value));
    const sliderProducts = computed(() => product.value.alternativeProducts || []);
    const accessoryProducts = computed(() =>
      productGetters.getAccessoryProducts(product.value).filter((accessory) => accessory.isInStock)
    );
    const productGrades = computed(() => productGetters.getGrades(product.value));
    const productInStock = computed(() => product.value?.isInStock);
    const productInStoreOnly = computed(() => product.value?.inStoreOnly);
    const productPriceIsLessThanFive = computed(() => combinationInfo.value.list_price < 5);
    const productPriceIsLessThanThreeHundreds = computed(() => combinationInfo.value.list_price < 300);

    const mainImageWidth = computed(() => {
      return root.$breakpoints.sSm ? 375 : root.$breakpoints.sLg ? 288 : 442;
    });
    const mainImageHeigth = computed(() => {
      return root.$breakpoints.sSm ? 500 : root.$breakpoints.sLg ? 375 : 664;
    });

    const productGallery = computed(() => [
      ...productGetters.getGallery(product.value).map((img) => ({
        mobile: {
          url: root.$image(img.small, 160, 160, productGetters.getImageFilename(product.value))
        },
        desktop: {
          url: root.$image(
            img.normal,
            mainImageWidth.value,
            mainImageHeigth.value,
            productGetters.getImageFilename(product.value)
          )
        },
        big: {
          url: root.$image(
            img.big,
            mainImageWidth.value,
            mainImageHeigth.value,
            productGetters.getImageFilename(product.value)
          )
        },
        alt: product.value.name || 'alt'
      })),
      ...(product?.value?.mediaGallery?.map((img) => ({
        mobile: {
          url: root.$image(img.image, 160, 160, productGetters.getImageFilename(img))
        },
        desktop: {
          url: root.$image(
            img.image,
            mainImageWidth.value,
            mainImageHeigth.value,
            productGetters.getImageFilename(img)
          )
        },
        big: {
          url: root.$image(
            img.image,
            mainImageWidth.value,
            mainImageHeigth.value,
            productGetters.getImageFilename(img)
          )
        },
        alt: product.value.name || 'alt'
      })) || [])
    ]);

    const handleSelectNewGrade = async (slug) => {
      router.push({ path: slug, params: { keepScroll: true } });
    };

    onSSR(async () => {
      loading.value = true;
      await search({
        slug: path,
        cacheKey: `API-P${root.$route.path}`,
        customQuery: { getProductTemplate: 'greenGetProduct' }
      });

      if (!product.value.id) {
        root.$nuxt.error({ statusCode: 404, message: '' });
        return;
      }

      loading.value = false;
      addTags([{ prefix: CacheTagPrefix.Product, value: product.value.id }]);
    });

    watch(products, () => {
      if (products.value) {
        setTrackViewItem(products.value);

        Clerk('call', 'log/product', { product: products.value.id });
      }
    });

    const scroll = () => {
      window.onscroll = () => {
        const bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;

        userInBottomOfPage.value = false;
        if (bottomOfWindow) {
          userInBottomOfPage.value = true;
        }
      };
    };

    onMounted(() => {
      scroll();
    });

    const selectAcessories = (accessory) => {
      if (selectedAccessories.has(accessory.id)) {
        selectedAccessories.delete(accessory.id);
        selectedAccessoriesPrice.value = selectedAccessoriesPrice.value.filter(item => item !== accessory.combinationInfoVariant.price);
        return;
      }
      selectedAccessoriesPrice.value.push(accessory.combinationInfoVariant.price);
      selectedAccessories.add(accessory.id);
    };

    const anyLoading = computed(() => {
      return loading.value || addLoading.value;
    });

    const totalPriceWithSelectedAccessories = computed(() => {
      let totalAccessoriesPrice = 0;
      selectedAccessoriesPrice.value?.forEach(num => {
        totalAccessoriesPrice += num;
      });

      if (combinationInfo.value.discount_perc !== 0) {
        return combinationInfo.value.price + totalAccessoriesPrice;
      }
      return combinationInfo.value.list_price + totalAccessoriesPrice;

    });

    const handleAddItem = async () => {
      if (!productInStock.value) return;

      if (productInStoreOnly.value) return;

      const params = {
        products: [
          {
            id: product.value.id,
            quantity: Number(quantity.value),
            accessoryToIds: [...selectedAccessories]
          }
        ],
        customQuery: { cartAddMultipleItems: 'greenCartAddMultipleItem' }
      };

      await addMultipleProductsToCart(params);
      const accessories = accessoryProducts.value.filter(product => [...selectedAccessories].indexOf(product.id) !== -1);
      setAddToCart(product.value, false, accessories);

      if (!isCartSidebarOpen.value) {
        toggleCartSidebar(true);
      }
    };

    const handleStoreStatus = () => {
      toggleStoreModal();
    };

    return {
      totalPriceWithSelectedAccessories,
      selectedAccessoriesPrice,
      isHamburguerMenuOpen,
      isCartSidebarOpen,
      userInBottomOfPage,
      toInteger,
      productPriceIsLessThanFive,
      productPriceIsLessThanThreeHundreds,
      productInStoreOnly,
      toggleStoreModal,
      quantity,
      isStoreModalOpen,
      productInStock,
      mainImageWidth,
      mainImageHeigth,
      handleSelectNewGrade,
      productGrades,
      handleStoreStatus,
      handleAddItem,
      selectedAccessories,
      selectAcessories,
      anyLoading,
      combinationInfo,
      loading,
      breadcrumbs,
      product,
      code,
      maxQty,
      properties,
      relatedProducts: computed(() => productGetters.getFiltered(relatedProducts.value, { master: true })),
      relatedLoading,
      productGetters,
      productGallery,
      useFacet,
      facetGetters,
      sliderProducts,
      accessoryProducts
    };
  },
  head() {
    return {
      title: `${this.productGetters.producHasAnyAttribute(this.product) ? 'Brugt' : ''} ${this.product.combinedName} | GreenMind`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Køb en brugt ${this.product.combinedName} hos GreenMind. Køb istandsat elektronik hos GreenMind med 3 års garanti. Se mere`
        },
        { hid: 'twitter-site', name: 'twitter:site', content: '@greenmind' },
        {
          hid: 'twitter-type',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter-title',
          name: 'twitter:title',
          content: this.combinationInfo?.display_name || ''
        },
        {
          hid: 'twitter-desc',
          name: 'twitter:description',
          content: `Køb en brugt ${this.product.combinedName} hos GreenMind. Køb istandsat elektronik hos GreenMind med 3 års garanti. Se mere`
        },
        {
          hid: 'twitter-image',
          name: 'twitter:image',
          content: this.productGallery?.[0]?.desktop?.url || ''
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `Køb en brugt ${this.product.combinedName} hos GreenMind. Køb istandsat elektronik hos GreenMind med 3 års garanti. Se mere`
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `Brugt ${this.product.combinedName} | GreenMind`
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          json: this.product?.jsonLd
        },
        {
          type: 'application/ld+json',
          json: this.product?.jsonLdBreadcrumb
        },
        {
          id: 'Anyday',
          type: 'module',
          src: 'https://my.anyday.io/webshopPriceTag/anyday-price-tag-da-es2015.js'
        }
      ]
    };
  }
});
</script>

<style
  lang="scss"
  scoped
>
@import '~/assets/css/product.scss';
</style>
