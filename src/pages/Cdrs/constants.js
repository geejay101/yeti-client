export const TABLE_HEADERS_ANT = [
  {
    key: 'time-start',
    dataIndex: 'time-start',
    visibleInOverview: true,
  },
  {
    key: 'duration',
    dataIndex: 'duration',
    visibleInOverview: true,
    filter: 'integer',
  },
  {
    key: 'success',
    dataIndex: 'success',
    visibleInOverview: true,
    scopedSlots: {
      customRender: 'badge',
    },
    filter: 'boolean',
  },
  {
    key: 'time-connect',
    dataIndex: 'time-connect',
  },
  {
    key: 'src-name-in',
    dataIndex: 'src-name-in',
  },
  {
    key: 'src-prefix-in',
    dataIndex: 'src-prefix-in',
    visibleInOverview: true,
    filter: 'string',
  },
  {
    key: 'time-end',
    dataIndex: 'time-end',
  },
  {
    key: 'src-prefix-routing',
    dataIndex: 'src-prefix-routing',
  },
  {
    key: 'dst-prefix-in',
    dataIndex: 'dst-prefix-in',
    visibleInOverview: true,
    filter: 'string',
  },
  {
    key: 'dst-prefix-routing',
    dataIndex: 'dst-prefix-routing',
  },
  {
    key: 'disconnect-full-info',
    dataIndex: 'disconnect-full-info',
  },
  {
    key: 'rate',
    dataIndex: 'rate',
  },
  {
    key: 'destination-fee',
    dataIndex: 'destination-fee',
  },
  {
    key: 'billing-intervals',
    dataIndex: 'billing-intervals',
  },
  {
    key: 'customer-price',
    dataIndex: 'customer-price',
    visibleInOverview: true,
    filter: 'integer',
  },
  {
    key: 'originator-address',
    dataIndex: 'originator-address',
  },
  {
    key: 'from-domain',
    dataIndex: 'from-domain',
    filter: 'string',
  },
  {
    key: 'to-domain',
    dataIndex: 'to-domain',
    filter: 'string',
  },
  {
    key: 'ruri-domain',
    dataIndex: 'ruri-domain',
    filter: 'string',
  },
  {
    key: 'local-tag',
    dataIndex: 'local-tag',
    filter: 'string',
  },
];
