<template>
  <div v-show="showProducts">
    <slot> </slot>
    <span
      :id="id"
      class="clerk"
      v-bind="attr"
    ></span>
  </div>
</template>

<style
  lang="scss"
  scoped
>
.clerk {
  position: relative;
  z-index: 0;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';

declare let Clerk: any;

type ClerkAttributeTypes = 'data-template' | 'data-products' | 'email';

type ClerkAttributes = {
  [key in ClerkAttributeTypes]: string;
};

export default defineComponent({
  props: {
    id: { type: String, required: true },
    attr: { type: Object as () => ClerkAttributes },
  },
  setup(props) {
    const showProducts = ref(false);

    onMounted(() => {
      // Mount clerk product slider
      Clerk('content', '#' + props.id);

      // handle all rendered events
      Clerk('on', 'rendered', function (content) {
        // hide all if no content is loaded
        if (content.id === props.id) showProducts.value = true;
      });
    });

    return {
      showProducts,
    };
  },
});
</script>
