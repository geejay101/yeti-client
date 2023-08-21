import api from '@/api';
import { RESOURCES, ORIGINATION_STATISTICS_QUALITY } from '@/constants';
import utils from '@/utils';

const state = {
  timestamps: null,
  sampling: '5minutes',
  asr: null,
  acd: null,
  cps: null,
};
const getters = {
  asr: (currentState) => [
    currentState.timestamps,
    currentState.asr,
  ],
  acd: (currentState) => [
    currentState.timestamps,
    currentState.acd,
  ],
  cps: (currentState) => [
    currentState.timestamps,
    currentState.cps,
  ],
  qualitySampling: (currentState) => currentState.sampling,
};
export const actions = {
  [ORIGINATION_STATISTICS_QUALITY.ACTIONS.GET_ORIGINATION_STATISTICS_QUALITY]: ({
    commit,
    rootState,
    rootGetters,
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

      const qualityStatistics = await api.apiInstance.findAllResources(
        RESOURCES.ORIGINATION_STATISTICS_QUALITY,
        queryParams,
      );

      commit(
        ORIGINATION_STATISTICS_QUALITY.MUTATIONS.SET_ORIGINATION_STATISTICS_QUALITY,
        qualityStatistics,
      );
    }),
  [ORIGINATION_STATISTICS_QUALITY.ACTIONS.SET_SAMPLING]: ({ commit }, sampling) => {
    commit(ORIGINATION_STATISTICS_QUALITY.MUTATIONS.SET_SAMPLING, sampling);
  },
};
export const mutations = {
  [ORIGINATION_STATISTICS_QUALITY.MUTATIONS.SET_ORIGINATION_STATISTICS_QUALITY]:
    (currentState, qualityStatistics) => {
      currentState.timestamps = qualityStatistics.data.series.t;
      currentState.asr = qualityStatistics.data.series.asr;
      currentState.acd = qualityStatistics.data.series.acd;
      currentState.cps = qualityStatistics.data.series.cps;
    },
  [ORIGINATION_STATISTICS_QUALITY.MUTATIONS.SET_SAMPLING]: (currentState, sampling) => {
    currentState.sampling = sampling;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
