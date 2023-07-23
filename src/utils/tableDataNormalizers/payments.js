import { formatDateFromString } from '../date/date';

export const formatPayments = (payments = []) =>
  payments.map((item) => {
    item['created-at'] = formatDateFromString(item['created-at']);

    return item;
  });
