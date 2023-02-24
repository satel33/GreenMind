<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {

  }
});
</script>
<template>
  <section class="mt-12 md:mt-20 mb-0 lg:my-20 custom-container">
    <div class="bg-[#96D5D2] flex flex-wrap flex-col-reverse md:flex-row justify-start md:justify-between rounded-3px">
      <div class="px-5 md:px-0 lg:pl-[100px] flex-1">
        <h2 class="text-[#007476] font-extrabold text-[36px] xl:text-[77px] leading-[44px] xl:leading-[80px] xl:max-w-[643px] mt-0 md:mt-[108px]">
          Sådan sælger du din enhed til GreenMind
        </h2>
        <p class="text-[#003638] text-base md:text-[20px] leading-6 md:leading-[28px] md:max-w-[540px] mt-5 mb-5 lg:mb-10">
          <span>Forvandle den enhed, du har, til den, du drømmer om. Indlevér din
            gamle enhed, når du køber noget nyt.</span><br>
          Så giver vi dig et tilskud eller betaler din enhed til genbrug
          gratis.
        </p>
        <button class="hidden lg:flex custom-btn-large w-[171px] mb-5 md:-mb-0">
          <span class="text pl-2">Sådan gør du</span>
          <span class="custom-circle w-8 h-8">
            <GreenImage
              :src="require('/assets/images/Union.png')"
              :width="7"
              :height="6"
              alt="Arrow"
            />
          </span>
        </button>
        <button class="md:hidden custom-btn-small mb-5">
          <span class="text">Læs mere</span>
          <span class="custom-circle">
            <GreenImage
              src="/images/Union.png"
              :width="7"
              :height="6 "
              alt="Arrow"
            />
          </span>
        </button>
      </div>
      <div class="flex-none relative lg:flex-1 xl:flex-none">
        <GreenImage
          class="w-full h-full main-image"
          src="/images/image-iphone.png"
          :width="547"
          :height="$device.isMobile ? 551 : 680"
          :img-attrs="{ class: 'w-full h-full' }"
          alt="iphone"
        />
        <div class="p-6 md:p-8 absolute bottom-[140px] left-[87px] w-[116px] md:w-[200px] h-[116px] md:h-[200px] rounded-full bg-[#007476] pt-[30px] md:pt-[51px] pb-[30px] md:pb-[62px]">
          <h3 class="text-white font-extrabold text-[25px] md:text-[48px] leading-[31px] md:leading-[58px]">
            Nemt
          </h3>
          <h4 class="text-white text-base md:text-[32px] md:leading-[38px] font-bold">
            og grønt
          </h4>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
::v-deep picture {
  width: 100%;
}
</style>
