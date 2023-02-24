<template>
  <div class="layout mx-auto">
    <div class="section">
      <div
        id="discount-campaign-page"
        class="clerk"
        data-template="@discount-campaign-page"
      ></div>
    </div>
  </div>
</template>

<style
  lang="scss"
  scoped
>
@import '~/assets/css/infoPages.scss';
.clerk {
  position: relative;
  z-index: 0;
}
</style>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
declare let Clerk: any;

export default defineComponent({
  setup() {
    onMounted(() => {
      Clerk('content', '#discount-campaign-page');
    });
  },
});
</script>
