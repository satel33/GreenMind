<template>
  <VueSlickCarousel v-bind="settings">
    <nuxt-link
      v-for="link in Links"
      :key="link._uid"
      :to="
        link.Link2.url !== ''
          ? `/${link.Link2.url}`
          : `/${link.Link2.cached_url}`
      "
      class="hover:shadow rounded-md text-center mr-1"
    >
      <GreenImage
        :src="$transformStoryBlockImage(link.Image.filename, '295x295')"
        alt="iPhones"
        :title="$t('iPhones')"
        class="categoryCardImage"
        loading="eager"
      />
      <p class="text-center">
        {{ link.Text }}
      </p>
    </nuxt-link>
  </VueSlickCarousel>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import GreenImage from "../core/atoms/GreenImage.vue";

export default defineComponent({
  components: {
    VueSlickCarousel,
    GreenImage,
  },
  props: {
    Links: {
      type: Array,
      default: [],
    },
  },
  setup() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 4,
      initialSlide: 0,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return {
      settings,
    };
  },
});
</script>
<style scoped lang="scss">
@include for-mobile {
  ::v-deep .sf-carousel__wrapper {
    margin: 0;
    max-width: 100%;
  }
}
</style>
