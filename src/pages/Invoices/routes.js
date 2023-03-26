import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_ROUTE_NAMES,
  ACCOUNT_INFO_PATHS,
} from '@/constants/routing';

import Invoices from './Invoices.vue';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.INVOICES,
    name: ACCOUNT_INFO_ROUTE_NAMES.INVOICES,
    components: {
      default: Invoices,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
