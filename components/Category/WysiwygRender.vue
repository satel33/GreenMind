<template>
  <div v-html="text" />
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  setup() {

  }
});
</script>
