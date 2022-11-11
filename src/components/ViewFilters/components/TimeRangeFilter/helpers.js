import add from 'date-fns/add';
import utils from '@/utils';

export const getLocalePartOfSettings = (localeObject, language) => ({
  firstDay: 1,
  format: 'yyyy-mm-dd HH:MM:ss',
  applyLabel: localeObject.messages[language].message.applyLabel,
  cancelLabel: localeObject.messages[language].message.cancelLabel,
  daysOfWeek: localeObject.messages[language].message.daysOfWeek,
  monthNames: localeObject.messages[language].message.monthNames,
});

export const getLocaleRanges = (localeObject, language) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = add(today, { days: 1 });
  const yesterday = add(today, { days: -1 });
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisMonthEnd = add(thisMonthStart, { months: 1 });
  const thisYearStart = new Date(today.getFullYear(), 0, 1);
  const thisYearEnd = add(thisYearStart, { years: 1 });

  const { startDate: last24HoursStart, endDate: last24HoursEnd } = utils.getLast24Hours();
  return {
    [localeObject.messages[language].message.last24Hours]: [last24HoursStart, last24HoursEnd],
    [localeObject.messages[language].message.last7Days]: [
      add(new Date(), {
        days: -7,
      }),
      new Date(),
    ],
    [localeObject.messages[language].message.last30Days]: [
      add(new Date(), {
        days: -30,
      }),
      new Date(),
    ],
    [localeObject.messages[language].message.today]: [today, tomorrow],
    [localeObject.messages[language].message.yesterday]: [yesterday, today],
    [localeObject.messages[language].message.thisMonth]: [thisMonthStart, thisMonthEnd],
    [localeObject.messages[language].message.thisYear]: [thisYearStart, thisYearEnd],
  };
};
