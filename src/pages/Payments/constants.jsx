import CompletePaymentCell from './components/CompletePaymentCell.vue';
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
    width: 300,
    visibleInOverview: YETI_CONFIG.yeti.features?.has('cryptomus'),
    customRender(props) {
      const cell = [<a-tag color={getStatusColor(props.record.status)}>
          { locale.messages[YETI_CONFIG.yeti.locale]
            .tableMessage.statuses[props.record.status.toLowerCase()] }
        </a-tag>];
      if (props.record.status === 'pending' && props.record['type-name'] === 'cryptomus') {
        cell.push(<CompletePaymentCell paymentId={props.record.id}/>);
      }

      return cell;
    },
  },
  {
    key: 'created-at',
    dataIndex: 'created-at',
    visibleInOverview: true,
  },
  {
    key: 'type-name',
    dataIndex: 'type-name',
    visibleInOverview: true,
    customRender(props) {
      return <a-tag color="blue">{props.text}</a-tag>;
    },
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
