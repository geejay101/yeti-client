import { shallowMount } from '@vue/test-utils';
import {
  Layout,
} from 'ant-design-vue';
import { createI18n } from 'vue-i18n';
import { ACCOUNT_INFO_ROUTE_NAMES } from '@/constants';

import ViewFilters from '../ViewFilters.vue';
import TimeRangeFilter from '../components/TimeRangeFilter/TimeRangeFilter.vue';
import AccountsFilter from '../components/AccountsFilter/AccountsFilter.vue';

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

const getStubs = () => ({
  'a-layout-header': Layout.Header,
});

describe('ViewFilters', () => {
  it('show AccountsFilter, and TimeRangeFilter if on condition is met', () => {
    const $route = {
      name: ACCOUNT_INFO_ROUTE_NAMES.CDRS,
    };

    const stubs = getStubs();

    const wrapper = shallowMount(ViewFilters, {
      global: {
        stubs,
        plugins: [i18n],
        mocks: { $route },
      },
    });
    expect(wrapper.findAllComponents(AccountsFilter).length).toBe(1);
    expect(wrapper.findAllComponents(TimeRangeFilter).length).toBe(1);
    wrapper.unmount();
  });
});
