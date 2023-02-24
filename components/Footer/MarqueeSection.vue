<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import { PropType } from '@nuxtjs/composition-api';
import { WebsiteHomepageNotice } from '~/green-api/types';

export default defineComponent({
  directives: {
    clickOutside
  },
  props: {
    notices: {
      type: Array as PropType<WebsiteHomepageNotice[]>,
      required: true
    }
  },
  setup({}, { root }) {

    const toggleKlaviyoForm = () => {
      const win = (window as any);

      win._klOnsite = win._klOnsite || [];
      win._klOnsite.push(['openForm', 'RJKrLf']);
    };

    onMounted(() =>{
      const e = document.createElement('script');
      e.type = 'text/javascript';
      e.defer = true;
      e.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${root.$config.klaviyoKey}`;
      const s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(e, s);
    });

    return {
      toggleKlaviyoForm
    };
  }
});
</script>

<template>
  <section
    class="enable-animation bg-[#F9C1D4] cursor-pointer"
    @click="toggleKlaviyoForm"
  >
    <div class="marquee relative flex overflow-hidden py-4 md:py-8 ">
      <ul class="marquee__content">
        <li
          v-for="(notice, index) in notices"
          :key="index"
          class="flex space-x-6 md:space-x-14"
        >
          <GreenImage
            src="/images/Vector3.png"
            class="w-6 md:w-10 h-6 md:h-10 ml-4 md:ml-12"
            :width="40"
            :height="40"
            alt="vector"
          />
          <h3 class="text-xl md:text-[32px] md:leading-[38px] font-bold text-[#007476]">
            {{ notice.title }}
          </h3>
        </li>
      </ul>
      <ul class="marquee__content" aria-hidden="true">
        <li
          v-for="(notice, index) in notices"
          :key="index"
          class="flex space-x-6 md:space-x-14"
        >
          <GreenImage
            src="/images/Vector3.png"
            class="w-6 md:w-10 h-6 md:h-10 ml-4 md:ml-12"
            :width="40"
            :height="40"
            alt="vector"
          />
          <h3 class="text-xl md:text-[32px] md:leading-[38px] font-bold text-[#007476]">
            {{ notice.title }}
          </h3>
        </li>
      </ul>
    </div>
  </section>
</template>
<style scoped>
@import "~/assets/css/marque.scss"
</style>
