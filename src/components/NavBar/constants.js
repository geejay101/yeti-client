import {
  UserOutlined,
  DollarOutlined,
  BarsOutlined,
  ClusterOutlined,
  LineChartOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons-vue';

import {
  ACCOUNT_INFO_PATHS, ACCOUNT_INFO_ROUTE_NAMES,
} from '@/constants';

export const NAV_ITEMS = [{
  routePath: ACCOUNT_INFO_PATHS.ACCOUNT,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT,
}, {
  routePath: ACCOUNT_INFO_PATHS.RATES,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.RATES,
}, {
  routePath: ACCOUNT_INFO_PATHS.CDRS,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.CDRS,
}, {
  routePath: ACCOUNT_INFO_PATHS.NETWORKS,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.NETWORKS,
}, {
  routePath: ACCOUNT_INFO_PATHS.STATISTICS,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.STATISTICS,
}, {
  routePath: ACCOUNT_INFO_PATHS.INVOICES,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.INVOICES,
}, {
  routePath: ACCOUNT_INFO_PATHS.PAYMENTS,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.PAYMENTS,
}];

export const ROUTE_TO_ICON_MAPPINGS = {
  [ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT]: UserOutlined,
  [ACCOUNT_INFO_ROUTE_NAMES.RATES]: DollarOutlined,
  [ACCOUNT_INFO_ROUTE_NAMES.CDRS]: BarsOutlined,
  [ACCOUNT_INFO_ROUTE_NAMES.NETWORKS]: ClusterOutlined,
  [ACCOUNT_INFO_ROUTE_NAMES.STATISTICS]: LineChartOutlined,
  [ACCOUNT_INFO_ROUTE_NAMES.INVOICES]: FileDoneOutlined,
  [ACCOUNT_INFO_ROUTE_NAMES.PAYMENTS]: CheckCircleOutlined,
};
