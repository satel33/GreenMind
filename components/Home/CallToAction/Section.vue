<script lang="ts">
import { PropType } from '@nuxtjs/composition-api';
import { defineComponent } from '@vue/composition-api';
import { WebsiteHomepageBanner } from '~/green-api/types';
import LazyHydrate from 'vue-lazy-hydration';

export default defineComponent({
  components: {
    LazyHydrate
  },
  props: {
    list: {
      type: Array as PropType<WebsiteHomepageBanner[]>,
      default: () => ([])
    },
    containerStyle: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const getComponenteName = (item: WebsiteHomepageBanner, index: number) => {
      if (item.size === 'full') {
        return 'HomeCallToActionFullSizeBanner';
      }
      return 'HomeCallToActionHalfSizeBannerWithBackground';
    };

    return {
      getComponenteName
    };
  }
});
</script>

<template>
  <section class="custom-container">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-[12px] gap-y-12 md:gap-y-20" :style="containerStyle">
      <component
        :is="getComponenteName(item, index)"
        v-for="(item, index) in list"
        :key="index"
        when-idle
        :data="item"
      />
    </div>
  </section>
</template>
