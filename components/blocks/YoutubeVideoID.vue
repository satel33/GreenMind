<template>
  <div v-if="data.Id">
    <iframe
      :src="'https://youtube.com/embed/' + data.Id"
      width="560"
      height="315"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen="allowfullscreen"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "YoutubeVideoID",
  props: {
    data: {
      default: null,
    },
  },
});
</script>
