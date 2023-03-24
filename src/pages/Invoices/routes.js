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
import Invoices from './Invoices.vue';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.INVOICES,
    name: ACCOUNT_INFO_ROUTE_NAMES.INVOICES,
    components: {
      default: Invoices,
      [GENERAL_ROUTE_NAMES.VIEW_FILTERS]: ViewFilters,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
