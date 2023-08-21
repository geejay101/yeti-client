import { createStore } from 'vuex';

import auth from './modules/auth';
import timeRangeFilter from './modules/timeRangeFilter';
import rates from './modules/rates';
import accounts from './modules/accounts';
import errors from './modules/errors';
import cdrs from './modules/cdrs';
import cdrExports from './modules/cdrExports';
import networks from './modules/networks';
import invoices from './modules/invoices';
import payments from './modules/payments';
import networkDetails from './modules/networkDetails';
import config from './modules/config';
import networkServices from './modules/networkServices';
import statisticsCharts from './modules/statisticsCharts';
import originationStatistics from './modules/originationStatistics';
import originationStatisticsQuality from './modules/originationStatisticsQuality';
import originationActiveCalls from './modules/originationActiveCalls';
import uiState from './modules/ui-state';

import { timeRangeWatcher } from './plugins/timeRangeWatcher';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  plugins: [timeRangeWatcher],
  modules: {
    auth,
    rates,
    accounts,
    errors,
    cdrs,
    cdrExports,
    networks,
    invoices,
    payments,
    config,
    timeRangeFilter,
    networkServices,
    statisticsCharts,
    originationStatistics,
    originationStatisticsQuality,
    originationActiveCalls,
    networkDetails,
    uiState,
  },
});
