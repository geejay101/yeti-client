import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import Invoices from '../Invoices.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({ locale: 'en' });

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

    const store = new Vuex.Store(storeParams);

    shallowMount(Invoices, {
      store,
      localVue,
      i18n,
    });
    expect(getInvoices).toHaveBeenCalled();
  });

  it('do not call getInvoices if account is not set', () => {
    expect.assertions(1);

    const store = new Vuex.Store({
      ...storeParams,
      getters: {
        ...storeParams.getters,
        activeAccount: () => null,
      },
    });

    shallowMount(Invoices, {
      store,
      localVue,
      i18n,
    });
    expect(getInvoices).toHaveBeenCalledTimes(0);
  });

  it('calls getInvoices if active account is changed', () => {
    expect.assertions(1);

    const store = new Vuex.Store(storeParams);
    const component = shallowMount(Invoices, { store, localVue, i18n });

    component.vm.$options.watch.activeAccount.call(component.vm);

    expect(getInvoices).toHaveBeenCalledTimes(2);
  });
});
``