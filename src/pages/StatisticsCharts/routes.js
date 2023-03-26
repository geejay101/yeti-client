import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_ROUTE_NAMES,
  ACCOUNT_INFO_PATHS,
} from '@/constants/routing';

import StatisticsCharts from './StatisticsCharts.vue';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.STATISTICS,
    name: ACCOUNT_INFO_ROUTE_NAMES.STATISTICS,
    components: {
      default: StatisticsCharts,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
