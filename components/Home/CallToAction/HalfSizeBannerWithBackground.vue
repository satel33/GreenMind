<script lang="ts">
import { computed, PropType } from '@nuxtjs/composition-api';
import { defineComponent } from '@vue/composition-api';
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
      root.$device.isMobile ? 547 : 660,
      root.$device.isMobile ? 680 : 496,
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
  <div
    class="p-5 md:p-10 bg-no-repeat bg-cover min-h-full min-w-full flex items-end rounded-3px lazy"
    :style="{ backgroundImage: `url('${imagePath}')`}"
  >
    <div :class="mapColorClass(data.titleColor)">
      <p class="font-bold text-[10px] uppercase mt-16">
        {{ data.miniTitle }}
      </p>
      <h3 class="font-bold text-lg md:text-[32px] leading-6 md:leading-[38px] mt-2 mb-1 md:max-w-[280px]">
        {{ data.title }}
      </h3>
      <p class="text-sm md:text-lg mb-4 md:mb-6 leading-6 max-w-[164px] md:max-w-[260px]">
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
  </div>
</template>
