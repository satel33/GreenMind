<template>
  <div>
    <SfHeader class="sf-header--has-mobile-search">
      <template #logo />
      <template #search>
        <div />
      </template>
      <template #navigation>
        <div v-show="!mobileOrTabletSize" class="">
          <nuxt-link
            class="flex"
            to="/"
            :title="$t('Go back to shop')"
          >
            <SfIcon
              class="sf-header__icon mr-3"
              size="1.25rem"
              icon="chevron_left"
            />
            {{ $t("Go back to shop") }}
          </nuxt-link>
        </div>

        <GreenLogo />

        <div class="sf-header__icons">
          <img :src="require('/assets/images/checkout/lock.svg')" alt="Lock">
          <span class="secure-payment ml-5">{{ $t("Secure Payment") }}</span>
        </div>
      </template>
      <template #header-icons>
        <div />
      </template>
    </SfHeader>
  </div>
</template>

<script>
import { SfHeader, SfIcon, SfImage } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { useCart, useUser } from '@vue-storefront/odoo';
import { useUiState } from '~/composables';
import { computed } from '@nuxtjs/composition-api';

export default {
  components: {
    SfHeader,
    SfImage,
    SfIcon
  },
  setup(props, { root }) {
    useUiState();
    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);

    const { load: loadUser } = useUser();

    onSSR(async () => {
      await Promise.all([loadUser()]);
    });

    return {
      mobileOrTabletSize
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/greenHeader.scss";

::v-deep .sf-header__actions,
::v-deep .sf-header__navigation {
  display: flex !important;
  justify-content: space-between;
}
::v-deep .sf-header__navigation {
  width: 100%;
  @media (max-width: 1024px) {
    margin: var(--header-navigation-margin, 0 calc(var(--spacer-sm) * -1));
  }
}
.secure-payment {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  align-self: center;
}
</style>
