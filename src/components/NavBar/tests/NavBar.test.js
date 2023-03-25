import {
  shallowMount, RouterLinkStub,
} from '@vue/test-utils';
import { nextTick } from 'vue';
import { createStore } from 'vuex';
import { createI18n } from 'vue-i18n';
import AntVue, {
  Layout, Menu,
} from 'ant-design-vue';

import { AUTH, UI_STATE } from '@/constants';
import NavBar from '../NavBar.vue';

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      message: {
        rates: 'Rates',
        cdrs: 'CDRS',
        account: 'account',
        networks: 'networks',
        statistics: 'statistics',
        invoices: 'invoices',
        logout: 'logout',
      },
    },
  },
});

let $route = {
  name: '',
};

const getStore = ({
  linkOnLogo = false,
  isAuthenticated = true,
  navCollapsed = false,
  blockedPages = [],
  navStateAction = () => null,
  logoutAction = () => null,
}) => createStore({
  getters: {
    linkOnLogo: () => linkOnLogo,
    isAuthenticated: () => isAuthenticated,
    navCollapsed: () => navCollapsed,
    blockedPages: () => (new Set(blockedPages)),
  },
  actions: {
    [UI_STATE.ACTIONS.SET_NAV_STATE]: navStateAction,
    [AUTH.ACTIONS.LOGOUT]: logoutAction,
  },

});

const getStubs = () => ({
  'a-menu': Menu,
  'a-layout-sider': Layout.Sider,
  'a-menu-item': Menu.Item,
  'a-icon': { template: '<i></i>' },
  'router-link': RouterLinkStub,
});

describe.skip('NavBar', () => {
  it('empty bar will be displayed with no props passed', () => {
    const store = getStore({});
    const stubs = getStubs();

    const wrapper = shallowMount(NavBar, {
      global: {
        plugins: [AntVue, store, i18n],
        stubs,
        mocks: { $route },
      },
    });
    expect(wrapper.findAllComponents(Menu).length).toBe(2);
    wrapper.unmount();
  });

  it('reacts to route change', async () => {
    expect.assertions(1);
    const store = getStore({});
    const stubs = getStubs();

    const wrapper = shallowMount(NavBar, {
      global: {
        plugins: [AntVue, store, i18n],
        stubs,
        mocks: { $route },
      },
    });

    $route = { name: 'cdrs' };
    wrapper.vm.$options.watch.$route.call(wrapper.vm, { name: 'cdrs' });
    await nextTick();
    expect(wrapper.findAllComponents(Menu)[0].props('selectedKeys')).toEqual(['cdrs']);
    wrapper.unmount();
  });

  it('will call store actions on an appropriate events', async () => {
    expect.assertions(3);

    const fakeNavStateAction = jest.fn();
    const fakeLogoutAction = jest.fn();
    const fakePush = jest.fn();

    const store = getStore({
      navStateAction: fakeNavStateAction,
      logoutAction: fakeLogoutAction,
    });
    const stubs = getStubs();

    const $router = {
      push: fakePush,
    };

    const wrapper = shallowMount(NavBar, {
      global: {
        plugins: [AntVue, store, i18n],
        stubs,
        mocks: { $route, $router },
      },
    });

    wrapper.setData({ collapsed: true });
    expect(fakeNavStateAction).toHaveBeenCalledWith(expect.anything(), true);

    const secondMenu = wrapper.findAllComponents(Menu)[1];
    await secondMenu.findComponent(Menu.Item).vm.$emit('click');
    await expect(fakeLogoutAction).toHaveBeenCalled();
    expect(fakePush).toHaveBeenCalled();

    wrapper.unmount();
  });
});
