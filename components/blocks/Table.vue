<template>
  <table v-if="data.Table">
    <tr v-for="item in data.Table.tbody" :key="item._uid">
      <td v-for="entry in item.body" :key="entry._uid">{{entry.value}}</td>
    </tr>
  </table>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "Table",
  props: {
    data: {
      default: null,
    },
  },
});
</script>
