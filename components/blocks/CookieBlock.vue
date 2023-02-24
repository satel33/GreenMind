<template>
  <div v-if="data.Boolean == true">
    <h3 class="font-bold title mb">Cookiebot informationer</h3>
    <p class="text mb">
      <script
        id="CookieDeclaration"
        :src="`https://consent.cookiebot.com/${$config.cookieBotKey}/cd.js`"
        type="text/javascript"
        async
      />
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "CookieBlock",
  props: {
    data: {
      default: null,
    },
  },
});
</script>
