export const TABLE_HEADERS_ANT = [
  {
    key: 'name',
    dataIndex: 'name',
    width: 300,
    visibleInOverview: true,
    filter: 'string',
    customRender({ record }) {
      return <router-link
      to={`/network-details/${record.id}`}
    >
      {record.name}
    </router-link>;
    },
  },
  {
    key: 'network-type',
    dataIndex: 'network-type',
    width: 300,
    visibleInOverview: true,
  },
  {
    key: 'id',
    dataIndex: 'id',
    width: 300,
    visibleInOverview: true,
  },
];
