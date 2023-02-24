<template>
  <div class="description-wrap">
    <div class="title-main">
      {{ title }}
    </div>
    <p class="description-main">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  setup() {

  }
});
</script>
<style scoped lang="scss">
  .description-wrap .title-main {
    text-align: end;
    color: #1d1f22;
    margin-bottom: 10px;
    @include for-mobile {
      text-align: center;
    }
  }

  .description-wrap .description-main {
    font-size: 14px;
    color: #72757e;
    text-align: end;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f2f3;
    margin-bottom: 26px;
    @include for-mobile {
      text-align: center;
    }
  }
</style>
