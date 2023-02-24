<template>
  <div class="my-account">
    <SfContentPages
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile" data-testid="my-profile">
          <MyAccountProfile />
        </SfContentPage>

        <SfContentPage
          title="Shipping & Payment Details"
          data-testid="shipping-details"
        >
          <SfTabs
            key="edit-address"
            :open-tab="1"
            class="tab-orphan"
            data-testid="shipping-details-tabs"
          >
            <SfTab v-if="state === 'edit'" title="Edit Address">
              <MyAccountShippingAddressForm
                :address="addressToUpdate"
                :is-new="!addressToUpdate.id"
                @cancel="handleCancelEditing"
                @save="handleSaveAddress"
              />
            </SfTab>

            <SfTab v-if="state === 'list'" title="Shipping Addresses">
              <MyAccountShippingList
                key="shipping-list"
                :addresses="addressList"
                @change="handleChangeAddress"
              />

              <GreenButton
                class="action-button"
                style-type="Primary"
                color="Green"
                size="Medium"
                @click="handleAddNewAddress"
              >
                {{ $t('Add New Address') }}
              </GreenButton>
            </SfTab>
          </SfTabs>
        </SfContentPage>

        <SfContentPage title="Newsletter">
          <MyAccountNewsletterForm />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory title="Order details">
        <SfContentPage title="Order history">
          <MyAccountOrderHistory />
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>

<script lang="ts">
import { SfContentPages, SfTabs } from '@storefront-ui/vue';
import { ref, computed, defineComponent } from '@nuxtjs/composition-api';
import { useUser, useUserShipping } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';
import { useUiNotification } from '~/composables';
import { useRouter } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'MyAccount',
  components: {
    SfContentPages, SfTabs
  },
  setup(props, { root }) {
    const activePage = ref('My profile');
    const state = ref('list');
    const addressToUpdate = ref({});
    const shippingDetails = ref(null);
    const router = useRouter();
    const { user, load: loadUser, logout, isAuthenticated } = useUser();
    const { shipping, load, addAddress, updateAddress } = useUserShipping();
    const { send } = useUiNotification();

    if (!isAuthenticated.value) {
      router.push('/');
    }

    onSSR(async () => {
      await loadUser();
      await load();
    });

    const account = computed(() => ({
      firstName: user?.value?.name?.split(' ')?.[0] || '',
      lastName:
        user?.value?.name?.split(' ')[
          user?.value?.name?.split(' ')?.length - 1
        ] || '',
      email: user?.value?.email || '',
      password: '',
      city: '',
      shipping: shipping?.value,
      orders: []
    }));

    const handleCancelEditing = () => {
      state.value = 'list';
    };

    const handleAddNewAddress = () => {
      addressToUpdate.value = {};
      state.value = 'edit';
    };

    const handleSaveAddress = async () => {
      send({
        message: 'Succefully saved!',
        type: 'success'
      });
      handleCancelEditing();
      await load();
    };

    const handleChangeAddress = (shipping) => {
      addressToUpdate.value = shipping;
      state.value = 'edit';
    };

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        send({
          message: 'You are logged out. We hope you come back soon mate!',
          type: 'info'
        });

        root.$router.push('/');
        await logout();

        return;
      }

      activePage.value = title;
    };

    const addressList = computed(() => shipping.value?.length > 0 ? shipping.value : []);

    return {
      addressList,
      handleAddNewAddress,
      handleChangeAddress,
      handleSaveAddress,
      handleCancelEditing,
      shippingDetails,
      addAddress,
      updateAddress,
      activePage,
      account,
      shipping,
      changeActivePage,
      addressToUpdate,
      state
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/account/myProfile.scss';
</style>
