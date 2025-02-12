export const ACCOUNTS = {
  MUTATIONS: {
    SET_ACCOUNT_DETAILS: 'setAccountDetails',
    SET_ACCOUNTS: 'setAccounts',
    SAVE_ACCOUNTS_FILTER: 'saveAccountsFilter',
    SET_CHOSEN_ACCOUNT_ID: 'setChosenAccountId',
  },
  ACTIONS: {
    GET_ACCOUNT_DETAILS: 'getAccountDetails',
    GET_ACCOUNTS: 'getAccounts',
    SET_ACCOUNTS_FILTER: 'setAccountsFilter',
    SET_CHOSEN_ACCOUNT_ID: 'setChosenAccountId',
  },
};

export const CDRS = {
  MUTATIONS: {
    SET_CDRS: 'setCdrs',
    SAVE_CDRS_FILTER: 'saveCdrsFilter',
  },
  ACTIONS: {
    GET_CDRS: 'getCdrs',
    SET_CDRS_FILTER: 'setCdrsFilter',
  },
};

export const CDR_EXPORTS = {
  MUTATIONS: {
    SET_CDR_EXPORTS: 'setCdrExports',
    SAVE_CDR_EXPORTS_FILTER: 'saveCdrExportsFilter',
  },
  ACTIONS: {
    GET_CDR_EXPORTS: 'getCdrExports',
    CREATE_CDR_EXPORT: 'createCdrExport',
    SET_CDR_EXPORTS_FILTER: 'setCdrExportsFilter',
  },
};

export const NETWORKS = {
  MUTATIONS: {
    SET_NETWORKS: 'setNetworks',
    SAVE_NETWORK_DETAILS: 'saveNetworkDetails',
    SAVE_NETWORKS_FILTER: 'saveNetworksFilter',
  },
  ACTIONS: {
    GET_NETWORKS: 'getNetworks',
    GET_NETWORK_DETAILS: 'getNetworkDetails',
    SET_NETWORKS_FILTER: 'setNetworksFilter',
  },
};

export const STATISTICS = {
  MUTATIONS: {
    SET_STATISTICS: 'setStatistics',
  },
  ACTIONS: {
    GET_STATISTICS: 'getStatistics',
  },
};

export const ORIGINATION_STATISTICS = {
  MUTATIONS: {
    SET_ORIGINATION_STATISTICS: 'setOriginationStatistics',
    SET_SAMPLING: 'setStatisticsSampling',
  },
  ACTIONS: {
    GET_ORIGINATION_STATISTICS: 'getOriginationStatistics',
    GET_SAMPLING: 'getStatisticsSampling',
    SET_SAMPLING: 'setStatisticsSampling',
  },
};

export const ORIGINATION_STATISTICS_QUALITY = {
  MUTATIONS: {
    SET_ORIGINATION_STATISTICS_QUALITY: 'setOriginationStatisticsQuality',
    SET_SAMPLING: 'setQualitySampling',
  },
  ACTIONS: {
    GET_ORIGINATION_STATISTICS_QUALITY: 'getOriginationStatisticsQuality',
    GET_SAMPLING: 'getQualitySampling',
    SET_SAMPLING: 'setQualitySampling',
  },
};

export const ORIGINATION_ACTIVE_CALLS = {
  MUTATIONS: {
    SET_ACTIVE_CALLS: 'setOriginationActiveCalls',
  },
  ACTIONS: {
    GET_ACTIVE_CALLS: 'getOriginationActiveCalls',
  },
};

export const INVOICES = {
  MUTATIONS: {
    SET_INVOICES: 'setInvoices',
  },
  ACTIONS: {
    GET_INVOICES: 'getInvoices',
  },
};

export const PAYMENTS = {
  MUTATIONS: {
    SET_PAYMENTS: 'setPayments',
    SAVE_PAYMENTS_FILTER: 'savePaymentsFilter',
  },
  ACTIONS: {
    GET_PAYMENTS: 'getPayments',
    GET_CRYPTOMUS_PAYMENT: 'getCryptomusPayment',
    SET_PAYMENTS_FILTER: 'setPaymentsFilter',
    CREATE_PAYMENT: 'createPayment',
  },
};

export const RATES = {
  MUTATIONS: {
    SET_RATES: 'setRates',
    SAVE_RATES_FILTER: 'saveRatesFilter',
  },
  ACTIONS: {
    GET_RATES: 'getRates',
    SET_RATES_FILTER: 'setRatesFilter',
  },
};

export const AUTH = {
  MUTATIONS: {
    AUTH_SUCCESS: 'authSuccess',
    LOGOUT: 'logout',
  },
  ACTIONS: {
    AUTH_REQUEST: 'authRequest',
    LOCAL_AUTH: 'localAuth',
    LOGOUT: 'logout',
  },
};

export const TIME_RANGE_FILTER = {
  MUTATIONS: {
    SET_VALUE: 'setValue',
  },
  ACTIONS: {
    FILTER_SET: 'filterSet',
  },
};

export const NETWORK_SERVICE = {
  MUTATIONS: {
    SWITCH_PENDING_STATE: 'switchPendingState',
  },
  ACTIONS: {
    SWITCH_PENDING_STATE: 'switchPendingState',
  },
};

export const UI_STATE = {
  MUTATIONS: {
    SET_NAV_STATE: 'setNavState',
  },
  ACTIONS: {
    SET_NAV_STATE: 'setNavState',
  },
};
