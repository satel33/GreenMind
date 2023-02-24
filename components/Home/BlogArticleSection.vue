<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {

  }
});
</script>

<template>
  <section class="custom-container mt-[48px] lg:mt-20 overflow-hidden">
    <h2
      class="text-deep_green text-[28px] md:text-[40px] leading-[34px] md:leading-[48px] font-extrabold mb-10"
    >
      Vi bringer dig de grønneste nyheder
    </h2>

    <div
      class="flex flex-nowrap justify-start gap-3 lg:grid lg:grid-cols-3 xl:grid-cols-4 w-[530px] lg:w-full"
    >
      <div class="custom-card-second">
        <div class="card-image-container rounded-3px">
          <GreenImage
            src="/images/Image5.png"
            :width="282"
            :height="211"
            alt="iphone"
          />
        </div>
        <p
          class="mt-[12px] mb-[4px] text-[10px] leading-[12px] text-deep_green font-bold"
        >
          17.08.2022
        </p>
        <h3
          class="text-[18px] leading-[22px] text-deep_green font-bold max-w-[260px]"
        >
          Det skal være naturligt at handle grønt
        </h3>
      </div>

      <div class="custom-card-second">
        <div class="card-image-container rounded-3px">
          <GreenImage
            src="/images/Image6.png"
            :width="282"
            :height="211"
            alt="iphone"
          />
        </div>
        <p
          class="mt-[12px] mb-[4px] text-[10px] leading-[12px] text-deep_green font-bold"
        >
          21.07.2022
        </p>
        <h3
          class="text-[18px] leading-[22px] text-deep_green font-bold max-w-[260px]"
        >
          5 fordele ved at købe genanvendeligt elektronik
        </h3>
      </div>

      <div class="hidden md:block custom-card-second">
        <div class="card-image-container rounded-3px">
          <GreenImage
            src="/images/Image7.png"
            :width="282"
            :height="211"
            alt="iphone"
          />
        </div>
        <p
          class="mt-[12px] mb-[4px] text-[10px] leading-[12px] text-deep_green font-bold"
        >
          02.06.2022
        </p>
        <h3
          class="text-[18px] leading-[22px] text-deep_green font-bold max-w-[260px]"
        >
          Nu kan du opdage vores spændende butikker i Sverige
        </h3>
      </div>
      <div class="hidden md:block custom-card-second">
        <div class="card-image-container rounded-3px">
          <GreenImage
            src="/images/Image8.png"
            :width="282"
            :height="211"
            alt="iphone"
          />
        </div>
        <p
          class="mt-[12px] mb-[4px] text-[10px] leading-[12px] text-deep_green font-bold"
        >
          01.06.2022
        </p>
        <h3
          class="text-[18px] leading-[22px] text-deep_green font-bold max-w-[260px]"
        >
          Så meget sparer ved at handle grønt
        </h3>
      </div>
    </div>

    <div class="flex md:hidden items-center justify-center mt-[56px]">
      <div class="w-[330px] h-[6px] bg-[#007476] rounded-full" />
      <div class="w-[330px] h-[6px] bg-[#EEEEEE] rounded-full" />
    </div>
  </section>
</template>
