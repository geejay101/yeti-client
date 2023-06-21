import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createI18n } from 'vue-i18n';
import DataChart from '@/components/DataChart/DataChart.vue';
import StatisticsCharts from '../StatisticsCharts.vue';

const i18n = createI18n({ locale: 'en' });

describe('StatisticsCharts page', () => {
  let storeParams;
  let getStatistics;

  beforeEach(() => {
    getStatistics = jest.fn();
    storeParams = {
      getters: {
        requestIsPending: () => false,
        activeAccount: () => ({ id: 'someId' }),
        activeCalls: () => ({
          originatedCalls: [],
          terminatedCalls: [],
        }),
        originatedCps: () => ({ cps: [] }),
      },
      modules: {
        statisticsCharts: {
          actions: {
            getStatistics,
          },
        },
      },
    };
  });

  afterEach(() => {
    getStatistics = undefined;
    storeParams = undefined;
  });

  it('calls getStatistics endpoint on created, if active account is set', () => {
    expect.assertions(1);

    const store = createStore(storeParams);
    shallowMount(StatisticsCharts, {
      global: {
        plugins: [store, i18n],
      },
    });
    expect(getStatistics).toHaveBeenCalled();
  });

  it('do not call getStatistics if account is not set', () => {
    expect.assertions(1);

    const adjustedStoreParams = {
      ...storeParams,
      getters: {
        ...storeParams.getters,
        activeAccount: () => null,
      },
    };
    const store = createStore(adjustedStoreParams);
    shallowMount(StatisticsCharts, {
      global: {
        plugins: [store, i18n],
      },
    });
    expect(getStatistics).toHaveBeenCalledTimes(0);
  });

  it('builds two charts if there are statistics entries in store', () => {
    expect.assertions(1);

    const adjustedStoreParams = {
      ...storeParams,
      getters: {
        ...storeParams.getters,
        activeCalls: () => (
          {
            terminatedCalls: [{ y: 12, x: 1000000000 }],
            originatedCalls: [{ y: 34, x: 2000000000 }],
          }
        ),
        originatedCps: () => ({
          cps: [{ y: 1234, x: 3000000000 }],
        }),
      },
    };
    const store = createStore(adjustedStoreParams);
    const wrapper = shallowMount(StatisticsCharts, {
      global: {
        plugins: [store, i18n],
      },
    });

    expect(wrapper.findAllComponents(DataChart).length).toBe(2);
  });

  it('calls getStatistics if active account is changed', () => {
    expect.assertions(1);

    const store = createStore(storeParams);
    const component = shallowMount(StatisticsCharts, {
      global: {
        plugins: [store, i18n],
      },
    });

    component.vm.$options.watch.activeAccount.call(component.vm);

    expect(getStatistics).toHaveBeenCalledTimes(2);
  });
});
