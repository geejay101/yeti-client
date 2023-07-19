import locale from './locale';

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'orange';
    case 'completed':
      return 'green';
    case 'canceled':
      return 'red';
    default:
      return 'gray';
  }
};

export const TABLE_HEADERS_ANT = [
  {
    key: 'status',
    dataIndex: 'status',
    visibleInOverview: YETI_CONFIG.yeti.features?.has('cryptomus'),
    customRender(props) {
      return <a-tag color={getStatusColor(props.record.status)}>
        { locale.messages[YETI_CONFIG.yeti.locale]
          .tableMessage.statuses[props.record.status.toLowerCase()] }
      </a-tag>;
    },
  },
  {
    key: 'created-at',
    dataIndex: 'created-at',
    visibleInOverview: true,
  },
  {
    key: 'amount',
    dataIndex: 'amount',
    visibleInOverview: true,
    filter: 'integer',
  },
  {
    key: 'notes',
    dataIndex: 'notes',
    visibleInOverview: true,
    filter: 'string',
  },
];
