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
  
  import Payments from './Payments.vue';
  import ViewFilters from '@/components/ViewFilters/ViewFilters.vue';
  
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
  