import { createRouter, createWebHashHistory } from 'vue-router';

import Login from '../pages/Login/Login.vue';
import NotFound from '../pages/NotFound.vue';
import { routes as CdrsRoutes } from '../pages/Cdrs/routes';
import { routes as CdrExportsRoutes } from '../pages/CdrExports/routes';
import { routes as RatesRoutes } from '../pages/Rates/routes';
import { routes as AccountsRoutes } from '../pages/Accounts/routes';
import { routes as NetworksRoutes } from '../pages/Networks/routes';
import { routes as NetworkDetailsRoutes } from '../pages/NetworkDetails/routes';
import { routes as StatisticsChartsRoutes } from '../pages/StatisticsCharts/routes';
import { routes as InvoicesRoutes } from '../pages/Invoices/routes';
import { routes as PaymentsRoutes } from '../pages/Payments/routes';
import { routes as OriginationStatisticsRoutes } from '../pages/OriginationStatistics/routes';

import { requiresNotAuth, beforeGuardEnchancer } from './helpers';
import { GENERAL_ROUTE_NAMES, GENERAL_PATHS, ACCOUNT_INFO_ROUTE_NAMES } from '../constants/routing';

const STATIC_ROUTES = [
  {
    path: '/',
    redirect: {
      name: ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT,
    },
  },
  {
    path: GENERAL_PATHS.LOG_IN,
    name: GENERAL_ROUTE_NAMES.LOG_IN,
    components: {
      [GENERAL_ROUTE_NAMES.LOG_IN]: Login,
    },
    beforeEnter: beforeGuardEnchancer([requiresNotAuth]),
  },
  {
    path: GENERAL_PATHS.NOT_FOUND,
    name: GENERAL_ROUTE_NAMES.NOT_FOUND,
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: GENERAL_ROUTE_NAMES.NOT_FOUND,
    },
  },
  ...RatesRoutes,
  ...CdrsRoutes,
  ...CdrExportsRoutes,
  ...AccountsRoutes,
  ...NetworksRoutes,
  ...StatisticsChartsRoutes,
  ...NetworkDetailsRoutes,
  ...InvoicesRoutes,
  ...PaymentsRoutes,
  ...OriginationStatisticsRoutes,
];

export const router = createRouter({
  routes: STATIC_ROUTES,
  history: createWebHashHistory(),
});
