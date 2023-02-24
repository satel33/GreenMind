import currency from 'currency.js';
import { Plugin } from '@nuxt/types';
declare module 'vue/types/vue' {
  interface Vue {
    $currency(value: number | string): string
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $currency(value: number | string): string
  }
  interface Context {
    $currency(value: number | string): string
  }
}
const dkkCustomCurrency: Plugin = (context, inject) => {
  inject('currency', (value: number | string) => {
    return `${currency(value, { separator: '.', symbol: '', decimal: '.', precision: 0}).format()},-`;
  });
};

export default dkkCustomCurrency;
