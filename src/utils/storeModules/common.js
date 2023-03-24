import { NETWORK_SERVICE } from '@/constants';

export const wrapWithAsyncRequestStatus = async (commit, callback) => {
  commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });
  // eslint-disable-next-line no-console
  await callback().catch((e) => { console.warn(e[0]?.title); });
  commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
};

export const constructFilter = (filter) => {
  const apiFilter = {};

  Object.entries(filter).forEach(([key, { value }]) => {
    apiFilter[key] = value;
  });

  return apiFilter;
};
