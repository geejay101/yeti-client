import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createStore } from 'vuex';
import { createI18n } from 'vue-i18n';

import { AUTH } from '@/constants';
import App from '../App.vue';

const mockInsertNetworkErrorMiddleware = jest.fn(() => true);
const mockInsertNetworkAuthErrorMiddleware = jest.fn(() => true);
const fakePush = jest.fn();
const fakeRouteName = 'login';

jest.mock('@/api', () => ({
  get apiInstance() {
    return {
      insertNetworkErrorMiddleware: mockInsertNetworkErrorMiddleware,
      insertNetworkAuthErrorMiddleware: mockInsertNetworkAuthErrorMiddleware,
    };
  },
}));

const $router = {
  push: fakePush,
  name: fakeRouteName,
};

const i18n = createI18n({ locale: 'en', messages: { en: { message: { inputPlaceholder: 'Input', clear: 'Clear' } } } });

describe('App', () => {
  it('empty App will be displayed with no props passed', async () => {
    const localAuthMock = jest.fn();
    const store = createStore({
      getters: {
        locale: () => 'en',
        requestIsPending: () => 0,
        isAuthenticated: () => false,
      },
      actions: {
        [AUTH.ACTIONS.LOCAL_AUTH]: localAuthMock,
      },
    });

    const wrapper = shallowMount(App, {
      store,
      global: {
        plugins: [i18n, store],
        stubs: {
          notifications: { template: '<div></div>' },
          'router-view': { template: '<div></div>' },
        },
        mocks: {
          $router,
        },
      },
    });
    expect(localAuthMock).toHaveBeenCalledTimes(1);
    await nextTick();
    expect(mockInsertNetworkErrorMiddleware).toHaveBeenCalledTimes(1);
    expect(mockInsertNetworkAuthErrorMiddleware).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});
