<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { SfImage, SfSkeleton } from '@storefront-ui/vue';

export default defineComponent({
  components: {
    SfSkeleton
  },
  extends: SfImage,
  props: {
    placeholder: {
      type: String,
      default: () => '/default_image.webp'
    },
    imageTag: {
      type: String,
      default: 'nuxt-picture',
      validator: (value: string) =>
        ['', 'img', 'nuxt-img', 'nuxt-picture'].includes(value)
    },
    nuxtImgConfig: {
      type: Object,
      default: () => ({
        format: 'webp'
      })
    },
    imgAttr: {
      type: Object,
      default: () => ({})
    },
    srcsets: {
      type: String,
      default: ''
    }
  },
  computed: {
    isPlaceholderVisible() {
      return (this.loaded || (!this.loaded && !this.placeholder)
      );
    },
    skeletonSize () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    attributes() {
      return this.imageTag === 'img' || this.imageTag === 'nuxt-picture'
        ? {
          ...this.$attrs,
          itemtype: 'http://schema.org/ImageObject',
          sizes: this.sizes,
          imgAttr: this.imgAttr,
          srcset: this.srcset,
          width: this.width ? this.width : null,
          height: this.height ? this.height : null,
          ...this.nuxtImgConfig
        }
        : {
          ...this.$attrs,
          width: this.width ? this.width : null,
          height: this.height ? this.height : null,
          ...this.nuxtImgConfig
        };
    }
  },
  created() {
    this.loaded = false;
  }

});
</script>

<template>
  <span class="sf-image--wrapper" data-testid="image-wrapper">
    <component
      :is="imageComponentTag"
      :loading="loading"
      v-bind="attributes"
      :src="src"
      :class="classes"
      :style="styles"
      :sizes="srcsets"
      :alt="alt"
      @load="onLoad"
      v-on="$listeners"
    />
    <slot
      name="placeholder"
      v-bind="{
        isPlaceholderVisible,
        placeholder,
        width,
        height,
        nuxtImgConfig,
      }"
    >
      <SfSkeleton
        :class="{ 'display-none': isPlaceholderVisible }"
        type="image"
        alt="Placeholder"
        :style="skeletonSize"
        :width="width || nuxtImgConfig.width"
        :height="height || nuxtImgConfig.height"
      />
    </slot>
    <span
      :class="{ 'display-none': !$slots.default }"
      class="sf-image--overlay"
    >
      <slot />
    </span>
    <noscript inline-template>
      <img
      :src="src"
      :alt="alt"
      class="sf-image sf-image-loaded"
      v-bind="$attrs"
      :width="width"
      :height="height"
      />
    </noscript>
  </span>
</template>
