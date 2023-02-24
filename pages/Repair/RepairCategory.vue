<template>
  <div class="layout mb-14">
    <div class="container my-10">
      <SfBreadcrumbs class="breadcrumbs" :breadcrumbs="breadcrumbs" />
    </div>
    <h1 class="font-bold title text-center mb-10">
      {{ data.Headline }}
    </h1>
    <div>
      <RenderContent :content="data.blocks" />
    </div>

    <div v-if="products && products.length > 0" class="container">
      <div class="grid grid-flow-row lg:grid-cols-4 md:grid-cols-2 gap-4">
        <div
          v-for="(product, i) in products"
          :key="product.id + i + 'product-arr'"
          class="w-full flex flex-col items-center"
        >
          <NuxtLink :to="'/' + product.full_slug">
            <GreenImage
              :src="
                $transformStoryBlockImage(
                  product.content.image.filename,
                  '370x0'
                )
              "
              :alt="
                product.content.image.alt ? product.content.image.alt : 'image'
              "
              :width="mobileOrTabletSize ? 220 : 340"
              :height="mobileOrTabletSize ? 350 : 420"
              class="mb-5"
              loading="lazy"
            />

            <p class="text-center">
              {{ product.name }}
            </p>
          </NuxtLink>
        </div>
      </div>
      <div class="flex justify-end pt-10">
        <GreenButton
          v-if="totalResult > products.length"
          style-type="Primary"
          color="Green"
          @click="getNextProducts"
        >
          {{ $t("See More") }}
        </GreenButton>
      </div>
    </div>

    <GreenImage
      :src="$transformStoryBlockImage(data.BannerImage.filename)"
      :alt="'image'"
      class="mt-10 w-full"
      loading="lazy"
    />
  </div>
</template>
<script lang="ts">
import { SfBreadcrumbs } from "@storefront-ui/vue";
import {
  computed,
  defineComponent,
  ref,
  useFetch,
  useMeta,
  useRoute,
} from "@nuxtjs/composition-api";
import { useStoryblokApi } from "@storyblok/nuxt-2";
import { useSbBreadcrumbs } from "~/composables";

export default defineComponent({
  name: "RepairCategory",
  components: { SfBreadcrumbs },
  transition: "fade",
  props: {
    data: {
      required: true,
      default: {},
      type: Object as () => {
        blocks: object[];
        Headline: string;
        Seo_image: {
          alt: string;
          filename: string;
          name: string;
          title: string;
        };
        Title: string;
        component: string;
        title: string;
        description: string;
        seo: {
          title: string;
          description: string;
          image: string;
        };
      },
    },
    id: {
      default: null,
      type: Number,
    },
  },

  setup(props, { root }) {
    const { path, query } = useRoute().value;
    const products = ref([]);
    const storyblokApi = useStoryblokApi();
    const { breadcrumbs } = useSbBreadcrumbs(props.id);
    const currentPage = ref(1);
    const totalResult = ref(0);
    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);

    const getRepairProducts = async () => {
      return await storyblokApi
        .get("cdn/stories/", {
          per_page: 8,
          page: currentPage.value,
          starts_with: path.replace("/", ""),
          is_startpage: 0,
          version: root.$config.sbMode,
        })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    };

    const hasQeury = computed(() => {
      return query !== null;
    });

    const pushQueryToHistory = () => {
      if (process.browser) {
        const newUrl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          `?page=${currentPage.value}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
    };

    const getInitialProducts = async () => {
      const productsList = await getRepairProducts();
      totalResult.value = productsList.total;
      products.value = productsList.data.stories;
    };

    const getNextProducts = async () => {
      currentPage.value++;
      const productsList = await getRepairProducts();
      products.value = [...products.value, ...productsList.data.stories];
      if (hasQeury.value) {
        pushQueryToHistory();
      }
    };

    useFetch(async () => {
      await getInitialProducts();

      if (query.page !== null) {
        for (let i = 0; i < Number(query.page) - 1; i++) {
          await getNextProducts();
        }
      }
    });

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

    return {
      products,
      breadcrumbs,
      getNextProducts,
      totalResult,
      mobileOrTabletSize,
    };
  },
  head: {},
});
</script>
