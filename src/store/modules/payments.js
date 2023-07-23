import api from '@/api';
import { RESOURCES, PAYMENTS } from '@/constants';
import utils from '@/utils';

const state = {
  payments: {},
  paymentsFilter: {},
};
const getters = {
  payments: (currentState) => ({
    items: currentState.payments.data, meta: currentState.payments.meta,
  }),
  paymentsFilter: (currentState) => currentState.paymentsFilter,
};
export const actions = {
  [PAYMENTS.ACTIONS.GET_PAYMENTS]: ({
    commit,
    state: localState,
    rootState,
    rootGetters,
  }, page) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const paymentsFilter = utils.constructFilter(localState.paymentsFilter);

      const filter = {
        accountIdEq: rootGetters.activeAccount.id,
        'created-at-gteq': rootState.timeRangeFilter.timeFilterValue.startDate,
        'created-at-lt': rootState.timeRangeFilter.timeFilterValue.endDate,
        ...paymentsFilter,
      };

      const payments = await api.apiInstance.findAllResources(RESOURCES.PAYMENTS, {
        filter,
        page,
        sort: '-created-at',
      });

      commit(PAYMENTS.MUTATIONS.SET_PAYMENTS, payments);
    }),
  [PAYMENTS.ACTIONS.SET_PAYMENTS_FILTER]: ({ commit, dispatch }, filter) => {
    if (filter) {
      commit(PAYMENTS.MUTATIONS.SAVE_PAYMENTS_FILTER, filter);
      dispatch(PAYMENTS.ACTIONS.GET_PAYMENTS, 1);
    }
  },
  [PAYMENTS.ACTIONS.CREATE_PAYMENT]: ({ commit, rootGetters }, { amount }) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const { id } = rootGetters.activeAccount;
      const res = await api.apiInstance.createResource(RESOURCES.CRYPTOMUS_PAYMENTS, {
        amount,
        account: {
          id,
        },
      });

      window.location = res.data.url;
    }),
  [PAYMENTS.ACTIONS.GET_CRYPTOMUS_PAYMENT]: ({ commit }, id) => {
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const { data } = await api.apiInstance.findOneResource(RESOURCES.CRYPTOMUS_PAYMENTS, id);
      window.location = data.url;
    });
  },
};
export const mutations = {
  [PAYMENTS.MUTATIONS.SET_PAYMENTS]: (currentState, payments) => {
    currentState.payments = payments;
  },

  [PAYMENTS.MUTATIONS.SAVE_PAYMENTS_FILTER]: (currentState, filter) => {
    currentState.paymentsFilter = filter;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
