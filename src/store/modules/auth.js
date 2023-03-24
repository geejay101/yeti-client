import api from '@/api';
import { RESOURCES, AUTH } from '@/constants';
import utils from '@/utils';

const state = {
  status: '',
};

const getters = {
  isAuthenticated: (currentState) => currentState.status === 'success',
};

export const actions = {
  [AUTH.ACTIONS.AUTH_REQUEST]: async ({ commit }, { login, password }) => {
    await utils.wrapWithAsyncRequestStatus(commit, async () => {
      await api.apiInstance.createResource(RESOURCES.AUTH, {
        login, password, cookie_auth: true,
      });
      commit(AUTH.MUTATIONS.AUTH_SUCCESS);
    });
  },
  [AUTH.ACTIONS.LOCAL_AUTH]: async ({ commit }) => {
    await utils.wrapWithAsyncRequestStatus(commit, async () => {
      await api.apiInstance.findAllResources(RESOURCES.AUTH);
      commit(AUTH.MUTATIONS.AUTH_SUCCESS);
    });
  },
  [AUTH.ACTIONS.LOGOUT]: async ({ commit }) => {
    await api.apiInstance.destroyResource(RESOURCES.AUTH);
    commit(AUTH.MUTATIONS.LOGOUT);
  },
};
export const mutations = {
  [AUTH.MUTATIONS.AUTH_SUCCESS]: (currentState) => {
    currentState.status = 'success';
  },
  [AUTH.MUTATIONS.LOGOUT]: (currentState) => {
    currentState.status = 'unauthorized';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
