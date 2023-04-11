import { formatDateFromString } from '../date/date';

export const formatCdrExports = (cdrExports = []) =>
  cdrExports.map((item) => {
    item['created-at'] = formatDateFromString(item['created-at']);
    item['updated-at'] = formatDateFromString(item['updated-at']);

    return item;
  });
