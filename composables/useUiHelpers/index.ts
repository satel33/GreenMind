/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
// @ts-nocheck
import { useRoute, useRouter } from '@nuxtjs/composition-api';
import { Category } from '@vue-storefront/odoo-api/server';
import hash from 'object-hash';

const queryParamsNotFilters = ['page', 'sort', 'itemsPerPage'];
const localePrefixes = ['/da', '/sv', '/de', 'en'];

const useUiHelpers = (): any => {
  const route = useRoute();
  const router = useRouter();
  const { params, query, path } = route.value;

  const pathToSlug = (): string => {
    for (const localePrefix of localePrefixes) {
      if (path.startsWith(localePrefix)) {
        return path.replace(localePrefix, '');
      }
    }
    return path;
  };

  const getFacetsFromURL = (pageSize: number) => {
    let filters: string[] = [];
    if (query) {
      Object.keys(query).forEach((filterKey) => {
        if (![...queryParamsNotFilters, 'price'].includes(filterKey)) {
          filters.push(query[filterKey]);
        }
      });

      filters = filters
        .filter(item => Boolean(item))
        .map((filter: string | null) => filter?.split(',')).flat();
    }

    const price = query?.price?.split('-');
    const sort = query?.sort?.split(',') || [];
    const page = query?.page || 1;

    const productFilters = {
      minPrice: Number(price?.[0]) || null,
      maxPrice: Number(price?.[1]) || null,
      attribValues: filters,
      categorySlug: path === '/' ? null : pathToSlug()
    };

    const filtersForHas = {
      ...productFilters,
      pageSize,
      page,
      sort
    };

    return {
      fetchCategory: true,
      categoryParams: {
        slug: path === '/' ? null : pathToSlug(),
        cacheKey: `API-C${route.value.path}`
      },
      productParams: {
        pageSize,
        cacheKey: `API-P${hash(filtersForHas, { algorithm: 'md5' })}`,
        currentPage: page,
        search: '',
        sort: { [sort[0]]: sort[1] },
        filter: productFilters
      }
    };
  };

  const getCatLink = (category: Category): string => {
    const sort = query.sort ? `?sort=${query.sort}` : '';

    return `/c/${params.slug_1}/${category.slug}/${category.id}${sort}`;
  };

  const getCatLinkForSearch = (category: Category): string => {
    return category.slug;
  };

  const changeSorting = (sort: string) => {
    router.push({ query: { ...query, sort } });
  };

  const facetsFromUrlToFilter = () => {
    const formatedFilters: string[] = [];
    Object.keys(query).forEach((label: string | null) => {
      if (queryParamsNotFilters.includes(label)) return;

      const valueList: string[] = query[label]?.split(',');

      valueList?.forEach((value: string) => {
        const item = {
          filterName: label,
          label: value,
          id: value
        };
        formatedFilters.push(item);
      });
    });

    return formatedFilters;
  };

  const changeFilters = (filters) => {
    const formatedFilters = {};
    filters.forEach((element) => {
      if (formatedFilters[element.filterName]) {
        formatedFilters[element.filterName] += `,${element.id}`;
        return;
      }
      formatedFilters[element.filterName] = element.id;
    });

    router.push({ query: formatedFilters });
  };

  const changeItemsPerPage = () => {
    const itemsPerPage = query.itemsPerPage ? parseInt(query.itemsPerPage) + 3 : 6;

    router.push({ query: { ...query, itemsPerPage } });
  };

  const changeSearchTerm = (term: string) => term;

  const isFacetColor = (facet): boolean => {
    return facet?.atributeName?.toLowerCase() === 'color';
  };

  const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');

    return false;
  };

  const getComponentProviderByName = (provider: string): string => {
    if (!provider) throw new Error('Provider without provider');

    const upperName = provider.toLocaleUpperCase();

    if (upperName === 'ADYEN_OG') {
      return 'AdyenExternalPaymentProvider';
    }

    if (upperName === 'ADYEN') {
      return 'AdyenDirectPaymentProvider';
    }

    if (upperName.includes('ANYDAY')) {
      return 'AnyDayPaymentProvider';
    }

    if (upperName.includes('WIRE')) {
      return 'WireTransferPaymentProvider';
    }

    throw new Error(`Provider ${name} not implemented!`);
  };

  return {
    getFacetsFromURL,
    getCatLink,
    getCatLinkForSearch,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    changeSearchTerm,
    isFacetColor,
    isFacetCheckbox,
    facetsFromUrlToFilter,
    getComponentProviderByName
  };
};

export default useUiHelpers;
