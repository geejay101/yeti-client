import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
  optionalFeature,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_ROUTE_NAMES,
  ACCOUNT_INFO_PATHS,
} from '@/constants/routing';

import OriginationStatistics from './OriginationStatistics.vue';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.ORIGINATION_STATISTICS,
    name: ACCOUNT_INFO_ROUTE_NAMES.ORIGINATION_STATISTICS,
    components: {
      default: OriginationStatistics,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages, optionalFeature]),
  },
];
