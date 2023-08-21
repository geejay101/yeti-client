import api from '@/api';
import { RESOURCES, ORIGINATION_ACTIVE_CALLS } from '@/constants';
import utils from '@/utils';

const state = {
  timestamps: null,
  activeCalls: null,
};
const getters = {
  originationActiveCalls: (currentState) => [
    currentState.timestamps,
    currentState.activeCalls,
  ],
};
export const actions = {
  [ORIGINATION_ACTIVE_CALLS.ACTIONS.GET_ACTIVE_CALLS]: ({
    commit,
    rootState,
    rootGetters,
  }) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const { startDate, endDate } = rootState.timeRangeFilter.timeFilterValue;
      const { id } = rootGetters.activeAccount;
      const queryParams = utils.constructChartDataGetRequest({
        startDate,
        endDate,
        id,
      });

      const activeCalls = await api.apiInstance.findAllResources(
        RESOURCES.ORIGINATION_ACTIVE_CALLS,
        queryParams,
      );
      commit(ORIGINATION_ACTIVE_CALLS.MUTATIONS.SET_ACTIVE_CALLS, activeCalls);
    }),
};
export const mutations = {
  [ORIGINATION_ACTIVE_CALLS.MUTATIONS.SET_ACTIVE_CALLS]: (currentState, activeCalls) => {
    currentState.timestamps = activeCalls.data.t;
    currentState.activeCalls = activeCalls.data.calls;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
