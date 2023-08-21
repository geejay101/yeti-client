import {
  ACCOUNT_INFO_ROUTE_NAMES,
  CDRS,
  TIME_RANGE_FILTER,
  STATISTICS,
  PAYMENTS,
  ORIGINATION_STATISTICS,
  ORIGINATION_ACTIVE_CALLS,
  ORIGINATION_STATISTICS_QUALITY,
} from '@/constants';

export const timeRangeWatcher = (store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type === TIME_RANGE_FILTER.MUTATIONS.SET_VALUE) {
      switch (state.route && state.route.name) {
        case ACCOUNT_INFO_ROUTE_NAMES.CDRS:
          store.dispatch(CDRS.ACTIONS.GET_CDRS);
          break;
        case ACCOUNT_INFO_ROUTE_NAMES.STATISTICS:
          store.dispatch(STATISTICS.ACTIONS.GET_STATISTICS);
          break;
        case ACCOUNT_INFO_ROUTE_NAMES.PAYMENTS:
          store.dispatch(PAYMENTS.ACTIONS.GET_PAYMENTS);
          break;
        case ACCOUNT_INFO_ROUTE_NAMES.ORIGINATION_STATISTICS:
          store.dispatch(ORIGINATION_STATISTICS.ACTIONS.GET_ORIGINATION_STATISTICS);
          store.dispatch(ORIGINATION_STATISTICS_QUALITY.ACTIONS.GET_ORIGINATION_STATISTICS_QUALITY);
          store.dispatch(ORIGINATION_ACTIVE_CALLS.ACTIONS.GET_ACTIVE_CALLS);
          break;
        default:
      }
    }
  });
};
