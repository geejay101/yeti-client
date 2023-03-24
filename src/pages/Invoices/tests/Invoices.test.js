import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createI18n } from 'vue-i18n';

import Invoices from '../Invoices.vue';

const i18n = createI18n({ locale: 'en' });

describe('Invoices page', () => {
  let getInvoices;
  let storeParams;

  beforeEach(() => {
    getInvoices = jest.fn();
    storeParams = {
      getters: {
        activeAccount: () => ({ id: 'someId' }),
        invoices: () => ({ items: [] }),
      },
      modules: {
        invoices: {
          actions: {
            getInvoices,
          },
        },
      },
    };
  });

  afterEach(() => {
    getInvoices = undefined;
    storeParams = undefined;
  });

  it('calls getInvoices on created, if account is set', () => {
    expect.assertions(1);

    const store = createStore(storeParams);

    shallowMount(Invoices, {
      global: {
        plugins: [store, i18n],
      },
    });
    expect(getInvoices).toHaveBeenCalled();
  });

  it('do not call getInvoices if account is not set', () => {
    expect.assertions(1);

    const store = createStore({
      ...storeParams,
      getters: {
        ...storeParams.getters,
        activeAccount: () => null,
      },
    });

    shallowMount(Invoices, {
      global: {
        plugins: [store, i18n],
      },
    });
    expect(getInvoices).toHaveBeenCalledTimes(0);
  });

  it('calls getInvoices if active account is changed', () => {
    expect.assertions(1);

    const store = createStore(storeParams);
    const component = shallowMount(Invoices, {
      global: {
        plugins: [store, i18n],
      },
    });

    component.vm.$options.watch.activeAccount.call(component.vm);

    expect(getInvoices).toHaveBeenCalledTimes(2);
  });
});
