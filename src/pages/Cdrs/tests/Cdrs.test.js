import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createI18n } from 'vue-i18n';

import Cdrs from '../Cdrs.vue';

const i18n = createI18n({ locale: 'en' });

describe('Cdrs page', () => {
  let getCdrs;
  let storeParams;

  beforeEach(() => {
    getCdrs = jest.fn();
    storeParams = {
      getters: {
        activeAccount: () => ({ id: 'someId' }),
        cdrs: () => ({ items: [] }),
        cdrFilter: () => ({}),
      },
      modules: {
        cdrs: {
          actions: {
            getCdrs,
          },
        },
      },
    };
  });

  afterEach(() => {
    getCdrs = undefined;
    storeParams = undefined;
  });

  it('calls getCdrs on created, if account is set', () => {
    expect.assertions(1);

    const store = createStore(storeParams);

    shallowMount(Cdrs, {
      global: {
        plugins: [store, i18n],
      },
    });
    expect(getCdrs).toHaveBeenCalled();
  });

  it('do not call getCdrs if account is not set', () => {
    expect.assertions(1);

    const store = createStore({
      ...storeParams,
      getters: {
        ...storeParams.getters,
        activeAccount: () => null,
      },
    });

    shallowMount(Cdrs, {
      global: {
        plugins: [store, i18n],
      },
    });
    expect(getCdrs).toHaveBeenCalledTimes(0);
  });

  it('calls getCdrs if active account is changed', () => {
    expect.assertions(1);

    const store = createStore(storeParams);
    const component = shallowMount(Cdrs, {
      global: {
        plugins: [store, i18n],
      },
    });

    component.vm.$options.watch.activeAccount.call(component.vm);

    expect(getCdrs).toHaveBeenCalledTimes(2);
  });
});
