<template>
  <div class="space-block">
    <rich-text-renderer :document="data.space" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
export default defineComponent({
  name: "SpaceBlock",
  props: {
    data: {
      default: null,
    },
  },
});
</script>

<style lang="scss">
.space-block .space20 {
  display: block;
  height: 20px;
}
.space-block .space28 {
  display: block;
  height: 28px;
}
.space-block .space36 {
  display: block;
  height: 36px;
}
.space-block .space40 {
  display: block;
  height: 40px;
}
</style>
