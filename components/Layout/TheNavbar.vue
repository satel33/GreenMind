<script lang="ts">
import { computed, PropType } from '@nuxtjs/composition-api';
import { useCart, useUser } from '@vue-storefront/odoo';
import { defineComponent, onMounted, ref, watch } from '@vue/composition-api';
import { cartGetters, useUiState } from '~/composables';
import { GreenCart, WebsiteMegaMenu, WebsiteMenu } from '~/green-api/types';

export default defineComponent({
  props: {
    menu: {
      type: Array as PropType<WebsiteMegaMenu[]>,
      default: () => ([])
    }
  },
  setup(props) {
    const { toggleCartSidebar, toggleLoginModal, toggleOverlay, isCartSidebarOpen } = useUiState();
    const { load: loadUser, isAuthenticated } = useUser();
    const { load: loadCart, cart } = useCart();
    const openedMegaMenu = ref(null);

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value as GreenCart);
      return count ? count.toString() : 0;
    });

    const megaMenuHeader = computed(() => props.menu
      .filter(item => item.parent === null)
      .sort((a, b) => (a.sequence > b.sequence) ? 1 : -1));

    const showMegaMenu = (name) => {
      openedMegaMenu.value = name;
      toggleOverlay(true);
    };

    const closeMegaMenu = () => {
      openedMegaMenu.value = null;
    };

    watch(
      openedMegaMenu,
      () => {
        if (openedMegaMenu.value === null) {
          toggleOverlay(false);
        }
      }
    );

    onMounted(async () => {
      await loadUser();
      await loadCart({ customQuery: { cartLoad: 'greenCartLoad' } });
    });

    return {
      isAuthenticated,
      cartTotalItems,
      megaMenuHeader,
      openedMegaMenu,
      isCartSidebarOpen,

      closeMegaMenu,
      showMegaMenu,
      toggleCartSidebar,
      toggleLoginModal
    };
  }
});
</script>

<template>
  <nav
    class="fixed md:mt-[88px] w-full md:border-b md:border-header bg-modal_bg"
    :class="{
      'z-[5]': !isCartSidebarOpen,
      'z-[2]': isCartSidebarOpen,
    }"
    @mouseleave="closeMegaMenu"
  >
    <div class="custom-container flex items-center justify-between py-0 md:py-3 md:relative">
      <ul id="navbar" class="list-none hidden md:flex items-center gap-x-[20px]">
        <li
          v-for="link in megaMenuHeader"
          :key="link.name"
          @click="link.url ? $router.push(link.url) : showMegaMenu(link.name)"
        >
          <span class="nav text-base text-text_color py-1 px-2.5 hover:bg-custom_bg hover:text-white hover:rounded-custom cursor-pointer">{{ link.name }}</span>
        </li>
      </ul>
      <ul class="list-none flex items-center gap-x-4 md:gap-x-[42px] absolute md:static top-[28px] right-[16px]">
        <nuxt-link to="butikker">
          <li class="custom-animation cursor-pointer">
            <GreenImage
              src="/images/Location.png"
              class="image "
              :width="16"
              :height="20"
              loading="eager"
              alt="location"
            />
          </li>
        </nuxt-link>
        <!--        <li class="custom-animation cursor-pointer" @click="toggleLoginModal">
          <GreenImage
            src="/images/Avatar.png"
            class="image cursor-pointer"
            :width="20"
            :height="20"
            loading="eager"
            alt="avatar"
          />
        </li> -->
        <li class="custom-animation cursor-pointer" @click="toggleCartSidebar(false)">
          <div class="relative">
            <GreenImage
              src="/images/Basket.png"
              class="image pt-3"
              :width="20"
              :height="20"
              loading="eager"
              alt="basket"
            />
            <div v-if="cartTotalItems" class="absolute top-[-2px] right-[-10px] cursor-pointer w-[16px] h-[17px] rounded-[12px] bg-[#003132] text-white">
              <span class="absolute top-[-9px] right-[4px] text-[12px]">
                {{ cartTotalItems }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <LazyLayoutTheMegaMenu
      :opened-mega-menu="openedMegaMenu"
      :menu="menu"
      @close-menu="closeMegaMenu"
    />
  </nav>
</template>
<style scoped lang="scss">
::v-deep .nav-active {
  background-color: #007476;
  color: #ffffff;
  border-radius: 25px;
}

</style>
