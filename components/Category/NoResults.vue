<template>
  <div
    class="text-center mt-20"
    style="min-height: 400px;"
  >
    <SfImage
      :width="230"
      :height="230"
      src="/error/search_error.webp"
      class="before-results__picture search_error"
      alt="error"
      loading="lazy"
    />
    <p class="before-results__paragraph mt-3">
      {{ $t("Sorry, we didnt find what youre looking for") }}
    </p>
    <!-- <SfButton
      class="before-results__button color-secondary smartphone-only"
      @click="$emit('close')"
    >
      {{ $t("Go back") }}
    </SfButton> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { SfImage, SfButton } from '@storefront-ui/vue';
export default defineComponent({
  components: {
    SfImage,
    SfButton
  },
  setup() {}
});
</script>
<style scoped lang="scss">
  
  ::v-deep .search_error .sf-image{
    border-radius: 10px;
    opacity: 0.7;
  }

</style>
