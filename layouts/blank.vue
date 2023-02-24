<template>
  <div>
    <div id="layout">
      <nuxt :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlankLayout'
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";
#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}
</style>
