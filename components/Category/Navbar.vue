<template>
  <div class="navbar section">
    <div class="navbar__aside desktop-only">
      <SfBreadcrumbs
        class="breadcrumbs desktop-only"
        :breadcrumbs="breadcrumbs"
      />
    </div>
    <div class="navbar__main">
      <LazyHydrate on-interaction class="smartphone-only">
        <SfButton
          class="sf-button--text navbar__filters-button"
          data-cy="category-btn_filters"
          aria-label="Filters"
          @click="toggleFilterSidebar"
        >
          <SfIcon
            size="24px"
            color="dark-secondary"
            icon="filter2"
            class="navbar__filters-icon"
            data-cy="category-icon_"
          />
          {{ $t("Filters") }}
        </SfButton>
      </LazyHydrate>

      <div class="navbar__title">
        <SfHeading :title="currentCategory.name || currentRootCategory.name" />
      </div>

      <SfBreadcrumbs
        class="breadcrumbs smartphone-only"
        :breadcrumbs="breadcrumbs"
      />
      <div class="navbar__sort desktop-only">
        <span class="navbar__label">{{ $t("Sort by") }}:</span>
        <LazyHydrate on-interaction>
          <SfSelect
            :value="sortBy.selected"
            :placeholder="$t('Select sorting')"
            data-cy="category-select_sortBy"
            class="navbar__select cursor-pointer"
            @input="changeSorting"
          >
            <SfSelectOption
              v-for="(option, index) in sortBy.options"
              :key="index"
              :value="option.value"
              class="sort-by__option"
            >
              {{ $t(option.attrName) }}
            </SfSelectOption>
          </SfSelect>
        </LazyHydrate>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api';
import {
  SfBreadcrumbs,
  SfHeading,
  SfSelect,
  SfButton,
  SfIcon
} from '@storefront-ui/vue';
import { useFacet } from '@vue-storefront/odoo';
import {
  useUiCategoryHelpers,
  useUiHelpers,
  useUiState,
  facetGetters
} from '~/composables';

import frag from 'vue-frag';
import LazyHydrate from 'vue-lazy-hydration';

export default defineComponent({
  components: {
    SfSelect,
    SfBreadcrumbs,
    SfHeading,
    SfButton,
    SfIcon,
    LazyHydrate
  },
  directives: {
    frag
  },
  setup() {
    const route = useRoute();

    const { result } = useFacet();
    const { changeSorting } = useUiHelpers();
    const { toggleFilterSidebar } = useUiState();
    const { currentRootCategory, currentCategory } = useUiCategoryHelpers(
      result.value
    );
    const { query } = route.value;

    const sortBy = computed(() =>
      facetGetters.getSortOptions({ input: { sort: query?.sort } } || '')
    );

    const breadcrumbs = computed(() =>
      facetGetters.getBreadcrumbs(
        currentCategory.value?.name
          ? currentCategory.value
          : currentRootCategory.value
      )
    );
    return {
      toggleFilterSidebar,
      currentRootCategory,
      breadcrumbs,
      sortBy,
      changeSorting,
      currentCategory
    };
  }
});
</script>

<style scoped lang="scss">
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 0px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }

  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__title {
    display: flex;
    align-items: center;
    margin: 0 16% 0 auto;
    @media (max-width: 500px) {
      margin: 0 10% 0 auto;
    }
  }
  &__title .sf-heading__title {
    font-weight: bold;
  }
  &__label {
    font-family: var(--font-family--primary);
    font-weight: 400;
    color: #72757e;
    @include for-desktop {
      color: #72757e;
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --select-width: 170px;
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;
    option,
    select {
      font: -moz-pull-down-menu;
    }
    ::v-deep .sf-select__dropdown {
      font-size: 16px;
      font-family: var(--font-family--primary);
      font-weight: 400;
      color: #1d1f22;
      margin: 0;
    }
    ::v-deep .sf-select__placeholder {
      --select-option-font-size: 16px;
      font: -moz-pull-down-menu;
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 0 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}

.sf-button--text {
  display: flex;
}

.sf-breadcrumbs__breadcrumb {
  cursor: pointer;
}
.sort-by {
  flex: unset;
  width: 11.875rem;
}
</style>
