<script lang="ts">
import { defineComponent, computed, PropType } from "@nuxtjs/composition-api";
import { useUiState } from "~/composables";
import { WebsiteMenu } from "~/green-api/types";
export default defineComponent({
  props: {
    headers: {
      type: Array as PropType<WebsiteMenu[]>,
      default: () => [],
    },
  },
  setup(props, { root }) {
    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);
    const { toggleMobileMenu, isCartSidebarOpen } = useUiState();

    return {
      isCartSidebarOpen,
      toggleMobileMenu,
      mobileOrTabletSize,
    };
  },
});
</script>

<template>
  <header
    :class="{
      'z-[5]': !isCartSidebarOpen,
      'z-[2]': isCartSidebarOpen,
    }"
    class="bg-header fixed left-0 right-0"
  >
    <div
      class="custom-container grid grid-cols-16 items-center gap-6 md:gap-0 h-[88px] mb-[71px] md:mb-0"
    >
      <div class="col-span-8 md:col-span-3 xl:col-span-4 justify-self-start flex gap-x-6">
        <GreenImage
          src="/images/Burger.png"
          class="md:hidden"
          :width="20"
          :height="18"
          alt="vector"
          :loading="$device.isMobile ? 'eager' : 'lazy'"
          @click="toggleMobileMenu"
        />
        <GreenLogo />
      </div>

      <div
        class="col-span-16 md:col-span-8 bg-modal_bg py-3 lg:bg-transparent absolute md:static top-[87.5px] left-0 right-0 px-4 md:ml-14  xl:mx-14"
      >
        <form
          class="h-12 rounded-[200px] bg-white flex items-center gap-x-3 md:gap-x-6 border md:border-0 border-[#8ABFC0] md:border-white md:hover:border-custom_bg custom-search-field"
        >
          <GreenImage
            src="/images/Search.png"
            class="ml-5 md:ml-8 w-[15px] h-[15px] md:w-[18px] md:h-[18px]"
            :width="15"
            :height="15"
            loading="eager"
            alt="search"
          />
          <input
            aria-label="Search"
            type="search"
            placeholder="Tænk grønt og søg på det produkt du ønsker"
            class="placeholder:text-button_bg placeholder:text-xs sm:placeholder:text-sm placeholder:text-text_color flex-1 placeholder:mb-[1px] sm:placeholder:mb-0 outline-none bg-transparent pr-3"
          />
          <LazyGreenSearchClerk />
        </form>
      </div>
      <div class="col-span-8 md:col-span-5 xl:col-span-4 justify-self-end hidden lg:block col-span-4">
        <nuxt-link
          v-for="(item, index) in headers"
          :key="index"
          :to="item.url ? item.url : ''"
          class="text-text_color text-sm py-1 px-2.5 hover:bg-custom_bg hover:text-white hover:py-[3px] hover:rounded-custom"
        >
          {{ item.name }}
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
