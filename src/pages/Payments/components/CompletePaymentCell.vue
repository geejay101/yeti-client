<template>
  <a-button
    color="blue"
    size="small"
    type="link"
    @click="handleCompletePayment"
  >
    {{ $t('tableMessage.completePayment') }}
  </a-button>
</template>
<script>
import { mapActions } from 'vuex';
import { PAYMENTS } from '@/constants';
import locale from '../locale';

export default {
  name: 'CompletePaymentCell',
  i18n: locale,
  props: {
    paymentId: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions([PAYMENTS.ACTIONS.GET_CRYPTOMUS_PAYMENT]),
    async handleCompletePayment() {
      await this[PAYMENTS.ACTIONS.GET_CRYPTOMUS_PAYMENT](this.paymentId);
    },
  },
};
</script>
