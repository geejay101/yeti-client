import { capitalize } from 'lodash';
import {
  ACCOUNT_INFO_ROUTE_NAMES,
} from '@/constants';

export default {
  messages: {
    en: {
      message: {
        [ACCOUNT_INFO_ROUTE_NAMES.RATES]: capitalize(ACCOUNT_INFO_ROUTE_NAMES.RATES),
        [ACCOUNT_INFO_ROUTE_NAMES.CDRS]: capitalize(ACCOUNT_INFO_ROUTE_NAMES.CDRS),
        // TODO watch this out
        [ACCOUNT_INFO_ROUTE_NAMES.CDR_EXPORTS]: capitalize(ACCOUNT_INFO_ROUTE_NAMES.CDR_EXPORTS),
        [ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT]: capitalize(ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT),
        [ACCOUNT_INFO_ROUTE_NAMES.NETWORKS]: capitalize(ACCOUNT_INFO_ROUTE_NAMES.NETWORKS),
        [ACCOUNT_INFO_ROUTE_NAMES.STATISTICS]: capitalize(ACCOUNT_INFO_ROUTE_NAMES.STATISTICS),
        [ACCOUNT_INFO_ROUTE_NAMES.INVOICES]: capitalize(ACCOUNT_INFO_ROUTE_NAMES.INVOICES),
        [ACCOUNT_INFO_ROUTE_NAMES.PAYMENTS]: capitalize(ACCOUNT_INFO_ROUTE_NAMES.PAYMENTS),
      },
    },
    ua: {
      message: {
        [ACCOUNT_INFO_ROUTE_NAMES.RATES]: 'Тарифи',
        [ACCOUNT_INFO_ROUTE_NAMES.CDRS]: 'CDRи',
        [ACCOUNT_INFO_ROUTE_NAMES.CDR_EXPORTS]: 'CDR Exports',
        [ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT]: 'Акаунт',
        [ACCOUNT_INFO_ROUTE_NAMES.NETWORKS]: 'Мережі',
        [ACCOUNT_INFO_ROUTE_NAMES.STATISTICS]: 'Статистика',
        [ACCOUNT_INFO_ROUTE_NAMES.INVOICES]: 'Інвойси',
        [ACCOUNT_INFO_ROUTE_NAMES.PAYMENTS]: 'Транзакції',
      },
    },
  },
};
