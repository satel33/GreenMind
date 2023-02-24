<template>
  <div>
    <rich-text-renderer :document="text" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'RichText',
  props: {
    text: {
      type: Object,
      default: null
    }
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/richTextBlock.scss";
</style>
