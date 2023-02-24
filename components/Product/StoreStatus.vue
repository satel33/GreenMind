<template>
  <SfModal
    :visible="isStoreModalOpen"
    class="store-modal"
    @close="toggleStoreModal"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        title="Find butik"
        @click:close="toggleStoreModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div>
        <p class="font-bold text-base pb-4 stores-list-header">
          {{ `${$t("Stores found")}: ${stockList.length}` }}
        </p>
        <div v-if="stockList.length" class="flex flex-wrap justify-between">
          <div
            v-for="(stock, index) in stockList"
            :key="index"
            class="indi-product"
          >
            <div class="flex justify-between relative items-start stores-data">
              <div class="flex items-start">
                <img
                  :src="require('/assets/images/product/store.svg')"
                  width="98"
                  height="120"
                  class="mr-4 pb-1"
                >
                <div>
                  <div>
                    <p class="text-xl font-medium">
                      {{ stock.name }}
                    </p>
                    <p v-if="stock.address.street" class="text-sm font-normal">
                      {{ stock.address.street }}
                    </p>
                    <p v-if="stock.address.street2" class="text-sm font-normal">
                      {{ stock.address.street2 }}
                    </p>
                    <p
                      v-if="stock.address.zip && stock.address.city"
                      class="text-sm font-normal"
                    >
                      {{ `${stock.address.zip} ${stock.address.city}` }}
                    </p>
                  </div>

                  <p
                    v-if="stock.qtyInWarehouse"
                    class="text-sm font-normal lg:absolute lg:bottom-0"
                  >
                    {{ $t('in stock') }}: {{ stock.qtyInWarehouse > 10 ? '10+' : stock.qtyInWarehouse }}
                  </p>
                </div>
              </div>
              <div>
                <div
                  v-if="stock.openHours"
                  class="bg-gray-200 p-2 rounded-md store-position"
                >
                  <div
                    v-for="(openHour, key) in stock.openHours"
                    :key="key"
                    class="flex justify-between gap-6"
                  >
                    <p class="text-xs">
                      {{ openHour.dayOfWeek }}
                    </p>
                    <p class="text-xs">
                      {{ openHour.openHours }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center text-2xl font-medium py-6 m-auto lg:w-3/4"
        >
          {{ $t("Not available for pickup") }}
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script lang="ts">
import { SfModal, SfBar } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { computed, defineComponent } from '@vue/composition-api';
import { useUiNotification, useUiState, useStore } from '~/composables';

export default defineComponent({
  name: 'StoreStatus',
  components: {
    SfModal,
    SfBar
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { isStoreModalOpen, toggleStoreModal } = useUiState();
    const { send } = useUiNotification();
    const { error, stockList, getStock } = useStore(props.id);

    onSSR(async () => {
      await getStock({
        productId: props.id
      });

      if (error.value.getStock)
        send({ message: error?.value?.getStock?.message, type: 'danger' });
    });

    return {
      stockList,
      isStoreModalOpen,
      toggleStoreModal
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/storeStatus.scss';
</style>
