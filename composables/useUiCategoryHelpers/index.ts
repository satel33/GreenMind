import { computed, ComputedRef, useRoute } from '@nuxtjs/composition-api';
import { FacetSearchResult } from '@vue-storefront/core';
import { facetGetters } from '@vue-storefront/odoo';
import { Category } from '@vue-storefront/odoo-api';
import { FacetResultsData } from '@vue-storefront/odoo/lib/composables/types';

type useUiCategoryHelper = {
  currentRootCategory: ComputedRef<any>
  categoryTree: ComputedRef<any>
  currentCategory: ComputedRef<Category>
}

const useUiHelpers = (result : FacetSearchResult<FacetResultsData>): useUiCategoryHelper => {
  const categoryTree = computed(() =>
    facetGetters.getCategoryTree(result)
  );

  const currentCategory = computed<Category | any>(() => {
    return result?.data?.category || {};
  });

  const currentRootCategory = computed(() => {
    const category = result?.data?.category || {};

    const categoryFromParent = currentCategory.value?.parent?.parent;

    return category || categoryFromParent || {};
  });

  return {
    currentRootCategory,
    currentCategory,
    categoryTree

  };
};

export default useUiHelpers;
