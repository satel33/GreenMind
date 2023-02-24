<template>
  <div class="relative before:absolute before:lg:w-screen before:h-full before:left-1/2 before:-translate-x-1/2 before:-z-1 mt-10 mb-20 before:w-11/12 before:rounded-xl before:lg:rounded-none" :class="[renderColor(data.Background)]">
    <ul class="flex justify-around flex-wrap">
      <li
        v-for="item in data.usp_items"
        :key="item._uid"
        class="m-5 text-center relative flex lg:block pl-5 pr-3 lg:px-0"
      >
        <GreenImage
          :src="mobileOrTabletSize ? $transformStoryBlockImage(item.image.filename, '150x150') : $transformStoryBlockImage(item.image.filename, '230x230')"
          :alt="item.image.alt ? item.image.alt : 'no alt'"
          :width="mobileOrTabletSize ? 70 : 230"
          :height="mobileOrTabletSize ? 70 : 230"
          loading="lazy"
          class=" mr-3 lg:mr-0"
        />
        <p class="font-semibold lg:text-lg max-w-[200px] lg:max-w-[185px] m-auto" :class="{'mx-auto w-4/5': mobileOrTabletSize}">
          {{ item.text }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api';
export default defineComponent({
  props: {
    data: {
      type: Object
    }
  },
  setup(_props, { root}) {
    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);
    const renderColor = (color: string) => {
      switch (color) {
        case '#f3f3f3':
          return 'before:bg-[#f3f3f3]';
        case '#e0efe8':
          return 'before:bg-[#e0efe8]';
        case '#32463d':
          return 'before:bg-[#32463d]';
        case '#7aa393':
          return 'before:bg-[#7aa393]';
        case '#fff':
          return 'before:bg-[#fff]';
        default:
          return 'before:bg-[#fff]';
      }
    };

    return {renderColor, mobileOrTabletSize};
  }
});
</script>
<style scoped lang="scss"></style>
