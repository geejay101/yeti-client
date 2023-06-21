<template>
  <DataTableAnt
    :fields="tableFields"
    :items="formattedInvoices"
    :rows="rows"
    :get-data="getInvoices"
  />
</template>

<script>
import { get, flow } from 'lodash-es';
import { mapGetters, mapActions } from 'vuex';
import { INVOICES } from '@/constants';
import utils from '@/utils';
import DataTableAnt from '@/components/DataTableAnt/DataTableAnt.vue';
import { TABLE_HEADERS_ANT } from './constants.jsx';
import locale from './locale';

export default {
  name: 'InvoicesPage',
  components: {
    DataTableAnt,
  },
  computed: {
    ...mapGetters(['activeAccount', 'invoices']),
    formattedInvoices() {
      return flow(utils.formatInvoices)(this.invoices.items);
    },
    rows() {
      return get(this.invoices, ['meta', 'total-count'], 0);
    },
    tableFields() {
      return TABLE_HEADERS_ANT.map((header) => (
        {
          ...header,
          title: locale.messages[this.$i18n.locale].tableMessage[header.key],
          customRender: header.customRender && header.customRender.bind(this),
        }
      ));
    },
  },
  watch: {
    activeAccount() {
      this[INVOICES.ACTIONS.GET_INVOICES]();
    },
  },
  created() {
    if (this.activeAccount) {
      this[INVOICES.ACTIONS.GET_INVOICES]();
    }
  },
  methods: {
    ...mapActions([INVOICES.ACTIONS.GET_INVOICES]),
  },
};
</script>
