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
      root.$device.isMobile ? 140 : 375,
      root.$device.isMobile ? 326 : 500,
      'half_size_image'
    ));

    return {
      imagePath,
      mapColorClass
    };
  }
});
</script>
<template>
  <div class="flex flex-row items-end 2xl:justify-between bg-[#F9F9F9] min-h[260px] md:min-h-[500px]">
    <div class="basis-7/12 md:basis-1/2 p-5 md:p-10" :class="mapColorClass(data.titleColor)">
      <p class="font-bold text-[10px] text-deep_green uppercase">
        {{ data.miniTitle }}
      </p>
      <h3
        class="font-bold text-lg md:text-[32px] leading-6 md:leading-[38px] mt-[8px] mb-[4px] text-deep_green"
      >
        {{ data.title }}
      </h3>
      <p class="text-sm md:text-lg mb-4 mr-2 md:mb-6 text-deep_green lg:max-w-[260px] xl:max-w-full">
        {{ data.subtitle }}
      </p>
      <nuxt-link :to="data.buttonUrl ? data.buttonUrl : '#'">
        <button class="custom-btn-small">
          <span class="text"> {{ data.buttonText }}</span>
          <span class="custom-circle">
            <GreenImage
              src="/images/Union.png"
              :width="7"
              :height="6"
              alt="Arrow"
            />
          </span>
        </button>
      </nuxt-link>
    </div>

    <div v-if="!data.hiddenMd" class="basis-7/12 md:basis-1/2 mt-8">
      <GreenImage
        :src="imagePath"
        :width="$device.isMobile ? 140 : 375"
        :height="$device.isMobile ? 326 : 500"
        :alt="data.title"
      />
    </div>
    <GreenImage
      v-else
      :img-attrs="{ class: 'w-[140px] h-[320px] lg:w-[300px] xl:w-[310px] 2xl:w-[348px] lg:h-[507px]'}"
      class="w-[140px] h-[320px] lg:w-[300px] xl:w-[310px] 2xl:w-[348px] lg:h-[507px]"
      :src="$config.baseURLWithoutLastBar + ($device.isMobile ? data.imageMobile : data.imageDesktop)"
      :width="300"
      :height="507"
      :alt="data.title"
    />
  </div>
</template>
