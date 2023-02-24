/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const state = (): any => ({
  checkoutCart: {},
});

export const mutations = {
  setCheckoutCart(state, payload) {
    state.checkoutCart = payload;
  },
};

export const getters = {
  getCheckoutCart(state) {
    return state.checkoutCart;
  },
};
