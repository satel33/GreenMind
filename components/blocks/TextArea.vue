<template>
  <RichText v-if="data && data.text" :text="data.text" />
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
export default defineComponent({
  name: "TextArea",
  props: {
    data: {
      default: null,
    },
  },
  setup() {},
});
</script>

<style lang="scss">
@import "~/assets/css/textArea.scss";
</style>
