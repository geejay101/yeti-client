import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createStore } from 'vuex';
import { createI18n } from 'vue-i18n';
import { Button } from 'ant-design-vue';
import DateRangePicker from 'vue3-gabe-daterange-picker';

import { TIME_RANGE_FILTER } from '@/constants';
import TimeRangeFilter from '../TimeRangeFilter.vue';

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      message: {
        timeInterval: 'timeInterval',
        reset: 'reset',
      },
    },
  },
});

const getStore = ({
  timeFilterValue = { startDate: new Date('01-01-2019'), endDate: new Date('02-02-2019') },
  requestIsPending = false,
  filterActionSet = () => null,
  filterActionReset = () => null,
}) => createStore({
  getters: {
    timeFilterValue: () => timeFilterValue,
    requestIsPending: () => requestIsPending,
  },
  actions: {
    [TIME_RANGE_FILTER.ACTIONS.FILTER_SET]: filterActionSet,
    [TIME_RANGE_FILTER.ACTIONS.FILTER_RESET]: filterActionReset,
  },
});

const getStubs = () => ({
  'date-range-picker': DateRangePicker,
  'a-button': Button,
});

describe('TimeRangeFilter', () => {
  it('date picker will be displayed with no props passed', () => {
    const store = getStore({});
    const stubs = getStubs();

    const wrapper = shallowMount(TimeRangeFilter, {
      global: {
        plugins: [store, i18n],
        stubs,
      },
    });
    expect(wrapper.findAllComponents(DateRangePicker).length).toBe(1);
    wrapper.unmount();
  });

  it('date picker is toggled if request is still loading', async () => {
    expect.assertions(1);
    const store = getStore({
      requestIsPending: true,
    });
    const stubs = getStubs();

    const wrapper = shallowMount(TimeRangeFilter, {
      global: {
        plugins: [store, i18n],
        stubs,
      },
    });

    wrapper.findComponent(DateRangePicker).vm.$emit('toggle');
    await nextTick();
    expect(wrapper.vm.$refs.picker.open).toBe(false);

    wrapper.unmount();
  });
});
