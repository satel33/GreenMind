<template>
  <div id="detailed-cart">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="detailed-cart gap-10">
      <div class="detailed-cart__main">
        <transition
          name="sf-fade"
          mode="out-in"
          type="transition"
        >
          <div
            v-if="totalItems"
            key="detailed-cart"
            class="collected-product-list"
          >
            <transition-group
              name="sf-fade"
              tag="div"
              type="transition"
            >
              <LazyGreenDetailedCollectedProduct
                v-for="orderLine in orderLines"
                :key="orderLine.id"
                :order-line="orderLine"
                :checkbox_title="$t('Purchases')"
                class="sf-collected-product--detailed mb-8"
              />
            </transition-group>
          </div>
          <div
            v-else
            key="empty-cart"
            class="empty-cart"
          >
            <SfImage
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
              alt="Empty cart"
              class="empty-cart__image"
              :placeholder="require('~/static/default_image.webp')"
              :width="$device.isMobile ? 210 : 531"
              :height="$device.isMobile ? 142 : 361"
            />
            <SfHeading
              :title="$t('Your cart is empty')"
              :level="2"
              :description="$t('Looks like you haven’t added any items to the cart yet. Start shopping to fill it in.')"
            />
            <SfButton
              class="sf-button--full-width empty-cart__button"
              @click="$router.go(-2)"
            >
              {{ $t("go back to shopping") }}
            </SfButton>
          </div>
        </transition>
      </div>
      <div v-if="true" class="detailed-cart__aside">
        <LazyCheckoutCartPreview key="order-summary">
          <template #extra-middle>
            <div class="mt-10">
              <nuxt-link to="/checkout/personaldetails" :title="$t('CHECKOUT')">
                <GreenButton
                  style-type="Primary"
                  color="Green"
                  shape="Round"
                  size="Medium"
                >
                  {{ $t("CHECKOUT") }}
                </GreenButton>
              </nuxt-link>
            </div>
            <div class="mt-5">
              <GreenButton
                style-type="Secondary"
                color="Green"
                shape="Round"
                size="Medium"
                @click="$router.go(-1)"
              >
                {{ $t("BACK TO SHOPPING") }}
              </GreenButton>
            </div>
          </template>
        </LazyCheckoutCartPreview>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfButton,
  SfImage,
  SfHeading,
  SfBreadcrumbs
} from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import { computed } from '@nuxtjs/composition-api';
import { useCart, useUser } from '@vue-storefront/odoo';
import { useUiState, cartGetters } from '~/composables';

export default {
  name: 'Cart',
  components: {
    SfBreadcrumbs,
    SfImage,
    SfButton,
    SfHeading
  },
  setup() {
    const { isAuthenticated } = useUser();
    const { cart, removeItem, updateItemQty } = useCart();
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();

    const orderLines = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const summary = ref([
      { name: 'Products', value: totalItems },
      { name: 'Sub Total', value: totals },
      { name: 'Shipping:', value: 'Free' }
    ]);
    const breadcrumbs = [
      { text: 'Home', link: '/' },
      { text: 'Cart', link: '#' }
    ];

    return {
      isAuthenticated,
      orderLines,
      updateItemQty,
      isCartSidebarOpen,
      toggleCartSidebar,
      removeItem,
      breadcrumbs,
      totals,
      totalItems,
      summary,
      cartGetters
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~/assets/css/cart.scss';

</style>

