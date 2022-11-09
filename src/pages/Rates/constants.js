export const TABLE_HEADERS_ANT = [
  {
    key: 'prefix',
    dataIndex: 'prefix',
    visibleInOverview: true,
  },
  {
    key: 'reject-calls',
    dataIndex: 'reject-calls',
    visibleInOverview: true,
    scopedSlots: {
      customRender: 'badge',
    },
  },
  {
    key: 'billing-interval',
    dataIndex: 'billing-interval',
    visibleInOverview: true,
  },
  {
    key: 'rate',
    dataIndex: 'rate',
    visibleInOverview: true,
  },
  {
    key: 'connect-fee',
    dataIndex: 'connect-fee',
    visibleInOverview: true,
  },
  {
    key: 'network-prefix',
    dataIndex: 'network-prefix',
    visibleInOverview: true,
  },
  {
    key: 'valid-from',
    dataIndex: 'valid-from',
    visibleInOverview: true,
  },
  {
    key: 'valid-till',
    dataIndex: 'valid-till',
    visibleInOverview: true,
  },
];
