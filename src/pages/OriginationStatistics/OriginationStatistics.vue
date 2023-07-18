<template>
  <div id="origination-statistics-page">
    <div
      class="action-bar"
    >
      <a-select
        :value="sampling"
        :options="samplingOptions"
        class="sampling-select"
        @change="handleSamplingChange"
      />
    </div>
    <data-chart
      :loading="requestIsPending"
      :chart-data="successfulCallsData"
      :chart-options="successfulCallsOptions"
    />
    <data-chart
      :loading="requestIsPending"
      :chart-data="failedCallsData"
      :chart-options="failedCallsOptions"
    />
    <data-chart
      :loading="requestIsPending"
      :chart-data="acdData"
      :chart-options="acdOptions"
    />
    <data-chart
      :loading="requestIsPending"
      :chart-data="asrData"
      :chart-options="asrOptions"
    />
    <data-chart
      :loading="requestIsPending"
      :chart-data="totalCallsData"
      :chart-options="totalCallsOptions"
    />
    <data-chart
      :loading="requestIsPending"
      :chart-data="totalDurationData"
      :chart-options="totalDurationOptions"
    />
    <data-chart
      :loading="requestIsPending"
      :chart-data="totalPriceData"
      :chart-options="totalPriceOptions"
    />
  </div>
</template>
<script>
import uPlot from 'uplot';
import { mapGetters, mapActions } from 'vuex';

import DataChart from '@/components/DataChart/DataChart.vue';
import { ORIGINATION_STATISTICS } from '@/constants';

import { COMMON_CHART_OPTIONS } from './constants';
import locale from './locale';

export default {
  name: 'OriginationStatisticsPage',
  i18n: locale,
  components: {
    DataChart,
  },
  emits: [
    'change',
  ],
  data() {
    return {
      samplingOptions: [
        {
          value: 'minute',
          label: locale.messages[this.$i18n.locale].message.minute,
        },
        {
          value: '5minutes',
          label: locale.messages[this.$i18n.locale].message.fiveMinutes,
        },
        {
          value: 'hour',
          label: locale.messages[this.$i18n.locale].message.hour,
        },
        {
          value: 'day',
          label: locale.messages[this.$i18n.locale].message.day,
        },
        {
          value: 'week',
          label: locale.messages[this.$i18n.locale].message.week,
        },
        {
          value: 'month',
          label: locale.messages[this.$i18n.locale].message.month,
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'requestIsPending',
      'activeAccount',
      'timestamps',
      'acd',
      'asr',
      'successfulCalls',
      'failedCalls',
      'totalCalls',
      'totalPrice',
      'totalDuration',
      'sampling',
    ]),
    successfulCallsOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: locale.messages[this.$i18n.locale].message.time,
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: locale.messages[this.$i18n.locale].message.successfulCalls,
            fill: '#5a935b',
            points: {
              show: false,
            },
            paths: uPlot.paths.bars(),
          },
        ],
      };
    },
    successfulCallsData() {
      return [
        this.timestamps,
        this.successfulCalls,
      ];
    },
    failedCallsOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: locale.messages[this.$i18n.locale].message.time,
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: locale.messages[this.$i18n.locale].message.failedCalls,
            fill: 'rgb(210 53 53)',
            paths: uPlot.paths.bars(),
          },
        ],
      };
    },
    failedCallsData() {
      return [
        this.timestamps,
        this.failedCalls,
      ];
    },
    acdOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: locale.messages[this.$i18n.locale].message.time,
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: locale.messages[this.$i18n.locale].message.acd,
            points: { show: false },
            fill: '#4343d1',
            paths: uPlot.paths.bars(),
          },
        ],
      };
    },
    acdData() {
      return [
        this.timestamps,
        this.acd,
      ];
    },
    asrOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: locale.messages[this.$i18n.locale].message.time,
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: locale.messages[this.$i18n.locale].message.asr,
            fill: 'orange',
            paths: uPlot.paths.bars(),
          },
        ],
      };
    },
    asrData() {
      return [
        this.timestamps,
        this.asr,
      ];
    },
    totalCallsOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: locale.messages[this.$i18n.locale].message.time,
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: locale.messages[this.$i18n.locale].message.totalCalls,
            fill: '#175446',
            paths: uPlot.paths.bars(),
          },
        ],
      };
    },
    totalCallsData() {
      return [
        this.timestamps,
        this.totalCalls,
      ];
    },
    totalDurationOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: locale.messages[this.$i18n.locale].message.time,
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: locale.messages[this.$i18n.locale].message.totalDuration,
            fill: '#3198c4',
            paths: uPlot.paths.bars(),
          },
        ],
      };
    },
    totalDurationData() {
      return [
        this.timestamps,
        this.totalDuration,
      ];
    },
    totalPriceOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: locale.messages[this.$i18n.locale].message.time,
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: locale.messages[this.$i18n.locale].message.totalPrice,
            fill: '#8a335c',
            paths: uPlot.paths.bars(),
          },
        ],
      };
    },
    totalPriceData() {
      return [
        this.timestamps,
        this.totalPrice,
      ];
    },
  },
  watch: {
    activeAccount() {
      this[ORIGINATION_STATISTICS.ACTIONS.GET_ORIGINATION_STATISTICS]();
    },
    sampling() {
      this[ORIGINATION_STATISTICS.ACTIONS.GET_ORIGINATION_STATISTICS]();
    },
  },
  created() {
    if (this.activeAccount) {
      this[ORIGINATION_STATISTICS.ACTIONS.GET_ORIGINATION_STATISTICS]();
    }
  },
  methods: {
    ...mapActions([
      ORIGINATION_STATISTICS.ACTIONS.GET_ORIGINATION_STATISTICS,
      ORIGINATION_STATISTICS.ACTIONS.SET_SAMPLING,
    ]),
    handleSamplingChange(sampling) {
      this[ORIGINATION_STATISTICS.ACTIONS.SET_SAMPLING](sampling);
    },
  },
};
</script>
<style lang="scss" scoped>
#origination-statistics-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding-bottom: 10px;

  .sampling-select {
    width: 130px;
  }

  .action-bar{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
</style>
