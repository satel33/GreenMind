<template>
  <div class="sf-gallery">
    <div class="sf-gallery__stage">
      <div ref="glide" class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li
              v-for="(picture, index) in images"
              :key="'slide-' + index"
              class="glide__slide"
              @mouseover="startZoom(picture)"
              @mousemove="moveZoom($event, index)"
              @mouseout="removeZoom(index)"
            >
              <slot
                name="big-image"
                v-bind="{
                  enableZoom,
                  picture,
                  index,
                  imageWidth,
                  imageHeight,
                  imageTag,
                  nuxtImgConfig,
                }"
              >
                <SfImage
                  ref="sfGalleryBigImage"
                  class="sf-gallery__big-image"
                  :class="{ 'sf-gallery__big-image--has-zoom': enableZoom }"
                  :src="picture.desktop.url"
                  :alt="picture.alt"
                  :placeholder="picture.placeholder"
                  :width="imageWidth"
                  :height="imageHeight"
                  :image-tag="imageTag"
                  :nuxt-img-config="nuxtImgConfig"
                  :loading="nuxtImgConfig.loading"
                  @click="$emit('click:stage', { picture, index })"
                />
                <div v-if="discountPercentage" class="badge-discount">
                  <span>
                    -{{ discountPercentage }} %
                  </span>
                </div>
              </slot>
            </li>
          </ul>
        </div>
        <slot name="up-bullets" />
        <div v-if="bullets && images.length > 1" class="bullets">
          <SfBullets
            :total="images.length"
            :current="activeIndex"
            data-testid="hero-bullets"
            @click="go($event)"
          />
          <!-- <button
            v-for="(picture, index) in images"
            :key="index"
            class="glide__bullet"
            :data-glide-dir="`=${index}`"
          /> -->
        </div>
      </div>
      <transition name="sf-fade">
        <div
          ref="outSide"
          :class="{
            'display-none':
              !outsideZoom || !isZoomStarted || (!outsideZoom && !enableZoom),
          }"
          :style="{ width: `${imageWidth}px`, height: `${imageHeight}px` }"
        >
          <slot
            name="outside-zoom"
            v-bind="{
              definedPicture,
              imageWidth,
              imageHeight,
              imageTag,
              nuxtImgConfig,
            }"
          >
            <SfImage
              ref="imgZoom"
              class="sf-gallery__zoom"
              :src="definedPicture.url"
              :width="imageWidth"
              :height="imageHeight"
              :lazy="false"
              :alt="definedPicture.alt"
              :placeholder="definedPicture.placeholder"
              :image-tag="imageTag"
              :nuxt-img-config="nuxtImgConfig"
              :loading="nuxtImgConfig.loading"
            />
          </slot>
        </div>
      </transition>
    </div>
    <div v-if="!bullets && images.length > 1" class="sf-gallery__thumbs">
      <slot name="thumbs" v-bind="{ images, active: activeIndex, go }">
        <SfButton
          v-for="(image, index) in images"
          :key="'img-' + index"
          class="sf-button--pure sf-gallery__item"
          :class="{ 'sf-gallery__item--selected': index === activeIndex }"
          :aria-label="'Image ' + index"
          @click="go(index)"
        >
          <SfImage
            class="sf-gallery__thumb"
            :src="image.mobile.url"
            :alt="image.alt"
            :placeholder="image.placeholder"
            :width="thumbWidth"
            :height="thumbHeight"
            :image-tag="thumbImageTag"
            :nuxt-img-config="thumbNuxtImgConfig"
            :loading="nuxtImgConfig.loading"
          />
        </SfButton>
      </slot>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import { SfGallery, SfBullets } from '@storefront-ui/vue';

export default defineComponent({
  components: {
    SfBullets
  },
  extends: SfGallery,
  props: {
    bullets: {
      type: Boolean,
      default: false
    },
    discountPercentage: {
      type: Number,
      default: null
    }
  }
});
</script>
<style lang="scss">
@import "~@storefront-ui/shared/styles/components/molecules/SfGallery.scss";
.bullets ol {
  justify-content: center;
}
.badge-discount {
  display: flex;
  font-size: 32px;
  color: white;
  text-align: center;
  position: relative;
  left: 70%;
  bottom: 630px;
  color: var(--_c-greenmind-pine-primary-dark-green);
  background-color: var(--_c-greenmind-primary-yellow);
  height: 120px;
  width: 120px;
  border-radius: 50%;
  span {
    width: 100%;
    align-self: center;
  }

}
@media (max-width: 1214px) {
  .badge-discount {
    font-size: 28px;
    left: 46%;
    bottom: 660px;
    height: 85px;
    width: 85px;
  }
}
@media (max-width: 1024px) {
  .badge-discount {
    font-size: 24px;
    left: 46%;
    bottom: 425px;
    height: 85px;
    width: 85px;
  }
}
@media (max-width: 767px) {
  .badge-discount {
    font-size: 24px;
    left: 62%;
    bottom: 469px;
    height: 85px;
    width: 85px;
  }
}
</style>
