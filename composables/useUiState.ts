import { reactive, computed } from '@nuxtjs/composition-api';

const state = reactive({
  isOverlayOpen: false,
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isStoreModalOpen: false,
  isNewsletterModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  isMobileMenuOpen: false,
  isHamburguerMenuOpen: false,
  isSearchOpen: false,
  addedNewProduct: false,
  mobileSubMenu: {}
});

const useUiState = () => {
  const isOverlayOpen = computed(() => state.isOverlayOpen);

  const toggleOverlay = (flag?: boolean) => {
    if (typeof flag === 'boolean') {
      state.isOverlayOpen = flag;
      return;
    }
    state.isOverlayOpen = !state.isOverlayOpen;
  };

  const isMobileMenuOpen = computed(() => state.isMobileMenuOpen);
  const statusMobileSubMenu = computed(() => state.mobileSubMenu);
  const closeAllMobileSubMenu = () => {
    Object.keys(state.mobileSubMenu).forEach(item => state.mobileSubMenu[item] = false);
  };
  const toggleMobileMenu = () => {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    if (!state.isMobileMenuOpen) {
      closeAllMobileSubMenu();
    }
  };

  const toggleMobileSubMenu = (name: string) => {
    state.mobileSubMenu[name] = !state.mobileSubMenu[name];
  };

  const isSearchOpen = computed(() => state.isSearchOpen);
  const toggleSearch = () => {
    state.isSearchOpen = !state.isSearchOpen;
  };

  const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
  const hasNewProduct = computed(() => state.addedNewProduct);
  const toggleCartSidebar = (addedNewProduct: boolean) => {
    state.addedNewProduct = addedNewProduct;
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
  };
  const resetHasNewProduct = () => {
    state.addedNewProduct = false;
  };

  const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen);
  const toggleWishlistSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
  };

  const isLoginModalOpen = computed(() => state.isLoginModalOpen);
  const toggleLoginModal = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isLoginModalOpen = !state.isLoginModalOpen;
  };

  const isStoreModalOpen = computed(() => state.isStoreModalOpen);
  const toggleStoreModal = () =>{
    if (state.isStoreModalOpen) toggleMobileMenu();
    state.isStoreModalOpen = ! state.isStoreModalOpen;
  };

  const isNewsletterModalOpen = computed(() => state.isNewsletterModalOpen);
  const toggleNewsletterModal = () => {
    state.isNewsletterModalOpen = !state.isNewsletterModalOpen;
  };

  const isCategoryGridView = computed(() => state.isCategoryGridView);
  const changeToCategoryGridView = () => {
    state.isCategoryGridView = true;
  };
  const changeToCategoryListView = () => {
    state.isCategoryGridView = false;
  };

  const isFilterSidebarOpen = computed(() => state.isFilterSidebarOpen);
  const toggleFilterSidebar = () => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
  };

  const isHamburguerMenuOpen = computed(() => state.isHamburguerMenuOpen);
  const toggleHamburguerMenu = () => {
    state.isHamburguerMenuOpen = !state.isHamburguerMenuOpen;
  };
  const loginHamburguer = () => {
    state.isHamburguerMenuOpen = !state.isHamburguerMenuOpen;
    state.isLoginModalOpen = !state.isLoginModalOpen;
  };

  return {
    isCartSidebarOpen,
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isStoreModalOpen,
    isNewsletterModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    isMobileMenuOpen,
    isHamburguerMenuOpen,
    isOverlayOpen,
    isSearchOpen,
    hasNewProduct,
    statusMobileSubMenu,
    mobileSubMenu: state.mobileSubMenu,

    closeAllMobileSubMenu,
    toggleCartSidebar,
    toggleWishlistSidebar,
    toggleLoginModal,
    toggleStoreModal,
    toggleNewsletterModal,
    toggleOverlay,
    toggleSearch,
    toggleMobileSubMenu,
    toggleFilterSidebar,
    toggleMobileMenu,
    toggleHamburguerMenu,
    changeToCategoryGridView,
    changeToCategoryListView,
    resetHasNewProduct,
    loginHamburguer
  };
};

export default useUiState;
