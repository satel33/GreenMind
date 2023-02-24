import { ISbLinks } from '~/green-api/types';
import {
  computed,
  ref,
  useContext,
  useFetch,
  useRoute
} from '@nuxtjs/composition-api';
import { useStoryblokApi } from '@storyblok/nuxt-2';
import { AgnosticBreadcrumb } from '@vue-storefront/core';
const useSbBreadcrumbs = (storyBlokId: number): any => {
  const storyblokApi = useStoryblokApi();
  const { i18n } = useContext();
  const { path } = useRoute().value;

  const breadcrumbs = ref<AgnosticBreadcrumb[]>([]);

  const getBreadcrumbs = (links: ISbLinks) => {
    let parentId: number = storyBlokId;

    const items = Object.values(links);

    const parents: AgnosticBreadcrumb[] = [];

    while (parentId) {
      const parent = items.find((item) => item.id === parentId);

      const listContainsSlug = parents.some(el => {
        if (el.text.toLocaleLowerCase() === parent.name.toLocaleLowerCase()) {
          return true;
        }
        return false;
      });

      if (parent && !listContainsSlug) {
        parents.unshift({text: parent.name, link: parent.real_path});
      }
      parentId = parent?.parent_id;
    }
    return parents;
  };

  const getRootPath = computed(() => {
    const removeFirstSlash = path.replace('/', '');

    return removeFirstSlash.substring(0, removeFirstSlash.indexOf('/'));
  });

  const createBreadcrumbs = (parentBreadcrumbs: AgnosticBreadcrumb[]) => {
    breadcrumbs.value.unshift({text: i18n.t('Home')?.toString(), link: '/'});

    breadcrumbs.value.push(...parentBreadcrumbs);
  };

  const getPageLinks = async () => {
    await storyblokApi.get('cdn/links/', {
      starts_with: getRootPath.value
    }).then((response) => {
      createBreadcrumbs(getBreadcrumbs(response.data.links));
    }).catch((err) => {
      if (err) {
        console.error(err);
      }
    });
  };

  useFetch(async () => {
    await getPageLinks();
  });

  return { breadcrumbs };

};

export default useSbBreadcrumbs;
