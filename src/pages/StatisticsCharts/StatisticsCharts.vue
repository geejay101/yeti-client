<template>
  <div id="statistics-charts-page">
    <data-chart
      :loading="requestIsPending"
      :chart-data="activeCallsData"
      :chart-options="activeCallsOptions"
    />
    <data-chart
      :loading="requestIsPending"
      :chart-data="originatedCpsData"
      :chart-options="originatedCpsOptions"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import DataChart from '@/components/DataChart/DataChart.vue';
import { STATISTICS } from '@/constants';

import { COMMON_CHART_OPTIONS } from './constants';
import locale from './locale';

export default {
  name: 'StatisticsCharts',
  i18n: locale,
  components: {
    DataChart,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['requestIsPending', 'activeAccount', 'activeCalls', 'originatedCps']),
    originatedCpsOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: locale.messages[this.$i18n.locale].message.time,
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: locale.messages[this.$i18n.locale].message.cps,
            points: { show: false },
            fill: 'orange',
          },
        ],
      };
    },
    originatedCpsData() {
      const xValues = this.originatedCps.cps.map(({ x }) => Date.parse(x) / 1000);
      const yValues1 = this.originatedCps.cps.map(({ y }) => y);

      return [
        xValues,
        yValues1,
      ];
    },
    activeCallsOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: locale.messages[this.$i18n.locale].message.time,
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: locale.messages[this.$i18n.locale].message.originatedCalls,
            points: { show: false },
            fill: 'lightgreen',
          },
          {
            label: locale.messages[this.$i18n.locale].message.terminatedCalls,
            points: { show: false },
            fill: 'lightblue',
          },
        ],
      };
    },
    activeCallsData() {
      const xValues = this.activeCalls.originatedCalls.map(({ x }) => Date.parse(x) / 1000);
      const yValues1 = this.activeCalls.originatedCalls.map(({ y }) => y);
      const yValues2 = this.activeCalls.terminatedCalls.map(({ y }) => y);

      return [
        xValues,
        yValues1,
        yValues2,
      ];
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
<style scoped>
#statistics-charts-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
