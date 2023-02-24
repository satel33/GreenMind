<template>
  <div id="cart">
    <SfSidebar
      :visible="isCartSidebarOpen"
      :title="$t('My Cart')"
      position="right"
      @close="toggleCartSidebar"
    >
      <template #content-top>
        <SfProperty
          v-show="totalItems"
          class="sf-property--large cart-summary desktop-only"
          :name="$t('Total items')"
          :value="totalItems"
        />
      </template>
      <transition
        type="transition"
        name="sf-fade"
        mode="out-in"
      >
        <div
          v-if="totalItems"
          key="my-cart"
          class="my-cart"
        >
          <div class="collected-product-list">
            <transition-group
              name="sf-fade"
              type="transition"
              tag="div"
            >
              <LazyGreenCollectedProduct
                v-for="item in items"
                ref="list"
                :key="item.id"
                :order-line="item"
                :checkbox_title="$t('Purchases')"
              />
            </transition-group>
          </div>
        </div>
        <div
          v-else
          key="empty-cart"
          class="empty-cart"
        >
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              :src="require(`/assets/images/cart/${!$device.isMobile ? 'empty_cart_big.svg' : 'empty_cart.svg'}`)"
              :width="$device.isMobile ? null : 373"
              :height="$device.isMobile ? null : 253"
            />
            <SfHeading
              :title="$t('Your cart is empty')"
              :level="2"
              class="empty-cart__heading"
              :description="$t('Looks like you haven’t added any items to the bag yet. Start shopping to fill it in.')"
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade" type="transition">
          <div v-if="totalItems">
            <SfProperty
              :name="$t('Total price')"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice :regular="$currency(totals)" />
              </template>
            </SfProperty>
            <nuxt-link to="/checkout/personaldetails" :title="$t('Personal details')">
              <GreenButton
                class="mb-4"
                style-type="Primary"
                color="Green"
                shape="Round"
                size="Max"
                @click="toggleCartSidebar"
              >
                {{ $t('checkout') }}
              </GreenButton>
            </nuxt-link>
            <GreenButton
              style-type="Tertiary"
              color="Grey"
              shape="Round"
              size="Max"
              @click="toggleCartSidebar"
            >
              {{ $t('Go back shopping') }}
            </GreenButton>
          </div>
          <div v-else>
            <GreenButton
              style-type="Tertiary"
              color="Grey"
              shape="Round"
              size="Max"
              @click="toggleCartSidebar"
            >
              {{ $t('Go back shopping') }}
            </GreenButton>
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, watch, ref} from '@nuxtjs/composition-api';
import { SfHeading, SfImage, SfPrice, SfProperty, SfSidebar } from '@storefront-ui/vue';
import { useCart, useUser } from '@vue-storefront/odoo';
import { cartGetters, useUiState } from '~/composables';
import { GreenCart } from '~/green-api/types';
import { setTrackViewCart } from '~/resources/tracking';

declare let Clerk: any;

export default defineComponent({
  name: 'CartSidebar',
  components: {
    SfSidebar,
    SfHeading,
    SfProperty,
    SfPrice,
    SfImage
  },
  setup({}, { root }) {
    const { isCartSidebarOpen, toggleCartSidebar, hasNewProduct, resetHasNewProduct } = useUiState();
    const { cart, removeItem, updateItemQty } = useCart();
    const { isAuthenticated } = useUser();
    const list = ref(null);
    const items = computed(() => cartGetters.getItems(cart.value as GreenCart));
    const totals = computed(() => cartGetters.getTotals(cart.value).total);
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value as GreenCart));
    const accessories = computed(() => cartGetters.getAccessories(cart.value as GreenCart));

    const getAllProductIds = () => {
      const accessories = computed(() => cartGetters.getAccessories(cart.value as GreenCart));
      const items = computed(() => cartGetters.getItems(cart.value as GreenCart));

      return items.value?.concat(accessories.value).map((item) => item?.product?.id);
    };

    watch([items, accessories], () => {
      const productIds = getAllProductIds();

      Clerk('cart', 'set', productIds);
    });

    watch(list, () => {
      if (hasNewProduct.value && root.$nuxt.$device.isMobile) {
        const content = document.querySelector('.sf-sidebar__content');
        const elementList = document.getElementsByClassName('sf-collected-product collected-product');
        const offset = 355 * (elementList.length - 1);

        content.scrollTo({top: offset, behavior: 'smooth'});
        resetHasNewProduct();
      }

    });

    watch(isCartSidebarOpen, () => {
      const products = items.value?.map((item) => item.product);
      if (products?.length > 0 && isCartSidebarOpen.value) {
        setTrackViewCart(totals.value, {products: products, accessories: accessories.value, orderLines: cart.value.order.orderLines });
      }
    });

    return {
      list,
      isAuthenticated,
      items,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      toggleCartSidebar,
      accessories,
      totals,
      totalItems,
      cartGetters
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/cartSidebar.scss';
</style>
