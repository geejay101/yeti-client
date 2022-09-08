import api from '@/api';
import { RESOURCES, INVOICES } from '@/constants';
import utils from '@/utils';

const state = {
  invoices: {},
};
const getters = {
  invoices: (currentState) => ({
    items: currentState.invoices.data, meta: currentState.invoices.meta,
  }),
};
export const actions = {
  [INVOICES.ACTIONS.GET_INVOICES]: ({ commit, rootGetters }, page) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const filter = {
        accountIdEq: rootGetters.activeAccount.id,
      };

      const invoices = await api.apiInstance.findAllResources(RESOURCES.INVOICES, {
        page,
        filter,
      });

      commit(INVOICES.MUTATIONS.SET_INVOICES, invoices);
    }),
};
export const mutations = {
  [INVOICES.MUTATIONS.SET_INVOICES]: (currentState, invoices) => {
    currentState.invoices = invoices;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
