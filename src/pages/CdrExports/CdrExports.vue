<template>
  <div class="cdr-exports-page">
    <CdrExportCreateModal />
    <DataTableAnt
      :fields="tableFields"
      :items="formattedCdrExports"
      :rows="rows"
      :get-data="getCdrExports"
      :active-filters="cdrExportsFilter"
      :set-filter="setCdrExportsFilter"
      filterable
    />
  </div>
</template>

<script>
import { get, flow } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import utils from '@/utils';

import { CDR_EXPORTS } from '@/constants';
import DataTableAnt from '@/components/DataTableAnt/DataTableAnt.vue';
import CdrExportCreateModal from './components/CdrExportCreateModal.vue';

import { TABLE_HEADERS_ANT } from './constants.jsx';
import locale from './locale';

export default {
  name: 'CdrExportsPage',
  components: {
    DataTableAnt,
    CdrExportCreateModal,
  },
  data() {
    return {
      pollInteval: 0,
    };
  },
  computed: {
    ...mapGetters(['activeAccount', 'cdrExports', 'cdrExportsFilter']),
    formattedCdrExports() {
      return flow(utils.formatCdrExports)(this.cdrExports.items);
    },
    rows() {
      return get(this.cdrExports, ['meta', 'total-count'], 0);
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
      this[CDR_EXPORTS.ACTIONS.GET_CDR_EXPORTS]();
    },
  },
  created() {
    if (this.activeAccount) {
      this[CDR_EXPORTS.ACTIONS.GET_CDR_EXPORTS]();

      this.pollInteval = setInterval(() => this[CDR_EXPORTS.ACTIONS.GET_CDR_EXPORTS](), 30 * 1000);
    }
  },
  beforeUnmount() {
    clearInterval(this.pollInteval);
  },
  methods: {
    ...mapActions([CDR_EXPORTS.ACTIONS.GET_CDR_EXPORTS,
      CDR_EXPORTS.ACTIONS.SET_CDR_EXPORTS_FILTER]),
  },
};
</script>

<style>
.cdr-exports-page {
  position: relative;
}
</style>
