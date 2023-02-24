<template>
  <SfRange
    :config="config"
    @change="$emit('change', arguments[0])"
  />
</template>

<script>
import { SfRange } from '@storefront-ui/vue';
import { computed } from '@nuxtjs/composition-api';
export default {
  components: {
    SfRange
  },
  props: {
    initialPrice: {
      type: Array,
      default: () => ([])
    },
    rangePrices: {
      type: Object,
      default: () => ({ })
    }
  },
  emits: ['change'],
  setup(props, { root }) {

    const config = computed(() => ({
      start: props.initialPrice,
      range: { min: props?.rangePrices?.minPrice || 0, max: props?.rangePrices?.maxPrice || 20000 },
      step: 10,
      connect: true,
      direction: 'ltr',
      orientation: 'horizontal',
      behaviour: 'tap-drag',
      tooltips: true,
      keyboardSupport: true,
      format: {
        to: (value) => value ? root.$currency(value) : null,
        from: (value) => value
      }
    }));

    return {
      config
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-range {
  margin: 35px 0px 60px 7px;
  width: 80%;
  height: 5px;
  z-index: 0;
}

::v-deep .noUi-handle {
  width: 20px;
  height: 20px;
  top: -3px;
  background-color: var(--_c-greenmind-fern-primary-medium-green);
  border: none;
  cursor: pointer;
}
::v-deep .noUi-handle:hover {
  background-color: var(--_c-greenmind-mint-primary-light-green);
}

::v-deep .noUi-handle:active {
  background-color: blue;
}

::v-deep .noUi-touch-area:active {
  background-color: blue;
}
::v-deep .noUi-tooltip {
  bottom: -200%;
}
::v-deep .noUi-touch-area {
  background-color: var(--_c-greenmind-fern-primary-medium-green);
}

::v-deep .noUi-touch-area:hover {
  background-color: var(--_c-greenmind-mint-primary-light-green);
}
::v-deep .noUi-base,
::v-deep .noUi-connects {
  position: initial !important;
}
</style>
