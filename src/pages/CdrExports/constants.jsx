import DownloadCell from './components/DownloadCell.vue';
import locale from './locale';

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'orange';
    case 'Completed':
      return 'green';
    case 'Failed':
      return 'red';
    case 'Deleted':
      return 'gray';
    default:
      return 'gray';
  }
};

export const TABLE_HEADERS_ANT = [
  {
    key: 'status',
    dataIndex: 'status',
    visibleInOverview: true,
    customRender(props) {
      return <a-tag color={getStatusColor(props.record.status)}>
        { locale.messages[YETI_CONFIG.yeti.locale]
          .tableMessage.statuses[props.record.status.toLowerCase()] }
      </a-tag>;
    },
    filter: 'enum',
    filterValues: [
      { value: 'Completed', label: locale.messages[YETI_CONFIG.yeti.locale].tableMessage.statuses.completed },
      { value: 'Failed', label: locale.messages[YETI_CONFIG.yeti.locale].tableMessage.statuses.failed },
      { value: 'Pending', label: locale.messages[YETI_CONFIG.yeti.locale].tableMessage.statuses.pending },
      { value: 'Deleted', label: locale.messages[YETI_CONFIG.yeti.locale].tableMessage.statuses.deleted },
    ],
  },
  {
    key: 'id',
    dataIndex: 'id',
    visibleInOverview: true,
    customRender(props) {
      return props.record.status === 'Completed' ? <DownloadCell id={props.record.id} /> : '---';
    },
  },
  {
    key: 'created-at',
    dataIndex: 'created-at',
    visibleInOverview: true,
  },
  {
    key: 'rows-count',
    dataIndex: 'rows-count',
    visibleInOverview: true,
    filter: 'integer',
  },
  {
    key: 'time-range',
    dataIndex: 'time-range',
    visibleInOverview: true,
    filter: 'integer',
  },
  {
    key: 'updated-at',
    dataIndex: 'updated-at',
    visibleInOverview: true,
  },
];
