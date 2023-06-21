import { omit } from 'lodash-es';

export const formatAccount = (excludedFields) => (accountDetails = {}) => Object.entries(
  // Get rid of not needed properties
  omit(accountDetails, excludedFields),
);
