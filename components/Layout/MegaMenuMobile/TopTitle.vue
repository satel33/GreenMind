<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup() {

  }
});
</script>
<template>
  <div class="flex items-center justify-between py-4 border-b border-[#8ABFC0]" @click="$emit('click')">
    <span class="text-xl text-search_item_text_color">{{ title }}</span>
    <GreenImage
      src="/images/Chevron-black.png"
      :width="11"
      :height="18"
      alt="chevron"
    />
  </div>
</template>
