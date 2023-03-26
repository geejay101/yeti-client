import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_ROUTE_NAMES,
  ACCOUNT_INFO_PATHS,
} from '@/constants/routing';

import Accounts from './Accounts.vue';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.ACCOUNT,
    name: ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT,
    components: {
      default: Accounts,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
