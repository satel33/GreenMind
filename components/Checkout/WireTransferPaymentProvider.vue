<template>
  <div>Must implement WireTransferPaymentProvider</div>
</template>

<script>

export default {
  name: 'WireTransferPaymentProvider',
  emits: ['isPaymentReady'],
  setup (_, { emit }) {
    emit('isPaymentReady', false);
  }
};
</script>

<style lang="scss" scoped></style>
