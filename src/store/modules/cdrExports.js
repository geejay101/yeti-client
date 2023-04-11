import api from '@/api';
import { RESOURCES, CDR_EXPORTS } from '@/constants';
import utils from '@/utils';

const state = {
  cdrExports: {},
  cdrExportsFilter: {},
};
const getters = {
  cdrExports: (currentState) => ({
    items: currentState.cdrExports.data, meta: currentState.cdrExports.meta,
  }),
  cdrExportsFilter: (currentState) => currentState.cdrExportsFilter,
};
export const actions = {
  [CDR_EXPORTS.ACTIONS.GET_CDR_EXPORTS]: ({
    commit,
    state: localState,
  }, page) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const cdrExportsFilter = utils.constructFilter(localState.cdrExportsFilter);

      const cdrExports = await api.apiInstance.findAllResources(RESOURCES.CDR_EXPORTS, {
        page,
        filter: { ...cdrExportsFilter },
      });

      commit(CDR_EXPORTS.MUTATIONS.SET_CDR_EXPORTS, cdrExports);
    }),
  [CDR_EXPORTS.ACTIONS.SET_CDR_EXPORTS_FILTER]: ({ commit, dispatch }, filter) => {
    if (filter) {
      commit(CDR_EXPORTS.MUTATIONS.SAVE_CDR_EXPORTS_FILTER, filter);
      dispatch(CDR_EXPORTS.ACTIONS.GET_CDR_EXPORTS, 1);
    }
  },
};
export const mutations = {
  [CDR_EXPORTS.MUTATIONS.SET_CDR_EXPORTS]: (currentState, cdrExports) => {
    currentState.cdrExports = cdrExports;
  },
  [CDR_EXPORTS.MUTATIONS.SAVE_CDR_EXPORTS_FILTER]: (currentState, filter) => {
    currentState.cdrExportsFilter = filter;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
