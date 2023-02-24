<script lang="ts">
import { computed, PropType } from '@nuxtjs/composition-api';
import { defineComponent } from '@vue/composition-api';
import { WebsiteHomepageBanner } from '~/green-api/types';
import { useWebsiteHomePageData } from '~/composables';

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { root }) {
    const { mapColorClass } = useWebsiteHomePageData();

    const imagePath = computed(() => root.$image(
      (root.$device.isMobile ? props.data.imageMobile : props.data.imageDesktop),
      root.$device.isMobile ? 547 : 1332,
      root.$device.isMobile ? 680 : 680,
      'full_size_image'));
    return {
      imagePath,
      mapColorClass
    };
  }
});
</script>

<template>
  <div
    class="col-span-1 bg-white bg-no-repeat bg-contain md:col-span-2 min-h-[680px] min-w-full bg-[#96D5D2] flex flex-wrap flex-col-reverse md:flex-row justify-start md:justify-between rounded-3px"
    :style="{ backgroundImage: `url('${imagePath}')`}"
  >
    <div class="px-5 md:px-0 lg:pl-[100px] flex-1" :class="mapColorClass(data.titleColor)">
      <h2 class="font-extrabold text-[36px] xl:text-[77px] leading-[44px] xl:leading-[80px] xl:max-w-[643px] mt-0 md:mt-[108px]">
        {{ data.title }}
      </h2>
      <p class="text-base md:text-[20px] leading-6 md:leading-[28px] md:max-w-[540px] mt-5 mb-5 lg:mb-10">
        {{ data.subtitle }}
      </p>
      <nuxt-link :to="data.buttonUrl ? data.buttonUrl : '#'">
        <button class="hidden lg:flex custom-btn-large w-[171px] mb-5 md:-mb-0">
          <span class="text pl-2">{{ data.buttonText }}</span>
          <span class="custom-circle w-8 h-8">
            <GreenImage
              :src="require('/assets/images/Union.png')"
              :width="7"
              :height="6"
              alt="Arrow"
            />
          </span>
        </button>
        <button class="md:hidden custom-btn-small mb-5">
          <span class="text">{{ data.buttonText }}</span>
          <span class="custom-circle">
            <GreenImage
              src="/images/Union.png"
              :width="7"
              :height="6 "
              alt="Arrow"
            />
          </span>
        </button>
      </nuxt-link>
    </div>
    <div class="flex-none relative lg:flex-1 xl:flex-none" />
  </div>
</template>
