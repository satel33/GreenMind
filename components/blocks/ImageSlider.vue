<template>
  <SfHero class="top-hero mt-1.5">
    <nuxt-link to="greenfriday">
      <SfHeroItem
        class="top-hero-item"
        :image="require('/assets/images/homeHero/banner_1.jpg')"
      />
    </nuxt-link>
    <nuxt-link to="restsalg">
      <SfHeroItem
        class="top-hero-item"
        :image="require('/assets/images/homeHero/banner_2.jpg')"
      />
    </nuxt-link>
  </SfHero>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { computed } from '@nuxtjs/composition-api';
import { SfHero } from '@storefront-ui/vue';
export default defineComponent({
  components: {
    SfHero
  },
  setup(props, { root }) {
    const getSufixSize = computed(() => {
      if (root.$breakpoints.sLg) return '_768';
      if (root.$breakpoints.sMd) return '_576';
      if (root.$breakpoints.sSm) return '_384';
      return '';
    });
    return {
      getSufixSize
    };
  }
});
</script>
<style scoped lang="scss">
@import "~/assets/css/home/topHero.scss";
</style>
