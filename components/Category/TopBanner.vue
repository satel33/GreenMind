<template>
  <div>
    <GreenImage
      src="/images/homeUspBanner/banner_desktop_1.webp"
      :width="2000"
      :height="250"
      class="usp_banner_products"
      alt="Banner Desktop"
    />
  </div>
</template>

<script lang="ts">
import { SfImage } from '@storefront-ui/vue';
import { computed, defineComponent } from '@nuxtjs/composition-api';
export default defineComponent({
  components: { SfImage },
  setup(_, { root }) {
    const iconWidth = computed(() => root.$device.isMobile ? 50 : 74);
    const iconHeight = computed(() => root.$device.isMobile ? 52 : 69);
    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);

    return {
      mobileOrTabletSize,
      iconWidth,
      iconHeight
    };
  }
});
</script>

<style scoped lang="scss">

::v-deep .usp_banner_products .sf-image{
  border-radius: 10px;
  /* --- Resize according size of screen --- */
  max-width: 100%;
  height: auto;
  width: auto\9;
}
 ::v-deep .usp_banner_products  {
    display: flex;
    justify-content: center;
    & .sf-image--placeholder {
      text-align: center;
      width: 200px;
      height: 200px;
    }
  }

</style>
