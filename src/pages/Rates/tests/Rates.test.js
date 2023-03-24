import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createI18n } from 'vue-i18n';

import Rates from '../Rates.vue';

const i18n = createI18n({ locale: 'en' });

describe('Rates page', () => {
  it('calls getRates endpoint on created, if active account is set', () => {
    expect.assertions(1);

    const getRates = jest.fn();
    const store = createStore({
      getters: {
        activeAccount: () => ({ id: 'someId' }),
        rates: () => ({ items: [] }),
      },
      modules: {
        rates: {
          actions: {
            getRates,
          },
        },
      },
    });

    shallowMount(Rates, {
      global: {
        plugins: [store, i18n],
      },
    });
    expect(getRates).toHaveBeenCalled();
  });
});
