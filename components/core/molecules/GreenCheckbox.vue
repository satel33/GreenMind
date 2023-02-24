<template>
  <SfCheckbox
    v-model="model"
    :name="name"
    :label="label"
    hint-message=""
    :required="required"
    info-message=""
    :error-message="errorMessage"
    :valid="valid"
    :disabled="disabled"
    style="--checkbox-border-radius: 1rem;"
    @change="change"
  >
    <template
      v-if="hasGeneralWrapper"
      #label
    >
      <slot name="label" />
      <div
        v-show="hasImage || description || title"
        class="general_wrapper"
      >
        <div
          v-if="hasImage"
          class="img-description-wrap"
        >
          <slot name="image">
            <img
              :src="image"
              :width="imageWidth"
              :height="imageHeight"
              class="checkbox_image"
              :alt="name"
            >
            <div class="description-wrap">
              <div class="title-link">
                <div class="product-title">
                  {{ title }}
                </div>
                <a href="#">{{ linkTitle }}</a>
              </div>
              <p class="product-description">
                {{ description }}
              </p>
            </div>
          </slot>
        </div>
        <div
          v-else
          class="img-description-wrap"
        >
          <div class="description-wrap" :class="{ 'divide-y-2': border }">
            <div class="title-link">
              <div class="product-title">
                {{ title }}
              </div>
              <a href="#" />
            </div>
            <p class="product-description">
              {{ description }}
            </p>
          </div>
        </div>
        <div class="price self-end">
          {{ price }}
        </div>
      </div>
    </template>
  </SfCheckbox>
</template>

<script lang="ts">
import { SfCheckbox, SfImage } from '@storefront-ui/vue';
import { ref, defineComponent } from '@nuxtjs/composition-api';
export default defineComponent({
  components: {
    SfCheckbox, SfImage
  },
  model: {
    prop: 'model',
    event: 'change'
  },
  props: {
    border: {
      type: Boolean,
      default: false
    },
    valid: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Boolean, Object],
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    linkTitle: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: [String, Number],
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    hasImage: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    },
    imageWidth: {
      type: Number,
      default: 82
    },
    imageHeight: {
      type: Number,
      default: 70
    },
    hasGeneralWrapper: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    emitValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input', 'change'],
  setup() {
    const model = ref(false);

    return {
      model
    };
  },
  watch: {
    isChecked () {
      this.model = this.isChecked;
    }
  },
  mounted() {
    this.model = this.isChecked;
  },
  methods: {
    change() {
      this.$emit('change', this.emitValue && this.model ? this.value : this.model);
      this.$emit('input', this.emitValue && this.model ? this.value : this.model);
    }
  }
});
</script>

<style scoped>
@import '~/assets/css/greenCheckbox.scss';
</style>
