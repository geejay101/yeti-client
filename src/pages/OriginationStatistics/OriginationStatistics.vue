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
      <a-card
        class="totals-bar"
      >
      <a-row justify="space-between">
        <a-col
          v-for="(stat, title) in summary" :key="title"
        >
        <a-statistic
          :title="$t(`message.${title}`)"
          :precision="2"
          group-separator=" "
          :suffix="$t(`units.${title}`)"
          :value="stat"
        />
        </a-col>
      </a-row>
    </a-card>
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
      'summary',
    ]),
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
            label: this.$t('message.time'),
            value: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
          },
          {
            label: `${this.$t('message.asr')}, ${this.$t('units.asr')}`,
            fill: 'orange',
            paths: uPlot.paths.bars(),
            points: {
              fill: 'orange',
            },
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
