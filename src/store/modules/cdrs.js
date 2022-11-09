import api from '@/api';
import { RESOURCES, CDRS } from '@/constants';
import utils from '@/utils';

const state = {
  cdrs: {},
  cdrFilter: {},
};
const getters = {
  cdrs: (currentState) => ({
    items: currentState.cdrs.data, meta: currentState.cdrs.meta,
  }),
  cdrFilter: (currentState) => currentState.cdrFilter,
};
export const actions = {
  [CDRS.ACTIONS.GET_CDRS]: ({
    commit,
    state: localState,
    rootState,
    rootGetters,
  }, page) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const cdrFilter = utils.constructFilter(localState.cdrFilter);

      const filter = {
        accountIdEq: rootGetters.activeAccount.id,
        timeStartGteq: rootState.timeRangeFilter.timeFilterValue.startDate,
        timeStartLteq: rootState.timeRangeFilter.timeFilterValue.endDate,
        ...cdrFilter,
      };

      const cdrs = await api.apiInstance.findAllResources(RESOURCES.CDR, {
        filter,
        page,
      });

      commit(CDRS.MUTATIONS.SET_CDRS, cdrs);
    }),
  [CDRS.ACTIONS.SET_CDRS_FILTER]: ({ commit, dispatch }, filter) => {
    if (filter) {
      commit(CDRS.MUTATIONS.SAVE_CDRS_FILTER, filter);
      dispatch(CDRS.ACTIONS.GET_CDRS, 1);
    }
  },
};
export const mutations = {
  [CDRS.MUTATIONS.SET_CDRS]: (currentState, cdrs) => {
    currentState.cdrs = cdrs;
  },

  [CDRS.MUTATIONS.SAVE_CDRS_FILTER]: (currentState, filter) => {
    currentState.cdrFilter = filter;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
