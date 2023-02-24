<script lang="ts">
import { computed, PropType } from "@nuxtjs/composition-api";
import { defineComponent, reactive } from "@vue/composition-api";
import { WebsiteMegaMenu, WebsiteMenu } from "~/green-api/types";

export default defineComponent({
  props: {
    menu: {
      type: Array as PropType<WebsiteMegaMenu[]>,
      default: () => [],
    },
  },
  setup(props) {
    const parentMenus = computed(() =>
      props.menu?.filter((item) => !item.parent)
    );

    const mobileMenu = reactive({
      productLinks: false,
      aboutUsLinks: false,
      clientService: false,
      contact: false,
    });

    const productLinks = reactive([]);

    const aboutUsLinks = reactive([]);

    const clientService = reactive([]);
    return {
      parentMenus,
      productLinks,
      aboutUsLinks,
      clientService,
      mobileMenu,
    };
  },
});
</script>
<template>
  <footer class="bg-footer">
    <div class="custom-container">
      <div
        class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-[68px]"
      >
        <FooterColumn
          v-for="(menu, index) in parentMenus"
          :key="index"
          :title="menu.name"
          :links="menu.childs"
        />

        <div class="flex p-0 flex-col gap-y-6">
          <span class="text-sm text-header pl-2.5"> Kontakt os</span>
          <a
            href="tel: Tlf: +45 46 97 50 50"
            class="text-base text-white py-1 px-2.5 rounded-custom hover:text-text_color hover:bg-header custom-width"
            >Tlf: +45 46 97 50 50</a
          >
          <a
            href="mail:to mail@greenmind.dk"
            class="text-base text-white py-1 px-2.5 rounded-custom hover:text-text_color hover:bg-header custom-width"
            >Mail: mail@greenmind.dk</a
          >
          <nuxt-link
            to="butikker"
            class="text-base text-white py-1 px-2.5 rounded-custom hover:text-text_color hover:bg-header custom-width"
          >
            Find butik
          </nuxt-link>
        </div>
      </div>

      <div class="md:hidden pt-10">
        <FooterMobileColumn
          v-for="(menuChild, index) in parentMenus"
          :key="index"
          :title="menuChild.name"
          :links="menuChild.childs"
        />
        <div>
          <div
            class="flex items-center justify-between border-b border-border_color pb-5 my-5 footer-faq"
            @click="mobileMenu.contact = !mobileMenu.contact"
          >
            <p class="text-[#96D5D2] text-base">Kontakt os</p>
            <GreenImage
              src="/images/Container.png"
              :class="{ rotate180: mobileMenu.contact }"
              class="w-4 h-2.5"
              :width="16"
              :height="10"
              alt="container"
            />
          </div>
          <div
            class="flex p-0 -ml-1 flex-col gap-y-4 transition-all duration-75 ease-in-out"
            :class="{
              active: mobileMenu.contact,
              hidden: !mobileMenu.contact,
            }"
          >
            <a
              href="tel: Tlf: +45 46 97 50 50"
              class="text-base text-white px-1 rounded-custom hover:text-text_color hover:bg-header custom-width"
              >Tlf: +45 46 97 50 50</a
            >
            <a
              href="mail:to mail@greenmind.dk"
              class="text-base text-white px-1 rounded-custom hover:text-text_color hover:bg-header custom-width"
              >Mail: mail@greenmind.dk</a
            >
            <nuxt-link
              to="buttikk"
              class="text-base text-white px-1 rounded-custom hover:text-text_color hover:bg-header custom-width"
            >
              Find butik
            </nuxt-link>
          </div>
        </div>
      </div>

      <GreenImage
        src="/images/Small.png"
        class="mt-[84px]"
        :width="120"
        :height="18"
        alt="small"
      />
      <hr class="border-t border-border_color my-[30px]" />

      <div class="flex items-center justify-between mt-[19px] pb-8 flex-wrap">
        <div class="flex itams-center gap-x-3">
          <span>
            <GreenImage
              src="/images/Icon_visa1.png"
              class="w-11 h-8"
              :width="44"
              :height="32"
              alt="visa"
            />
          </span>
          <span>
            <GreenImage
              src="/images/icon_master.png"
              class="w-11 h-8"
              :width="44"
              :height="32"
              alt="master"
            />
          </span>
          <span>
            <GreenImage
              src="/images/Icon_visa.png"
              class="w-11 h-8"
              :width="44"
              :height="32"
              alt="visa"
            />
          </span>
        </div>
        <div class="flex iteams-center gap-x-3">
          <span>
            <GreenImage
              src="/images/Vector.png"
              class="w-8 h-8"
              :width="32"
              :height="32"
              alt="vector"
            />
          </span>
          <span>
            <GreenImage
              src="/images/Vector1.png"
              class="w-8 h-8"
              :width="32"
              :height="32"
              alt="vector"
            />
          </span>
          <span>
            <GreenImage
              src="/images/Vector2.png"
              class="w-8 h-8"
              :width="32"
              :height="32"
              alt="vector"
            />
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped></style>
