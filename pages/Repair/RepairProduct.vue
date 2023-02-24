<template>
  <div class="layout mb-10">
    <div class="container mt-4 mx-4">
      <SfBreadcrumbs :breadcrumbs="breadcrumbs" />
    </div>
    <h1 class="font-bold title text-center my-10">
      {{ data.Headline }}
    </h1>
    <div class="text-center my-3">
      <RichText v-if="data.teaser" :text="data.teaser" />
    </div>
    <RenderContent :content="data.Blocks" />

    <div class="grid grid-cols-12 mx-auto">
      <div class="col-start-1 col-span-12 lg:col-span-5 lg:col-start-2">
        <GreenImage
          v-if="data.image"
          :src="
            mobileOrTabletSize
              ? $transformStoryBlockImage(data.image.filename, '220x350')
              : $transformStoryBlockImage(data.image.filename, '340x500')
          "
          :width="mobileOrTabletSize ? 220 : 340"
          :height="mobileOrTabletSize ? 350 : 500"
          alt="Banner Mobile"
          class="usp_banner_products flex justify-center mx-auto"
        />
      </div>

      <div
        v-if="!mobileOrTabletSize"
        class="col-start-1 col-span-12 lg:col-span-5 lg:col-start-7"
      >
        <SfTabs :open-tab="1">
          <SfTab v-for="tab in data.tabs" :key="tab._uid" :title="tab.Headline">
            <SfList v-for="info in tab.Price_list" :key="info._uid">
              <SfListItem>
                <div class="flex flex-row justify-between">
                  <p>{{ info.label }}:</p>
                  <p>
                    {{ $currency(info.value) }}
                  </p>
                </div>
                <span class="sf-divider mb-4" />
              </SfListItem>
            </SfList>
          </SfTab>
        </SfTabs>
        <div class="my-3">
          <RichText v-if="data.rep_desc" :text="data.rep_desc" />
        </div>
      </div>

      <div v-else class="col-start-1 col-span-12 mt-4">
        <SfAccordion
          v-for="accordion in data.tabs"
          :key="accordion._uid"
          :open="data.tabs[0].Headline"
          :multiple="false"
          show-chevron
        >
          <SfAccordionItem :header="accordion.Headline">
            <SfList
              v-for="accordionInfo in accordion.Price_list"
              :key="accordionInfo._uid"
            >
              <SfListItem>
                <div class="flex flex-row justify-between">
                  <p>{{ accordionInfo.label }}:</p>
                  <p>
                    {{ $currency(accordionInfo.value) }}
                  </p>
                </div>
                <SfDivider class="mb-4" />
              </SfListItem>
            </SfList>
          </SfAccordionItem>
        </SfAccordion>
        <div class="my-3">
          <RichText v-if="data.rep_desc" :text="data.rep_desc" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, useMeta } from "@nuxtjs/composition-api";
import GreenImage from "~/components/core/atoms/GreenImage.vue";
import { useSbBreadcrumbs } from "~/composables";
import { SfBreadcrumbs } from "@storefront-ui/vue";

import { SfTabs, SfList, SfAccordion, SfDivider } from "@storefront-ui/vue";

export default defineComponent({
  name: "RepairProduct",
  components: {
    GreenImage,
    SfTabs,
    SfList,
    SfBreadcrumbs,
    SfAccordion,
    SfDivider,
  },
  transition: "fade",
  props: {
    data: {
      required: true,
      default: {},
      type: Object as () => {
        image: {
          filename: string;
        };
        title: string;
        description: string;
        seo?: {
          title: string;
          description: string;
          image: string;
        };
        SEO: {
          title: string;
          description: string;
          image: string;
        };
        Blocks: object[];
        Headline: string;
        teaser: any;
        tabs: {
          Headline: string;
          Price_list: {
            label: string;
            value: string;
          }[];
        }[];
        rep_desc: any;
      },
    },
    id: {
      type: Number,
      default: null,
    },
  },
  setup(props, { root }) {
    const { breadcrumbs } = useSbBreadcrumbs(props.id);
    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);
    if (props.data && props.data.seo) {
      useMeta({
        title: props.data.seo.title ? props.data.seo.title : null,
        meta: [
          {
            hid: "description",
            name: "description",
            content: props.data.seo.description
              ? props.data.seo.description
              : null,
          },
          {
            hid: "og:type",
            name: "og:type",
            content: "website",
          },
          {
            hid: "og:description",
            name: "og:description",
            content: props.data.seo.description
              ? props.data.seo.description
              : null,
          },
          {
            hid: "og:title",
            name: "og:title",
            content: props.data.seo.title ? props.data.seo.title : null,
          },
          {
            hid: "og:image",
            name: "og:image",
            content: props.data.seo.image ? props.data.seo.image : null,
          },
        ],
      });
    }

    if (props.data && props.data.SEO && !props.data.seo) {
      useMeta({
        title: props.data.SEO.title ? props.data.SEO.title : null,
        meta: [
          {
            hid: "description",
            name: "description",
            content: props.data.SEO.description
              ? props.data.SEO.description
              : null,
          },
          {
            hid: "og:type",
            name: "og:type",
            content: "website",
          },
          {
            hid: "og:description",
            name: "og:description",
            content: props.data.SEO.description
              ? props.data.SEO.description
              : null,
          },
          {
            hid: "og:title",
            name: "og:title",
            content: props.data.SEO.title ? props.data.SEO.title : null,
          },
          {
            hid: "og:image",
            name: "og:image",
            content: props.data.SEO.image ? props.data.SEO.image : null,
          },
        ],
      });
    }

    return {
      breadcrumbs,
      mobileOrTabletSize,
    };
  },
  head: {},
});
</script>
