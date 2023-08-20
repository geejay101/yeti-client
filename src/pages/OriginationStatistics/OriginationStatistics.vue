<template>
  <div id="origination-statistics-page">
    <a-card
      class="totals-bar"
    >
      <a-row justify="space-between">
        <a-col
          v-for="(stat, title) in summary"
          :key="title"
        >
          <a-statistic
            :title="$t(`message.${title}`)"
            :precision="calculateSummaryPresicion(stat)"
            :suffix="$t(`units.${title}`)"
            :value="stat"
            group-separator=" "
          />
        </a-col>
      </a-row>
    </a-card>
    <a-card
      :loading="requestIsPending"
    >
      <data-chart
        :chart-data="originationActiveCalls"
        :chart-options="activeCallsOptions"
      />
    </a-card>
    <a-card
      :loading="requestIsPending"
    >
      <a-select
        :value="statisticsSampling"
        :options="statisticsSamplingOptions"
        class="sampling-select"
        @change="handleStatisticsSamplingChange"
      />
      <data-chart
        :chart-data="successfulCalls"
        :chart-options="successfulCallsOptions"
      />
      <data-chart
        :chart-data="failedCalls"
        :chart-options="failedCallsOptions"
      />
      <data-chart
        :chart-data="totalCalls"
        :chart-options="totalCallsOptions"
      />
      <data-chart
        :chart-data="totalDuration"
        :chart-options="totalDurationOptions"
      />
      <data-chart
        :chart-data="totalPrice"
        :chart-options="totalPriceOptions"
      />
    </a-card>
    <a-card>
      <a-select
        :value="qualitySampling"
        :options="qualitySamplingOptions"
        class="sampling-select"
        @change="handleQualitySamplingChange"
      />
      <data-chart
        :loading="requestIsPending"
        :chart-data="acd"
        :chart-options="acdOptions"
      />
      <data-chart
        :loading="requestIsPending"
        :chart-data="asr"
        :chart-options="asrOptions"
      />
    </a-card>
  </div>
</template>
<script>
import uPlot from 'uplot';
import { mapGetters, mapActions } from 'vuex';

import DataChart from '@/components/DataChart/DataChart.vue';
import {
  ORIGINATION_STATISTICS,
  ORIGINATION_ACTIVE_CALLS,
  ORIGINATION_STATISTICS_QUALITY,
} from '@/constants';

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
      statisticsSamplingOptions: [
        {
          value: 'minute',
          label: this.$t('message.minute'),
        },
        {
          value: '5minutes',
          label: this.$t('message.fiveMinutes'),
        },
        {
          value: 'hour',
          label: this.$t('message.hour'),
        },
        {
          value: 'day',
          label: this.$t('message.day'),
        },
        {
          value: 'week',
          label: this.$t('message.week'),
        },
        {
          value: 'month',
          label: this.$t('message.month'),
        },
      ],
      qualitySamplingOptions: [
        {
          value: 'minute',
          label: this.$t('message.minute'),
        },
        {
          value: '5minutes',
          label: this.$t('message.fiveMinutes'),
        },
        {
          value: '15minutes',
          label: this.$t('message.fifteenMinutes'),
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'requestIsPending',
      'activeAccount',
      'originationActiveCalls',
      'acd',
      'asr',
      'successfulCalls',
      'failedCalls',
      'totalCalls',
      'totalPrice',
      'totalDuration',
      'qualitySampling',
      'statisticsSampling',
      'summary',
    ]),
    activeCallsOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: this.$t('message.time'),
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: this.$t('message.activeCalls'),
            fill: '#409495',
          },
        ],
      };
    },
    successfulCallsOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: this.$t('message.time'),
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: this.$t('message.successfulCalls'),
            fill: '#5a935b',
            paths: uPlot.paths.bars(),
            points: {
              fill: '#5a935b',
            },
          },
        ],
      };
    },
    failedCallsOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: this.$t('message.time'),
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: this.$t('message.failedCalls'),
            fill: 'rgb(210 53 53)',
            paths: uPlot.paths.bars(),
            points: {
              fill: 'rgb(210 53 53)',
            },
          },
        ],
      };
    },
    acdOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: this.$t('message.time'),
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: `${this.$t('message.acd')}, ${this.$t('units.acd')}`,
            fill: '#4343d1',
            points: {
              fill: '#4343d1',
            },
          },
        ],
      };
    },
    asrOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: this.$t('message.time'),
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: `${this.$t('message.asr')}, ${this.$t('units.asr')}`,
            fill: 'orange',
            points: {
              fill: 'orange',
            },
          },
        ],
      };
    },
    totalCallsOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: this.$t('message.time'),
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: this.$t('message.totalCalls'),
            fill: '#175446',
            paths: uPlot.paths.bars(),
            points: {
              fill: '#175446',
            },
          },
        ],
      };
    },
    totalDurationOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: this.$t('message.time'),
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: `${this.$t('message.totalDuration')}, ${this.$t('units.acd')}`,
            fill: '#3198c4',
            paths: uPlot.paths.bars(),
            points: {
              fill: '#3198c4',
            },
          },
        ],
      };
    },
    totalPriceOptions() {
      return {
        ...COMMON_CHART_OPTIONS,
        series: [
          {
            label: this.$t('message.time'),
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: this.$t('message.totalPrice'),
            fill: '#8a335c',
            paths: uPlot.paths.bars(),
            points: {
              fill: '#8a335c',
            },
          },
        ],
      };
    },
  },
  watch: {
    activeAccount() {
      this.getData();
    },
    statisticsSampling() {
      this[ORIGINATION_STATISTICS.ACTIONS.GET_ORIGINATION_STATISTICS]();
    },
    qualitySampling() {
      this[ORIGINATION_STATISTICS_QUALITY.ACTIONS.GET_ORIGINATION_STATISTICS_QUALITY]();
    },
  },
  created() {
    if (this.activeAccount) {
      this.getData();
    }
  },
  methods: {
    ...mapActions([
      ORIGINATION_STATISTICS.ACTIONS.GET_ORIGINATION_STATISTICS,
      ORIGINATION_STATISTICS.ACTIONS.SET_SAMPLING,
      ORIGINATION_STATISTICS_QUALITY.ACTIONS.GET_ORIGINATION_STATISTICS_QUALITY,
      ORIGINATION_STATISTICS_QUALITY.ACTIONS.SET_SAMPLING,
      ORIGINATION_ACTIVE_CALLS.ACTIONS.GET_ACTIVE_CALLS,
    ]),
    handleStatisticsSamplingChange(sampling) {
      this[ORIGINATION_STATISTICS.ACTIONS.SET_SAMPLING](sampling);
    },
    handleQualitySamplingChange(sampling) {
      this[ORIGINATION_STATISTICS_QUALITY.ACTIONS.SET_SAMPLING](sampling);
    },
    calculateSummaryPresicion(data) {
      return Number.isInteger(data) ? 0 : 2;
    },
    getData() {
      this[ORIGINATION_STATISTICS.ACTIONS.GET_ORIGINATION_STATISTICS]();
      this[ORIGINATION_ACTIVE_CALLS.ACTIONS.GET_ACTIVE_CALLS]();
      this[ORIGINATION_STATISTICS_QUALITY.ACTIONS.GET_ORIGINATION_STATISTICS_QUALITY]();
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

  .action-bar {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .totals-bar {
    width: 100%;
  }
}
</style>
