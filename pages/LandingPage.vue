<template>
  <div class="layout">
    <div class="container px-3">
      <h1 class="font-bold title mb-4 mt-12">
        {{ data.Headline }}
      </h1>

      <div v-if="data.Teaser" class="mb-12 rich-text">
        <RichText :text="data.Teaser" />
      </div>
    </div>

    <div class="container lg:px-3 d-flex justify-center">
      <div class="grid grid-cols-12 gap-4">
        <div
          class="col-start-1 col-end-13 mt-3 lg:col-end-4 flex justify-start lg:block"
        >
          <div class="pl-3">
            <SfButton
              class="flex sf-button--text navbar__filters-button lg:hidden"
              data-cy="category-btn_filters"
              aria-label="Filters"
              @click="openFacets()"
            >
              <SfIcon
                size="24px"
                color="dark-secondary"
                icon="filter2"
                class="navbar__filters-icon"
                data-cy="category-icon_"
              />
              {{ $t("Filters") }} {{ queryCount }}
            </SfButton>
          </div>
          <div id="clerk-search-filters" @click="setFacetCountValue()" />
        </div>
        <div class="col-start-1 col-end-13 lg:col-start-4">
          <div v-html="html" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useRoute,
  computed,
  onMounted
} from '@nuxtjs/composition-api';
import LazyHydrate from 'vue-lazy-hydration';
import { SfButton, SfIcon } from '@storefront-ui/vue';
declare let Clerk: any;

export default defineComponent({
  name: 'LandingPage',
  // eslint-disable-next-line vue/no-unused-components
  components: { LazyHydrate, SfButton, SfIcon },
  transition: 'fade',
  props: {
    data: {
      default: null,
      type: Object as () => {
        Clerk_query: string;
        Clerk_template_id: string;
        Facets_design_id: string;
        Facets: string;
        Facet_labels: string;
        Headline: string;
        Teaser: unknown;
        Price_preprend: string;
        View_more_text: string;
      }
    }
  },
  setup(props) {
    const input = ref('');

    const setCount = (isServer = false) => {
      if (!isServer) {
        if (
          window.location.search.split('&').length <= 1 &&
          window.location.search === '?'
        ) {
          return '';
        } else {
          if (window.location.search === '') {
            return '';
          }
          return `(${window.location.search.split('&').length})`;
        }
      }
    };

    onMounted(() => {
      setFacetCountValue();
      Clerk("content", "#content-html");
    });

    const queryCount = ref(setCount(true));

    const setFacetCountValue = () => {
      queryCount.value = setCount();
    };

    const openFacets = () => {
      (window as unknown as { openClerkFacets(): void }).openClerkFacets();
    };

    const setFaceLabels = (facetString: string, labelString: string) => {
      const facets = facetString.split(',');
      const labels = labelString.split(',');
      const obj = {};
      facets.forEach((x, i) => {
        obj[x] = labels[i];
      });
      return JSON.stringify(obj);
    };

    const html = `
<span class="clerk" id="content-html" 
${props.data?.Clerk_query !== '' ? `data-query="${props.data?.Clerk_query}"` : ''}
data-template="${props.data?.Clerk_template_id}"
data-facets-searchbox-text="Søg efter"
data-facets-target="#clerk-search-filters"
data-facets-price-prepend="${
  props.data?.Price_preprend ? props.data?.Price_preprend : 'kr.'
}"
data-facets-in-url="true"
data-facets-view-more-text="${
  props.data?.View_more_text ? props.data?.View_more_text : 'Vis mere'
}"
data-facets-design="${props.data?.Facets_design_id}"
data-facets-attributes=\'${JSON.stringify(props.data?.Facets.split(','))}\'
data-facets-titles=\'${setFaceLabels(
    props.data?.Facets,
    props.data?.Facet_labels
  )}\'></span>`;

    return { input, html, openFacets, queryCount, setFacetCountValue };
  }
});
</script>
<style lang="scss">
.rich-text p {
  margin-bottom: 5px;
}
</style>
