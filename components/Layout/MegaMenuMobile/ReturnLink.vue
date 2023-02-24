<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  emits: ['click', 'close-click'],
  setup() {

  }
});
</script>

<template>
  <div class="flex items-center gap-[104px]">
    <img
      class="w-[21px] h-[18px] my-5"
      :src="require('/assets/images/Union-black.png')"
      alt="union"
      @click="$emit('close-click')"
    >
    <div class="flex items-center gap-2">
      <img
        class="w-2 h-3"
        :src="require('/assets/images/Chevron-left-angle.png')"
        alt=""
      >
      <p
        class="text-xs text-[#339091] cursor-pointer"
        @click="$emit('click')"
      >
        Tilbage til menu
      </p>
    </div>
  </div>
</template>
