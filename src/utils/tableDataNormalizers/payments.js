import { formatDateFromString } from '../date/date';

export const formatPayments = (payments = []) =>
  payments.map((item, index) => {
    item['created-at'] = formatDateFromString(item['created-at']);
    item.success = item.success ? 'Yes' : 'No';
    item.key = index;

    return item;
  });
