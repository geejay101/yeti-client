import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_ROUTE_NAMES,
  ACCOUNT_INFO_PATHS,
  GENERAL_ROUTE_NAMES,
} from '@/constants/routing';

import ViewFilters from '@/components/ViewFilters/ViewFilters.vue';
import Payments from './Payments.vue';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.PAYMENTS,
    name: ACCOUNT_INFO_ROUTE_NAMES.PAYMENTS,
    components: {
      default: Payments,
      [GENERAL_ROUTE_NAMES.VIEW_FILTERS]: ViewFilters,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
