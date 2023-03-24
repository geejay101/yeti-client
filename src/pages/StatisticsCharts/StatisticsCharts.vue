<template>
  <div>
    <data-chart
      v-if="!requestIsPending"
      :chart-data="activeCallsData"
      :chart-options="chartOptions"
    />
    <data-chart
      v-if="!requestIsPending"
      :chart-data="originatedCpsData"
      :chart-options="chartOptions"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { set } from 'lodash';

import DataChart from '@/components/DataChart/DataChart.vue';
import { STATISTICS } from '@/constants';

import { CHART_OPTIONS, INITIAL_DATASETS_SETTINGS } from './constants';
import locale from './locale';

export default {
  name: 'StatisticsCharts',
  i18n: locale,
  components: {
    DataChart,
  },
  data() {
    return {
      chartOptions: set(CHART_OPTIONS, 'scales.x.title.text', locale.messages[this.$i18n.locale].message.time),
      chart: undefined,
    };
  },
  computed: {
    ...mapGetters(['requestIsPending', 'activeAccount', 'activeCalls', 'originatedCps']),
    derivedCharData() {
      if (this.activeCalls && this.originatedCps) {
        const chartsData = { ...this.activeCalls, ...this.originatedCps };
        return Object.entries(INITIAL_DATASETS_SETTINGS).reduce((acc, [key, value]) => {
          acc[key] = {
            ...value,
            label: locale.messages[this.$i18n.locale].message[key],
            data: chartsData[key].map(({ x, y }) => ({ y, x: Date.parse(x) })),
          };
          return acc;
        }, {});
      }
      return { cps: { data: [] }, activeCalls: { data: [] }, originatedCps: { data: [] } };
    },
    originatedCpsData() {
      return { datasets: [this.derivedCharData.cps] };
    },
    activeCallsData() {
      return { datasets: Object.entries(this.derivedCharData).filter(([key]) => key !== 'cps').map(([, value]) => value) };
    },
  },
  watch: {
    activeAccount() {
      this[STATISTICS.ACTIONS.GET_STATISTICS]();
    },
  },
  created() {
    if (this.activeAccount) {
      this[STATISTICS.ACTIONS.GET_STATISTICS]();
    }
  },
  methods: {
    ...mapActions([STATISTICS.ACTIONS.GET_STATISTICS]),
  },
};
</script>
