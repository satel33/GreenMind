<template>
  <nuxt-link
    title="GreenMind"
    :to="localePath('/')"
  >
    <GreenImage
      :width="$device.isMobile ? 120 : 148"
      :height="$device.isMobile ? 18 : 22"
      src="/logo.webp"
      alt="GreenMind"
      class="align-middle"
      loading="eager"
    />
  </nuxt-link>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {

    return {
    };

  }
});
</script>
