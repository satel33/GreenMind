<template>
  <div class="layout">
    <h1 class="font-bold title text-center my-10">
      {{ data.Headline }}
    </h1>
    <div>
      <RenderContent :content="data.Blocks" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api';
export default defineComponent({
  name: 'RepairPage',
  transition: 'fade',
  props: {
    data: {
      required: true,
      default: {},
      type: Object as () => {
        Blocks: object[];
        Headline: string;
        title: string;
        description: string;
        seo: {
          title: string;
          description: string;
          image: string;
        };
        image: string | any;
        Seo_image: {
          alt: string;
          filename: string;
          name: string;
          title: string;
        };
        Title: string;
        component: string;
      }
    }
  },
  setup(props) {
    if (props.data && props.data.seo) {
      useMeta({
        title: props.data.seo.title ? props.data.seo.title : null,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: (props.data.seo.description ? props.data.seo.description : null)
          },
          {
            hid: 'og:type',
            name: 'og:type',
            content: 'website'
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: (props.data.seo.description ? props.data.seo.description : null)
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: (props.data.seo.title ? props.data.seo.title : null)
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: (props.data.seo.image ? props.data.seo.image : null)
          }
        ]
      });
    }
  },
  head: {}
});
</script>
