<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { SfCarousel} from '@storefront-ui/vue';
export default defineComponent({
  components: {
    SfCarousel
  },
  setup() {

  }
});
</script>

<template>
  <section class="custom-container mt-[48px] md:mt-[100px] mb-[60px] md:mb-[160px] relative">
    <h2 class="text-deep_green text-[22px] lg:text-[40px] leading-[28px] md:leading-[38px] font-bold mb-10">
      Det synes vores kunder om os
    </h2>
    <div>
      <div class="grid grid-cols-12 text-center md:text-start">
        <div class="col-span-12 md:col-span-3 xl:col-span-2 relative">
          <h3 class="text-[32px] leading-[38px] text-[#000000] mb-[13px]">
            Fremragende
          </h3>
          <div class="flex gap-1 justify-center md:justify-start">
            <div class="w-[32px] h-[31px] p-[8px] bg-[#00AE71]">
              <GreenImage
                src="/images/star-small.png"
                class="w-4"
                :width="15"
                :height="15"
                alt="star"
              />
            </div>
            <div class="w-[32px] h-[31px] p-[8px] bg-[#00AE71]">
              <GreenImage
                src="/images/star-small.png"
                class="w-4"
                :width="15"
                :height="15"
                alt="star"
              />
            </div>
            <div class="w-[32px] h-[31px] p-[8px] bg-[#00AE71]">
              <GreenImage
                src="/images/star-small.png"
                class="w-4"
                :width="15"
                :height="15"
                alt="star"
              />
            </div>
            <div class="w-[32px] h-[31px] p-[8px] bg-[#00AE71]">
              <GreenImage
                src="/images/star-small.png"
                class="w-4"
                :width="15"
                :height="15"
                alt="star"
              />
            </div>
            <div class="w-[32px] h-[31px] p-[8px] bg-[#00AE71] relative">
              <GreenImage
                src="/images/star-small.png"
                class="w-4"
                :width="15"
                :height="15"
                alt="star"
              />
              <div
                class="absolute top-0 right-0 bottom-0 w-[25%] bg-[#E9E8E8]"
              />
            </div>
          </div>
          <h3 class="text-[16px] leading-[19.5px] text-[#000000] font-medium mt-3 mb-4">
            Based on <a href="#" class="underline">20,901 reviews</a>
          </h3>
          <div class="flex gap-1 justify-center md:justify-start">
            <GreenImage
              src="/images/star-big.png"
              class="w-6"
              :width="22"
              :height="22"
              alt="star"
            />
            <h3 class="text-[20px] leading-[24px] font-medium text-[#000000]">
              Trustpilot
            </h3>
          </div>
        </div>
        <div class="grow hidden md:block col-span-11 md:col-span-9 xl:col-span-10">
          <SfCarousel>
            <template #prev="{ go }">
              <div class="btn-prev cursor-pointer w-8 h-8 border border-[#8E98A8] rounded-full hidden md:flex items-center justify-center" @click="go">
                <GreenImage
                  src="/images/left-arrow.png"
                  :width="6"
                  :height="10"
                  alt="star"
                />
              </div>
            </template>

            <template #next="{ go }">
              <div class="btn-next cursor-pointer w-8 h-8 border border-[#8E98A8] rounded-full hidden md:flex items-center justify-center bg-white z-10" @click="go">
                <GreenImage
                  src="/images/right-arrow.png"
                  :width="6"
                  :height="10"
                  alt="star"
                />
              </div>
            </template>
            <SfCarouselItem>
              <div class="hidden md:block">
                <div class="flex gap-1 mt-2.5">
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                </div>
                <h3
                  class="text-base leading-[19px] text-[#000000] mt-[13px] mb-[3px] font-bold truncate"
                >
                  Super god oplevelse
                </h3>
                <p
                  class="text-sm leading-[21px] text-[#000000] font-medium mb-3 line-clamp-2"
                >
                  Fantastiske produkter med gode priser. Jeg købte min
                  iPhone 13...
                </p>
                <span class="text-[#8E98A8] text-sm leading-[21px]">Mathilde Knudsen</span>
              </div>
            </SfCarouselItem>
            <SfCarouselItem>
              <div class="hidden md:block">
                <div class="flex gap-1 mt-2.5">
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />

                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                </div>
                <h3
                  class="text-base leading-[19px] text-[#000000] mt-[13px] mb-[3px] font-bold truncate"
                >
                  God service og hurtig...
                </h3>
                <p
                  class="text-sm leading-[21px] text-[#000000] font-medium mb-3 line-clamp-2"
                >
                  Fik repareret min iPhone 11 hos GreenMind. Allerede
                  dagen efter...
                </p>
                <span class="text-[#8E98A8] text-sm leading-[21px]">Jens Mathiesen</span>
              </div>
            </SfCarouselItem>
            <SfCarouselItem>
              <div class="hidden md:block">
                <div class="flex gap-1 mt-2.5">
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                </div>
                <h3
                  class="text-base leading-[19px] text-[#000000] mt-[13px] mb-[3px] font-bold truncate"
                >
                  Kundeklubben gav mig gode...
                </h3>
                <p
                  class="text-sm leading-[21px] text-[#000000] font-medium mb-3 line-clamp-2"
                >
                  Jeg sparede 15% på min nye Samsung Galaxy gennem
                  kundekl...
                </p>
                <span class="text-[#8E98A8] text-sm leading-[21px]">Ida Sørensen</span>
              </div>
            </SfCarouselItem>
            <SfCarouselItem>
              <div class="hidden md:block">
                <div class="flex gap-1 mt-2.5">
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                </div>
                <h3
                  class="text-base leading-[19px] text-[#000000] mt-[13px] mb-[3px] font-bold truncate"
                >
                  Super god oplevelse
                </h3>
                <p
                  class="text-sm leading-[21px] text-[#000000] font-medium mb-3 line-clamp-2"
                >
                  Fantastiske produkter med gode priser. Jeg købte min
                  iPhone 13...
                </p>
                <span class="text-[#8E98A8] text-sm leading-[21px]">Mathilde Knudsen</span>
              </div>
            </SfCarouselItem>
            <SfCarouselItem>
              <div class="hidden md:block">
                <div class="flex gap-1 mt-2.5">
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />

                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                </div>
                <h3
                  class="text-base leading-[19px] text-[#000000] mt-[13px] mb-[3px] font-bold truncate"
                >
                  God service og hurtig...
                </h3>
                <p
                  class="text-sm leading-[21px] text-[#000000] font-medium mb-3 line-clamp-2"
                >
                  Fik repareret min iPhone 11 hos GreenMind. Allerede
                  dagen efter...
                </p>
                <span class="text-[#8E98A8] text-sm leading-[21px]">Jens Mathiesen</span>
              </div>
            </SfCarouselItem>
            <SfCarouselItem>
              <div class="hidden md:block">
                <div class="flex gap-1 mt-2.5">
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                  <GreenImage
                    src="/images/star-small.png"
                    class="w-8 h-[31px] p-2 bg-[#00AE71]"
                    :width="15"
                    :height="15"
                    alt="star"
                  />
                </div>
                <h3
                  class="text-base leading-[19px] text-[#000000] mt-[13px] mb-[3px] font-bold truncate"
                >
                  Kundeklubben gav mig gode...
                </h3>
                <p
                  class="text-sm leading-[21px] text-[#000000] font-medium mb-3 line-clamp-2"
                >
                  Jeg sparede 15% på min nye Samsung Galaxy gennem
                  kundekl...
                </p>
                <span class="text-[#8E98A8] text-sm leading-[21px]">Ida Sørensen</span>
              </div>
            </SfCarouselItem>
          </SfCarousel>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
::v-deep .sf-carousel__controls {
  width: 88%;
  left: 8%;
}
</style>
