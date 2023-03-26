import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_ROUTE_NAMES,
  ACCOUNT_INFO_PATHS,
} from '@/constants/routing';

import Payments from './Payments.vue';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.PAYMENTS,
    name: ACCOUNT_INFO_ROUTE_NAMES.PAYMENTS,
    components: {
      default: Payments,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
