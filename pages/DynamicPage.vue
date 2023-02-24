<template>
  <div v-if="content && content.content">
    <template v-if="isAvailablePageType(content.content.component)">
      <component
        :is="content.content.component"
        v-if="content"
        :id="content.id"
        :data="content.content"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useRoute,
  useContext,
  ref,
  onMounted,
  ssrRef,
  useFetch,
  useMeta,
} from "@nuxtjs/composition-api";
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt-2";
import TextPage from "./TextPage.vue";
import LandingPage from "./LandingPage.vue";
import RepairProduct from "./Repair/RepairProduct.vue";
import RepairPage from "./Repair/RepairPage.vue";
import RepairCategory from "./Repair/RepairCategory.vue";

export default defineComponent({
  name: "DynamicPage",
  components: {
    TextPage,
    LandingPage,
    RepairProduct,
    RepairPage,
    RepairCategory,
  },
  transition: "fade",
  setup({}, { root }) {
    const { path } = useRoute().value;
    const { error: nuxtError } = useContext();
    const story = ref(null);
    const isError = ssrRef(false, "isError");
    const pageTypes = [
      "TextPage",
      "LandingPage",
      "RepairPage",
      "RepairProduct",
      "RepairCategory",
    ];

    // get data
    useFetch(async () => {
      const storyblokApi = useStoryblokApi();
      const response = await storyblokApi
        .get(`cdn/stories${path}`, { version: root.$config.sbMode })
        .catch((err) => {
          if (err) {
            isError.value = true;
            // throw nuxtError({ statusCode: 404, message: 'Page not found' });
          }
        });

      story.value = response?.data?.story;
    });

    onMounted(async () => {
      if (isError.value) {
        nuxtError({ statusCode: 404, message: "Page not found" });
      }

      if (story.value && story.value.id)
        useStoryblokBridge(story.value.id, (evStory) => {
          story.value = evStory;
        });
    });

    if (
      story?.value?.content?.Title != null ||
      story?.value?.content?.Description != null ||
      story?.value?.content?.Seo_image != null
    ) {
      useMeta({
        title: story.value?.content?.Title ?? null,
        meta: [
          {
            hid: "description",
            name: "description",
            content: story.value?.content?.Description ?? null,
          },
          {
            hid: "og:type",
            name: "og:type",
            content: "website",
          },
          {
            hid: "og:description",
            name: "og:description",
            content: story.value?.content?.Description ?? null,
          },
          {
            hid: "og:title",
            name: "og:title",
            content: story.value?.content?.Title ?? null,
          },
          {
            hid: "og:image",
            name: "og:image",
            content: story.value?.content?.Seo_image?.filename ?? null,
          },
        ],
        script: [
          {
            type: "application/ld+json",
            json: {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: story?.value?.content?.Title || null,
              datePublished: story?.value?.content?.published_at || null,
            },
          },
          {
            type: "application/ld+json",
            json: {
              "@context": "https://schema.org",
              "@type": "ImageObject",
              author: "Greeenmind",
              datePublished: story?.value?.content?.published_at || null,
            },
          },
        ],
      });
    }

    const isAvailablePageType = (type: string) => {
      const find = pageTypes.find((x) => x === type);
      return find != null;
    };
    // return data
    return {
      content: story,
      pageTypes,
      isAvailablePageType,
    };
  },
  head: {},
});
</script>
