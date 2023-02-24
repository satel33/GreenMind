<script lang="ts">
import { ref } from '@nuxtjs/composition-api';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    links: {
      type: Array,
      default: () => ([])
    }
  },
  setup() {
    const isOpen = ref(false);

    return {
      isOpen
    };
  }
});
</script>
<template>
  <div>
    <div
      class="flex items-center justify-between border-b border-border_color py-5 footer-faq"
      @click="isOpen = !isOpen"
    >
      <p class="text-header text-base">
        {{ title }}
      </p>
      <GreenImage
        src="/images/Container.png"
        :class="{ 'rotate180' :isOpen }"
        class="w-4 h-2.5"
        :width="16"
        :height="10"
        alt="container"
      />
    </div>
    <div
      class="flex p-0 -ml-1 flex-col gap-y-4 mt-4  transition-all duration-75 ease-in-out"
      :class="{
        'active': isOpen,
        'hidden': !isOpen
      }"
    >
      <nuxt-link
        v-for="link in links"
        :key="link.name"
        :to="link.url"
        class="text-base text-white px-1 rounded-custom hover:text-text_color hover:bg-header custom-width"
      >
        {{ link.name }}
      </nuxt-link>
    </div>
  </div>
</template>
