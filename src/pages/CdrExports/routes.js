import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_PATHS,
  ACCOUNT_INFO_ROUTE_NAMES,
} from '@/constants/routing';

import CdrExports from './CdrExports.vue';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.CDR_EXPORTS,
    name: ACCOUNT_INFO_ROUTE_NAMES.CDR_EXPORTS,
    components: {
      default: CdrExports,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
