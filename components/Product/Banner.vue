<template>
  <div>
    <GreenImage
      src="/images/homeUspBanner/banner_desktop_1.webp"
      :width="556"
      :height="120"
      alt="Banner Mobile"
      class="usp_banner_products"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  setup() {

  }
});
</script>
<style scoped lang="scss">

  ::v-deep .usp_banner_products .sf-image{
    min-width: 100%;
    min-height: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    margin-top: 7%;
    /* --- Resize according size of screen --- */
    max-width: 100%;
    height: auto;
    width: auto\9;
    @include for-mobile {
      justify-content: center;
    }

  }

</style>
