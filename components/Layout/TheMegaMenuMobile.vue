<script lang="ts">
import { computed } from '@nuxtjs/composition-api';
import { defineComponent, PropType } from '@vue/composition-api';
import frag from 'vue-frag';
import { useUiState } from '~/composables';
import { WebsiteMegaMenu, WebsiteMenu } from '~/green-api/types';
export default defineComponent({
  directives: {
    frag
  },
  props: {
    headers: {
      type: Array as PropType<WebsiteMenu[]>,
      default: () => ([])
    },
    menu: {
      type: Array as PropType<WebsiteMegaMenu[]>,
      default: () => ([])
    }
  },
  emits: ['close-menu'],
  setup(props, { root }) {
    const { toggleMobileMenu, isMobileMenuOpen, toggleMobileSubMenu, statusMobileSubMenu, mobileSubMenu } = useUiState();

    const megaMenuHeader = computed(() => props.menu
      .filter(item => item.parent === null)
      .sort((a, b) => (a.sequence > b.sequence) ? 1 : -1));

    props.menu.forEach((element, index) => {
      if (!element.url) {
        root.$set(mobileSubMenu, `link-${element.name}`, false);
      }
    });

    const subMenus = computed(() => {
      const newSubMenus = [];
      props.menu.forEach(menu => {
        if (menu.childs?.length > 0) {
          newSubMenus.push(menu);
        }
      });
      return newSubMenus;
    });

    const navigateToRoute = (path: string) => {
      toggleMobileMenu();
      root.$router.push(path);
    };

    return {
      subMenus,
      megaMenuHeader,
      statusMobileSubMenu,
      isMobileMenuOpen,

      navigateToRoute,
      toggleMobileSubMenu,
      toggleMobileMenu
    };
  }
});
</script>

<template>
  <div v-frag>
    <nav
      id="mobileHeaderMenu"
      class="md:hidden fixed top-0 bottom-0 right-0 bg-modal_bg px-[15.7px] z-10 w-full transition-all duration-300 ease-in-out"
      :class="{
        '-left-[999px]': !isMobileMenuOpen,
        'left-0': isMobileMenuOpen
      }"
    >
      <img
        class="w-[21px] h-[18px] my-5"
        :src="require('/assets/images/Union-black.png')"
        alt="union"
        @click="toggleMobileMenu"
      >
      <LayoutMegaMenuMobileTopTitle
        v-for="item in megaMenuHeader"
        :key="item.name"
        :title="item.name"
        @click="item.url ? navigateToRoute(item.url) : toggleMobileSubMenu(`link-${item.name}`)"
      />

      <div class="flex flex-col gap-y-6 mt-[50px]" @click="toggleMobileMenu">
        <nuxt-link
          v-for="(header, index) in headers"
          :key="index"
          class="text-base text-search_item_text_color"
          :to="header.url ? header.url : ''"
        >
          {{ header.title }}
        </nuxt-link>
      </div>
    </nav>

    <div
      v-for="(item, index) in subMenus"
      :key="index"
      :class="{
        'hidden': !statusMobileSubMenu[`link-${item.name}`],
        'block': statusMobileSubMenu[`link-${item.name}`]
      }"
    >
      <nav class="md:hidden fixed top-0 bottom-0 left-0 right-0 bg-modal_bg px-[15.7px] z-10 overflow-hidden">
        <LayoutMegaMenuMobileReturnLink @click="toggleMobileSubMenu(`link-${item.name}`)" />

        <div
          v-for="(child, indexChild) in item.childs"
          :key="indexChild"
          class="flex items-center justify-between py-4 border-b border-[#8ABFC0]"
        >
          <span
            class="text-xl text-search_item_text_color"
            @click="child.url ? navigateToRoute(child.url) : toggleMobileSubMenu(`link-${child.name}`)"
          >
            {{ child.name }}
          </span>
          <GreenImage
            src="/images/Chevron-black.png"
            :width="11"
            :height="18"
            alt="chevron"
          />
        </div>
      </nav>
    </div>
  </div>
</template>

