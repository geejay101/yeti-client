import { formatDateFromObject } from '../date/date';

export const constructChartDataRequest = ({ startDate, endDate, id }) => ({
  'from-time': formatDateFromObject(startDate),
  'to-time': formatDateFromObject(endDate),
  account: {
    id,
  },
});

export const constructChartDataGetRequest = ({
  startDate,
  endDate,
  id,
  sampling,
}) => ({
  'from-time': formatDateFromObject(startDate),
  'to-time': formatDateFromObject(endDate),
  'account-id': id,
  sampling,
});
