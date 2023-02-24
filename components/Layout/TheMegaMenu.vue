<script lang="ts">
import { computed, PropType, reactive } from '@nuxtjs/composition-api';
import { defineComponent } from '@vue/composition-api';
import { useWebsiteHomePageData } from '~/composables';
import { WebsiteMegaMenu, WebsiteMenu } from '~/green-api/types';

export default defineComponent({
  props: {
    openedMegaMenu: {
      type: String,
      default: null
    },
    menu: {
      type: Array as PropType<WebsiteMegaMenu[]>,
      default: () => ([])
    }
  },
  emits: ['close-menu'],
  setup(props, { emit }) {
    const { mapColorClass } = useWebsiteHomePageData();

    const getClassHideShow = (name) => ({
      showMegaMenu: props.openedMegaMenu === name,
      hideMegaMenu: props.openedMegaMenu !== name
    });

    const handleCloseMenu = () => {
      emit('close-menu');
    };

    const menusWithoutParentAndWithChilds = computed(() => props.menu
      .filter(item => !item.parent && item.childs?.length > 0));

    const findMenuImagesByName = (name: string) => props.menu
      .find(item => item.name === name)
      .images;

    return {
      menusWithoutParentAndWithChilds,

      mapColorClass,
      handleCloseMenu,
      getClassHideShow,
      findMenuImagesByName
    };
  }
});
</script>

<template>
  <div>
    <div
      v-for="(item, index) in menusWithoutParentAndWithChilds"
      :key="`${item}-${index}}`"
      class="absolute h-fit	top-[59px] bottom-0 left-0 right-0 border-t border-custom_bg z-40 lg:block "
      :class="getClassHideShow(item.name)"
    >
      <div class="bg-modal_bg custom-container pb-[64px]">
        <div class="grid grid-cols-12 gap-5 xl:gap-3">
          <div class="col-span-3">
            <div class="flex flex-col flex-wrap gap-10 max-h-[260px] gap-y-4 mt-10" @click="handleCloseMenu">
              <nuxt-link
                v-for="(child, indexChild) in item.childs"
                :key="`${child.name}-${indexChild}}`"
                class="text-base text-search_item_text_color"
                :to="child.url"
              >
                {{ child.name }}
              </nuxt-link>
            </div>
          </div>
          <div class="col-span-1" />
          <div
            v-for="(image, indexImages) in findMenuImagesByName(item.name)"
            :key="`${image.tag}-${indexImages}}`"
            class="col-span-3 mt-8"
          >
            <div
              class="nav-image-one flex items-end h-[245px] rounded-[3px] bg-cover	"
              :style="{
                backgroundImage: `url('${$config.baseURLWithoutLastBar}${image.image}')`,
              }"
            >
              <div class="pl-4 pb-4" :class="mapColorClass(image.textColor)">
                <p class="text-[10px] font-bold mt-[90px] uppercase">
                  {{ image.tag }}
                </p>
                <h3 class="font-bold text-xl mt-2 mb-1">
                  {{ image.title }}
                </h3>
                <p class="max-w-[304px] text-sm">
                  {{ image.subtitle }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

