<script lang="ts">
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

  }
});
</script>

<template>
  <div class="flex p-0 flex-col gap-y-6 md:-ml-2.5">
    <span class="text-sm text-header pl-2.5">{{ title }}</span>
    <nuxt-link
      v-for="link in links"
      :key="link.name"
      :to="link.url"
      class="text-base text-white py-1 px-2.5 rounded-custom hover:text-text_color hover:bg-header custom-width"
    >
      {{ link.name }}
    </nuxt-link>
  </div>
</template>
