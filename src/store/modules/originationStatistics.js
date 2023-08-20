import api from '@/api';
import { RESOURCES, ORIGINATION_STATISTICS } from '@/constants';
import utils from '@/utils';

const state = {
  sampling: 'day',
  timestamps: null,
  acd: null,
  asr: null,
  failedCalls: null,
  successfulCalls: null,
  totalCalls: null,
  totalDuration: null,
  totalPrice: null,
  summaryAcd: '',
  summaryAsr: '',
  summaryFailedCalls: '',
  summarySuccessfulCalls: '',
  summaryTotalCalls: '',
  summaryTotalDuration: '',
  summaryTotalPrice: '',
};
const getters = {
  statisticsSampling: (currentState) => currentState.sampling,
  failedCalls: (currentState) => [
    currentState.timestamps,
    currentState.failedCalls,
  ],
  successfulCalls: (currentState) => [
    currentState.timestamps,
    currentState.successfulCalls,
  ],
  totalCalls: (currentState) => [
    currentState.timestamps,
    currentState.totalCalls,
  ],
  totalDuration: (currentState) => [
    currentState.timestamps,
    currentState.totalDuration,
  ],
  totalPrice: (currentState) => [
    currentState.timestamps,
    currentState.totalPrice,
  ],
  summary: (currentState) => ({
    acd: currentState.summaryAcd,
    asr: currentState.summaryAsr,
    failedCalls: currentState.summaryFailedCalls,
    successfulCalls: currentState.summarySuccessfulCalls,
    totalCalls: currentState.summaryTotalCalls,
    totalDuration: currentState.summaryTotalDuration,
    totalPrice: currentState.summaryTotalPrice,
  }),
};
export const actions = {
  [ORIGINATION_STATISTICS.ACTIONS.GET_ORIGINATION_STATISTICS]: ({
    commit,
    rootGetters,
    rootState,
    state: { sampling },
  }) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const { startDate, endDate } = rootState.timeRangeFilter.timeFilterValue;
      const { id } = rootGetters.activeAccount;
      const queryParams = utils.constructChartDataGetRequest({
        startDate,
        endDate,
        id,
        sampling,
      });

      const originationStatistics = await api.apiInstance.findAllResources(
        RESOURCES.ORIGINATION_STATISTICS,
        queryParams,
      );

      commit(ORIGINATION_STATISTICS.MUTATIONS.SET_ORIGINATION_STATISTICS, originationStatistics);
    }),
  [ORIGINATION_STATISTICS.ACTIONS.SET_SAMPLING]: ({ commit }, sampling) => {
    commit(ORIGINATION_STATISTICS.MUTATIONS.SET_SAMPLING, sampling);
  },
};
export const mutations = {
  [ORIGINATION_STATISTICS.MUTATIONS.SET_ORIGINATION_STATISTICS]: (
    currentState,
    originationStatistics,
  ) => {
    currentState.timestamps = originationStatistics.data.series.t;
    currentState.acd = originationStatistics.data.series.acd;
    currentState.asr = originationStatistics.data.series.asr;
    currentState.failedCalls = originationStatistics.data.series.failed_calls;
    currentState.successfulCalls = originationStatistics.data.series.successful_calls;
    currentState.totalCalls = originationStatistics.data.series.total_calls;
    currentState.totalDuration = originationStatistics.data.series.total_duration;
    currentState.totalPrice = originationStatistics.data.series.total_price;

    currentState.summaryAcd = originationStatistics.data.totals.acd;
    currentState.summaryAsr = originationStatistics.data.totals.asr;
    currentState.summaryFailedCalls = originationStatistics.data.totals.failed_calls;
    currentState.summarySuccessfulCalls = originationStatistics.data.totals.successful_calls;
    currentState.summaryTotalCalls = originationStatistics.data.totals.total_calls;
    currentState.summaryTotalDuration = originationStatistics.data.totals.total_duration;
    currentState.summaryTotalPrice = originationStatistics.data.totals.total_price;
  },
  [ORIGINATION_STATISTICS.MUTATIONS.SET_SAMPLING]: (currentState, sampling) => {
    currentState.sampling = sampling;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
