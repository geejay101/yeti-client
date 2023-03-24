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
import Accounts from './Accounts.vue';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.ACCOUNT,
    name: ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT,
    components: {
      default: Accounts,
      [GENERAL_ROUTE_NAMES.VIEW_FILTERS]: ViewFilters,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
