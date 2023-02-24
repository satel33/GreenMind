<template>
  <div class="text-wrap">
    <div class="container">
      <!-- <h1 class="font-bold title">
        {{ data.Headline }}
      </h1> -->
      <RenderContent :content="data.Blocks" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import RenderContent from "~/components/blocks/RenderContent.vue";
import LazyHydrate from "vue-lazy-hydration";

export default defineComponent({
  name: "Textpage",
  components: { LazyHydrate, RenderContent },
  transition: "fade",
  props: {
    data: {
      default: null,
    },
  },
  setup() {},
});
</script>
<style lang="scss">
@import "~/assets/css/textPages.scss";
</style>
