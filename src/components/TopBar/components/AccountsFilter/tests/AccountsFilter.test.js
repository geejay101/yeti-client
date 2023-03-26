import {
  shallowMount,
} from '@vue/test-utils';
import { nextTick } from 'vue';
import { createStore } from 'vuex';
import { createI18n } from 'vue-i18n';
import {
  Button,
  Dropdown,
  Menu,
  Row,
} from 'ant-design-vue';

import { ACCOUNTS } from '@/constants';
import AccountsFilter from '../AccountsFilter.vue';

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      message: {
        account: 'account',
      },
    },
  },
});

const getStore = ({
  activeAccount = null,
  accounts = [],
  getAccountsActon = () => null,
  setAccountIdAction = () => null,
}) => createStore({
  getters: {
    activeAccount: () => activeAccount,
    accounts: () => accounts,
  },
  actions: {
    [ACCOUNTS.ACTIONS.GET_ACCOUNTS]: getAccountsActon,
    [ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID]: setAccountIdAction,
  },
});

const getStubs = () => ({
  'a-menu': Menu,
  'a-row': Row,
  'a-button': Button,
  'a-dropdown': Dropdown,
  'a-menu-item': Menu.Item,
  'a-icon': { template: '<i></i>' },
});

describe('AccountsFilter', () => {
  it('no dropdown will be displayed with no props passed', () => {
    const store = getStore({});
    const stubs = getStubs();

    const wrapper = shallowMount(AccountsFilter, {
      global: {
        stubs,
        plugins: [store, i18n],
      },
    });
    expect(wrapper.findAllComponents(Dropdown).length).toBe(0);
    wrapper.unmount();
  });

  it.skip('show dropdown with items if some account is active', () => {
    expect.assertions(3);
    const store = getStore({
      accounts: [
        { id: 'first_acc', name: 'firstAccName' },
        { id: 'second_acc', name: 'secondAccName' },
      ],
      activeAccount: { id: 'first_acc', name: 'firstAccName' },
    });
    const stubs = getStubs();

    const wrapper = shallowMount(AccountsFilter, {
      global: {
        stubs,
        plugins: [store, i18n],
      },
    });

    expect(wrapper.findAllComponents(Dropdown).length).toBe(1);
    expect(wrapper.findAllComponents(Menu.Item).length).toBe(2);
    expect(wrapper.findComponent(Row).find('span').text()).toBe('firstAccName');
    wrapper.unmount();
  });

  it.skip('will call store actions on an appropriate events', async () => {
    expect.assertions(3);

    const fakeSetAccountIdAction = jest.fn();

    const store = getStore({
      setAccountIdAction: fakeSetAccountIdAction,
      accounts: [
        { id: 'first_acc', name: 'firstAccName' },
        { id: 'second_acc', name: 'secondAccName' },
      ],
      activeAccount: { id: 'first_acc', name: 'firstAccName' },
    });
    const stubs = getStubs();

    const wrapper = shallowMount(AccountsFilter, {
      global: {
        stubs,
        plugins: [i18n, store],
      },
    });

    wrapper.findComponent(Dropdown).vm.$emit('visibleChange', true);
    await nextTick();
    expect(wrapper.vm.$data.visible).toBe(true);

    wrapper.findComponent(Menu).vm.$emit('click', { key: 'someKey' });
    await nextTick();
    expect(fakeSetAccountIdAction).toHaveBeenCalledWith(expect.anything(), 'someKey');

    wrapper.findComponent(Menu).vm.$emit('click', { key: 'first_acc' });
    await nextTick();
    expect(fakeSetAccountIdAction).toHaveBeenCalledTimes(1);

    wrapper.unmount();
  });
});
