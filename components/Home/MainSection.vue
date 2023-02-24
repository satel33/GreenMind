<script lang="ts">
import { computed, PropType } from "@nuxtjs/composition-api";
import { defineComponent } from "@vue/composition-api";
import { WebsiteHomepageHighlight } from "~/green-api/types";
import { useWebsiteHomePageData } from "~/composables";

export default defineComponent({
  props: {
    image: {
      type: Object,
      required: true,
    },
    highlights: {
      type: Array as PropType<WebsiteHomepageHighlight[]>,
      required: true,
    },
  },
  setup(props, { root }) {
    props.image;
    const { mapColorClass } = useWebsiteHomePageData();
    const imagePath = computed(() =>
      root.$image(
        root.$device.isMobile
          ? props.image.imageMobile
          : props.image.imageDesktop,
        root.$device.isMobile ? 664 : 1440,
        root.$device.isMobile ? 442 : 816,
        props.image.title?.split(" ")?.[0] || "full-image"
      )
    );
    return {
      mapColorClass,
      imagePath,
    };
  },
});
</script>
<template>
  <section>
    <div
      class="bg-hero-pattern background-linear-gradient bg-no-repeat bg-cover bg-bottom pt-40 relative md:pt-52 pb-9 md:pb-[107px]"
      :style="{ backgroundImage: `url('${imagePath}')` }"
    >
      <div class="custom-container grid grid-cols-12">
        <div class="col-span-12 lg:col-span-6">
          <h1
            class="font-bold text-5xl md:text-[80px] lg:leading-[80px] text-white mb-10"
            :class="mapColorClass(image.titleColor)"
          >
            {{ image.title }}
          </h1>
          <nuxt-link :to="image.buttonUrl ? image.buttonUrl : '#'">
            <button class="custom-btn-large w-[175px] md:w-[202px]">
              <span class="text pl-2 hidden md:block">{{
                image.buttonText
              }}</span>
              <span class="text pl-2 block md:hidden">{{
                image.buttonText
              }}</span>
              <span class="custom-circle">
                <GreenImage
                  src="/images/Union.png"
                  loading="eager"
                  :width="$device.isMobile ? 15 : 7"
                  :height="$device.isMobile ? 15 : 6"
                  alt="Arrow"
                />
              </span>
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="bg-modal_bg md:bg-transparent">
      <div class="custom-container md:relative md:-top-11">
        <div
          class="bg-modal_bg py-5 lg:py-8 md:px-16 rounded-none lg:rounded-full flex items-center flex-wrap justify-start md:justify-center gap-x-7 md:gap-x-0 md:justify-between w-full"
        >
          <div
            v-for="(item, index) in highlights"
            :key="index"
            class="flex items-center gap-[16px] mb-[7px] md:mb-[0px]"
          >
            <GreenImage
              :src="$config.baseURLWithoutLastBar + item.image"
              :width="18"
              :height="18"
              loading="eager"
              alt="insurance"
            />
            <p class="text-base text-[#006A6B] leading-[16px]">
              {{ item.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
