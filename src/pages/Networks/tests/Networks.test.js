import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createI18n } from 'vue-i18n';

import DataTableAnt from '@/components/DataTableAnt/DataTableAnt.vue';

import Networks from '../Networks.vue';

const i18n = createI18n({ locale: 'en' });

describe('Networks page', () => {
  it('calls getNetworks endpoint on created, if active account is set', () => {
    expect.assertions(1);

    const getNetworks = jest.fn();
    const store = createStore({
      getters: {
        networks: () => ({ items: [] }),
        networksFilter: () => {},
      },
      modules: {
        networks: {
          actions: {
            getNetworks,
          },
        },
      },
    });

    shallowMount(Networks, {
      global: {
        plugins: [store, i18n],
      },
    });
    expect(getNetworks).toHaveBeenCalled();
  });

  it('builds DataTableAnt with correct props', () => {
    expect.assertions(2);

    const getNetworks = jest.fn();
    const store = createStore({
      getters: {
        networks: () => ({
          items: [{
            id: 'fakeId1',
            links: { },
            name: 'AFGHANISTAN',
            'network-type': { name: 'Unknown' },
            type: 'networks',
          }, {
            id: 'fakeId2',
            links: { },
            name: 'ALBANIA',
            'network-type': { name: 'Known' },
            type: 'networks',
          }],
          meta: { 'total-count': 500 },
        }),
        networksFilter: () => ({
          name: 'alabama',
        }),
      },
      modules: {
        networks: {
          actions: {
            getNetworks,
          },
        },
      },
    });

    const wrapper = shallowMount(Networks, {
      global: {
        plugins: [store, i18n],
      },
    });
    expect(wrapper.findComponent(DataTableAnt).props('items').length).toBe(2);
    expect(wrapper.findComponent(DataTableAnt).props('rows')).toBe(500);
  });
});
