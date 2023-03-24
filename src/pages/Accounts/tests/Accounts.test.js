import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createI18n } from 'vue-i18n';

import { ACCOUNT_DETAILS, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS } from '@/constants';
import VerticalListAnt from '@/components/VerticalListAnt/VerticalListAnt.vue';
import Accounts from '../Accounts.vue';

const i18n = createI18n({ locale: 'en' });

describe('Accounts page', () => {
  let storeParams;
  let getAccountDetails;

  beforeEach(() => {
    getAccountDetails = jest.fn();
    storeParams = {
      getters: {
        activeAccount: () => ({ id: 'someId' }),
        accounts: () => ([]),
        currentAccountDetails: () => (ACCOUNT_DETAILS),
      },
      modules: {
        accounts: {
          actions: {
            getAccountDetails,
          },
        },
      },
    };
  });

  afterEach(() => {
    getAccountDetails = undefined;
    storeParams = undefined;
  });

  it('calls getAccountDetails endpoint on created, if active account is set', () => {
    expect.assertions(1);

    const store = createStore(storeParams);

    shallowMount(Accounts, {
      global: {
        plugins: [store, i18n],
      },
    });

    expect(getAccountDetails).toHaveBeenCalled();
  });

  it('do not call getAccountDetails if account is not set', () => {
    expect.assertions(1);

    const adjustedStoreParams = {
      ...storeParams,
      getters: {
        ...storeParams.getters,
        activeAccount: () => null,
      },
    };
    const store = createStore(adjustedStoreParams);

    shallowMount(Accounts, {
      global: {
        plugins: [store, i18n],
      },
    });
    expect(getAccountDetails).toHaveBeenCalledTimes(0);
  });

  it('renders VerticalListAnt component with proper dataSource prop', () => {
    expect.assertions(1);

    const store = createStore(storeParams);
    const wrapper = shallowMount(Accounts, {
      global: {
        plugins: [store, i18n],
      },
    });
    const numberOfRowsInAccountInfo = Object.keys(ACCOUNT_DETAILS).length
    - COMMON_TABLE_ENTITY_EXCLUDED_FIELDS.length;

    expect(wrapper.findComponent(VerticalListAnt).props('dataSource').length).toBe(numberOfRowsInAccountInfo);
  });

  it('calls getAccountDetails if active account is changed', () => {
    expect.assertions(1);

    const store = createStore(storeParams);
    const component = shallowMount(Accounts, {
      global: {
        plugins: [store, i18n],
      },
    });

    component.vm.$options.watch.activeAccount.call(component.vm);

    expect(getAccountDetails).toHaveBeenCalledTimes(2);
  });
});
