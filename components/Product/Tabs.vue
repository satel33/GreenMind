<template>
  <SfTabs
    :open-tab="description ? 1: 2"
    class="product__tabs"
  >
    <SfTab
      v-show="description"
      data-cy="product-tab_description"
      :title="$t('Description')"
    >
      <div class="product__description">
        <span v-html="description" />
      </div>
    </SfTab>
    <SfTab
      :title="$t('Specifications')"
      data-cy="product-tab_additional"
      class="product__additional-info"
    >
      <div class="product__additional-info">
        <div
          v-for="attributeValue, index in attributesWithoutGrade"
          :key="index"
        >
          <p class="product__additional-info__title">
            {{ attributeValue.attribute.name }}
          </p>
          <p class="product__additional-info__value">
            {{ attributeValue.name }}
          </p>
        </div>
      </div>
    </SfTab>
  </SfTabs>
</template>
<script lang="ts">
import { defineComponent, computed, PropType, ref, onMounted } from '@nuxtjs/composition-api';
import { productGetters } from '~/composables';
import { SfTabs } from '@storefront-ui/vue';
import { GreenProduct } from '~/green-api/types';
export default defineComponent({
  components: {
    SfTabs
  },
  props: {
    product: {
      type: Object as PropType<GreenProduct>,
      default: () => ({})
    }
  },
  setup(props) {
    const specificationtab = ref(null);
    const description = computed(() => productGetters.getDescription(props.product).replace(/\n/g, '<br/>'));
    const attributesWithoutGrade = computed(() => [
      ...productGetters.getAttributesValues(props.product),
      ...productGetters.getSchemaAttributeValues(props.product)
    ]);

    return {
      specificationtab,
      attributesWithoutGrade,
      description
    };
  }
});
</script>

<style scoped lang="scss">

.product__additional-info {
    color: var(--c-link);
    @include font(--additional-info-font, var(--font-weight--light), var(--font-size--sm), 1.6,  var(--font-family--primary));
    &__title {
        font-weight: var(--font-weight--normal);
        font-size: var(--font-size--base);
    }
    &__value {
        margin: 0 0 var(--spacer-sm);
    }
    &__paragraph {
        margin: 0;
    }
}
</style>
