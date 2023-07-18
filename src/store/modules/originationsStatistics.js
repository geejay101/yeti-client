import api from '@/api';
import { RESOURCES, ORIGINATION_STATISTICS } from '@/constants';
import utils from '@/utils';

const state = {
  sampling: 'hour',
  timestamps: null,
  acd: null,
  asr: null,
  failedCalls: null,
  successfulCalls: null,
  totalCalls: null,
  totalDuration: null,
  totalPrice: null,
};
const getters = {
  sampling: (currentState) => currentState.sampling,
  timestamps: (currentState) => currentState.timestamps,
  acd: (currentState) => currentState.acd,
  asr: (currentState) => currentState.asr,
  failedCalls: (currentState) => currentState.failedCalls,
  successfulCalls: (currentState) => currentState.successfulCalls,
  totalCalls: (currentState) => currentState.totalCalls,
  totalDuration: (currentState) => currentState.totalDuration,
  totalPrice: (currentState) => currentState.totalPrice,
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
    currentState.originationStatistics = originationStatistics.data;
    currentState.timestamps = originationStatistics.data.t;
    currentState.acd = originationStatistics.data.acd;
    currentState.asr = originationStatistics.data.asr;
    currentState.failedCalls = originationStatistics.data.failed_calls;
    currentState.successfulCalls = originationStatistics.data.successful_calls;
    currentState.totalCalls = originationStatistics.data.total_calls;
    currentState.totalDuration = originationStatistics.data.total_duration;
    currentState.totalPrice = originationStatistics.data.total_price;
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
