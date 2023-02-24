<template>
  <div>
    <LazyComponent
      :is="getComponentName(component.component)"
      v-for="(component, index) in content"
      :key="index"
      :data="component"
      v-bind="component"
      :is-sub-page="true"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RenderContent',
  props: {
    content: {
      type: Array
    }
  },
  setup() {
    const getComponentName = (typeName: string) => {
      switch (typeName) {
        case 'image_slider':
          return 'ImageSlider';
        case 'category_links':
          return 'CategoryLinks';
        case 'newsletter_banner':
          return 'Newsletter';
        default:
          return typeName;
      }
    };
    return {
      getComponentName
    };
  }
});
</script>
