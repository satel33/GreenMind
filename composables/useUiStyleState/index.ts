import { sharedRef } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';

const useUiStyleState = (id: string): any => {
  const ssrKey = id || 'styleState';
  const active = sharedRef(false, ssrKey);

  const activeClass = computed(() => (active.value ? 'active show' : 'hide'));
  const activeCloseClass = computed(() => (active.value ? 'close' : ''));
  const activeStyle = computed(() => active.value ? { opacity: 1 } : { opacity: 0 });

  const toggleActive = (state: boolean = null, timeout = 0) => {
    active.value = state !== null ? state : !active.value;

    if (timeout) {
      setTimeout(() => {
        active.value = false;
      }, timeout);
    }
  };

  return {
    activeCloseClass,
    activeClass,
    activeStyle,
    active,
    toggleActive
  };
};

export default useUiStyleState;
