export const COMMON_CHART_OPTIONS = {
  height: 280,
  cursor: {
    sync: {
      key: 'calls',
    },
  },
  scales: { x: { time: true } },
  axes: [
    {
      values: [
        [3600 * 24 * 365, '{YYYY}', 7, '{YYYY}'],
        [3600 * 24 * 28, '{MM}', 7, '{YYYY}-{MM}'],
        [3600 * 24, '{MM}-{DD}', '\n{YYYY}-{MM}-{DD}', '\n{YYYY}-{MM}-{DD}'],
        [3600, '{HH}:{mm}', '\n{YYYY}-{MM}-{DD}', null, '\n{MM}-{DD}', null, null, null, 1],
        [60, '{HH}:{mm}', '\n{YYYY}-{MM}-{DD}', null, '\n{MM}-{DD}', null, null, null, 1],
        [1, '{HH}:{mm}:{ss}', 4, '{HH}:{mm}:{ss}\n{MM}-{DD}'],
      ],
    },
  ],
};
