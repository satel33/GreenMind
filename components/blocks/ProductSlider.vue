<template>
  <div class="product-recommendations bg-gm-c-grey mt-7 lg:mt-20">
    <GreenProductRecommendationsClerk
      class="layout py-14 mx-auto"
      :id="clerkId"
      :attr="{
        'data-template': dataTemplate,
      }"
    >
      <SfHeading
        class="mb-10 product-recommendations__heading"
        :title="headline"
        :level="2"
      />
    </GreenProductRecommendationsClerk>
  </div>
</template>
<script>
import { SfHeading, SfLoader } from '@storefront-ui/vue';
import GreenImage from '~/components/core/atoms/GreenImage.vue';

export default {
  components: {
    SfLoader,
    GreenImage,
    SfHeading,
  },
  props: {
    dataTemplate: {
      type: String,
      default: null,
      required: true,
    },
    clerkId: {
      type: String,
      default: null,
      required: true,
    },
    headline: {
      type: String,
      default: null,
      required: false,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style
  lang="scss"
  scoped
>
@import '~/assets/css/home/index.scss';
</style>
