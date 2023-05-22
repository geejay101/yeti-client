import { formatDateFromString } from '../date/date';

export const formatCdrExports = (cdrExports = []) =>
  cdrExports.map((item) => {
    item['created-at'] = formatDateFromString(item['created-at']);
    item['updated-at'] = formatDateFromString(item['updated-at']);
    item['time-range'] = `${item.filters.time_start_gteq ? formatDateFromString(item.filters.time_start_gteq) : '...'} - ${item.filters.time_start_lt ? formatDateFromString(item.filters.time_start_lt) : '...'}`;

    return item;
  });
