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
    customRender({ record }) {
      return <a-tag color={record['reject-calls'] === 'Allow' ? 'green' : 'red'}>
        { record['reject-calls'] }
      </a-tag>;
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
