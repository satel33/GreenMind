<template>
  <RichText v-if="data && data.title" :text="data.title" />
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
export default defineComponent({
  name: "Headline",
  props: {
    data: {
      default: null,
    },
  },
  setup() {},
});
</script>

<style lang="scss">
@import "~/assets/css/headline.scss";
</style>
