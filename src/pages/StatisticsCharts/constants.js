export const CHART_OPTIONS = {
  aspectRatio: 4,
  elements: {
    line: {
      tension: 0,
    },
    point: {
      radius: 0, // disable points
    },
  },
  hitRadius: 10,
  scales: {
    x: {
      type: 'time',
      title: {
        display: true,
        text: 'Time',
      },
      time: {
        displayFormats: {
          minute: 'HH:mm',
          hour: 'HH:mm',
          day: 'MM-dd-yy HH:mm',
        },
        round: true,
        stepSize: 1,
      },
      ticks: {
        major: {
          enabled: true,
        },
      },
    },
    y: {
      type: 'linear',
      position: 'left',
      ticks: {
        maxRotation: 0,
      },
      suggestedMin: 0,
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
    position: 'nearest',
  },
  animation: {
    duration: 0,
  },
  downsample: {
    enabled: true,
    threshold: 300, // change this

    auto: true,
    onInit: true,
  },
};

export const INITIAL_DATASETS_SETTINGS = {
  terminatedCalls: {
    label: 'Terminated calls',
    data: [],
    backgroundColor: 'transparent',
    borderColor: 'lightblue',
  },
  originatedCalls: {
    label: 'Originated calls', data: [], backgroundColor: 'transparent', borderColor: 'lightgreen',
  },
  cps: {
    label: 'Originated CPS', data: [], backgroundColor: 'transparent', borderColor: 'orange',
  },
};
