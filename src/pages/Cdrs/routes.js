import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_PATHS,
  ACCOUNT_INFO_ROUTE_NAMES,
  GENERAL_ROUTE_NAMES,
} from '@/constants/routing';
import ViewFilters from '@/components/ViewFilters/ViewFilters.vue';

import Cdrs from './Cdrs.vue';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.CDRS,
    name: ACCOUNT_INFO_ROUTE_NAMES.CDRS,
    components: {
      default: Cdrs,
      [GENERAL_ROUTE_NAMES.VIEW_FILTERS]: ViewFilters,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
