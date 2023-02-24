<script lang="ts">
import { PropType, defineComponent, reactive, ref } from '@nuxtjs/composition-api';
import { GreenProduct, WebsiteHomepagePopularTitle } from '~/green-api/types';
import { SfCarousel } from '@storefront-ui/vue';
import { productGetters } from '~/composables';
export default defineComponent({
  components: {
    SfCarousel
  },
  props: {
    products: {
      type: Array as PropType<GreenProduct[]>,
      default: () => ([])
    },
    popularTitle: {
      type: Object as PropType<WebsiteHomepagePopularTitle>,
      default: () => ({})
    }
  },
  setup() {
    const carousel = ref(null);
    const settings = reactive({
      type: 'carousel',
      rewind: true,
      perView: 4,
      slidePerPage: true,
      gap: 0,
      breakpoints: {
        1280: {
          perView: 2
        },
        1023: {
          perView: 2,
          peek: {
            before: 0,
            after: 0
          }
        }
      }
    });

    return {
      settings,
      productGetters,
      carousel
    };
  },
  computed: {
    glideIndex () {
      return this.carousel?.glide?._i;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.carousel.glide.on('run', () => {
        this.carouselFirst = !this.carouselFirst;
      });
    });
  }
});
</script>

<template>
  <section class="custom-container">
    <h2 class="text-deep_green text-[32px] md:text-[48px] font-extrabold mt-24 md:mt-[95px] mb-8">
      {{ popularTitle.title }}
    </h2>
    <SfCarousel ref="carousel" :settings="settings">
      <template #prev>
        <div />
      </template>
      <template #next>
        <div />
      </template>
      <SfCarouselItem v-for="product in products" :key="product.id">
        <nuxt-link :to="product.slug">
          <div class="custom-card-container">
            <div class="p-0 md:p-[16px] custom-card rounded-3px sm:min-w-[280px] min-h-[400px]">
              <div class="relative w-full h-full sm:min-w-[280px] min-h-[400px] flex items-center justify-center">
                <span
                  v-if="product.combinationInfoVariant.discount_perc !== 0"
                  class="z-[1] absolute top-0 right-0 text-[#339091] text-[10px] inline-block rounded-[10px] bg-[#F9C1D4] font-bold p-2.5 m-3 md:m-0 uppercase"
                >
                  Spar {{ product.combinationInfoVariant.discount_perc }}%
                </span>
                <GreenImage
                  preload
                  :src="$image(
                    product.image,
                    $device.isMobile ? 140 : 288,
                    $device.isMobile ? 248 : 442,
                    product.imageFilename
                  )"
                  class="flex justify-center items-center"
                  :width="$device.isMobile ? 140 : 288"
                  :height="$device.isMobile ? 248 : 442"
                  alt="star"
                />
              </div>
            </div>
            <p class="text-[#838A8B] text-[10px] font-bold mt-4 uppercase">
              {{ product.manufacturerName }}
            </p>
            <h3 class="text-deep_green text-[20px] py-0 font-bold">
              {{ productGetters.getName(product) }}
            </h3>
            <p class="text-deep_green text-base inline-block font-bold">
              {{ $t("From") }}
              {{ $currency(product.combinationInfoVariant.price) }}
            </p>
            <!-- <div
              class="text-[#C1C4C5] line-through ml-[18px] inline-block font-bold"
            >
              Fra 2.719.-
            </div> -->
          </div>
        </nuxt-link>
      </SfCarouselItem>
    </SfCarousel>

    <div class="flex items-center justify-center mt-8 md:mt-[56px] mb-12 md:mb-[80px] cursor-pointer">
      <div
        class="w-[330px] h-[6px] rounded-full"
        :class="{
          'bg-[#007476]': glideIndex === 0,
          'bg-[#EEEEEE]': glideIndex !== 0
        }"
        @click="carousel.glide.go('=0')"
      />
      <div
        class="w-[330px] h-[6px] rounded-full xl:hidden"
        :class="{
          'bg-[#007476]': glideIndex === 2,
          'bg-[#EEEEEE]': glideIndex !== 2
        }"
        @click="carousel.glide.go('=2')"
      />
      <div
        class="w-[330px] h-[6px] rounded-full xl:hidden"
        :class="{
          'bg-[#007476]': glideIndex === 4,
          'bg-[#EEEEEE]': glideIndex !== 4
        }"
        @click="carousel.glide.go('=4')"
      />
      <div
        :class="{
          'bg-[#007476]': glideIndex >= ($breakpoints.xl ? 4 : 6),
          'bg-[#EEEEEE]': glideIndex < ($breakpoints.xl ? 4 : 6)
        }"
        class="
        w-[330px]
        h-[6px]
        rounded-full"
        @click="carousel.glide.go($breakpoints.xl ? '=4' : '=6')"
      />
    </div>
  </section>
</template>
<style scoped>
::v-deep .sf-carousel__wrapper {
  max-width: 100%;
  padding: 0;
  margin: 0;

}
::v-deep picture {
    place-content: center;
}
</style>
