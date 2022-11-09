import { TIME_RANGE_FILTER } from '@/constants';
import utils from '@/utils';

const state = {
  timeFilterValue: utils.getLast24Hours(),
};
const getters = {
  timeFilterValue: (currentState) => currentState.timeFilterValue,
};

export const actions = {
  [TIME_RANGE_FILTER.ACTIONS.FILTER_SET]: ({ commit }, value) => {
    commit(TIME_RANGE_FILTER.MUTATIONS.SET_VALUE, value);
  },
};
export const mutations = {
  [TIME_RANGE_FILTER.MUTATIONS.SET_VALUE]: (currentState, value) => {
    currentState.timeFilterValue = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
