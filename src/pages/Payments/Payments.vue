<template>
  <DataTableAnt
    :fields="tableFields"
    :items="formattedPayments"
    :rows="rows"
    :get-data="getPayments"
    :active-filters="paymentsFilter"
    :set-filter="setPaymentsFilter"
    filterable
  />
</template>

<script>
import { flow, get } from 'lodash-es';
import { mapGetters, mapActions } from 'vuex';

import utils from '@/utils';
import { PAYMENTS } from '@/constants';
import DataTableAnt from '@/components/DataTableAnt/DataTableAnt.vue';

import { TABLE_HEADERS_ANT } from './constants';
import locale from './locale';

export default {
  name: 'PaymentsPage',
  components: {
    DataTableAnt,
  },
  computed: {
    ...mapGetters(['activeAccount', 'payments', 'paymentsFilter']),
    formattedPayments() {
      return flow(utils.formatPayments)(this.payments.items);
    },
    rows() {
      return get(this.payments, ['meta', 'total-count'], 0);
    },
    tableFields() {
      return TABLE_HEADERS_ANT.map((header) => (
        {
          ...header,
          title: locale.messages[this.$i18n.locale].tableMessage[header.key],
        }
      ));
    },
  },
  watch: {
    activeAccount() {
      this[PAYMENTS.ACTIONS.GET_PAYMENTS]();
    },
  },
  created() {
    if (this.activeAccount) {
      this[PAYMENTS.ACTIONS.GET_PAYMENTS]();
    }
  },
  methods: {
    ...mapActions([PAYMENTS.ACTIONS.GET_PAYMENTS, PAYMENTS.ACTIONS.SET_PAYMENTS_FILTER]),
  },
};
</script>
