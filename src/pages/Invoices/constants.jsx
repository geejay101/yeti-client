import DownloadCell from '@/components/DataTableAnt/components/DownloadCell.vue';

export const TABLE_HEADERS_ANT = [
  {
    key: 'has-pdf',
    dataIndex: 'has-pdf',
    visibleInOverview: true,
    customRender({ record }) {
      return <DownloadCell disabled={!record['has-pdf'] ?? false } resource={`${record.links.self}`} />;
    },
  },
  {
    key: 'reference',
    dataIndex: 'reference',
    visibleInOverview: true,
  },
  {
    key: 'period',
    dataIndex: 'period',
    visibleInOverview: true,
  },
  {
    key: 'id',
    dataIndex: 'id',
    visibleInOverview: false,
  },
  {
    key: 'amount',
    dataIndex: 'amount',
    visibleInOverview: true,
  },
  {
    key: 'billing-duration',
    dataIndex: 'billing-duration',
    visibleInOverview: true,
  },
  {
    key: 'calls-count',
    dataIndex: 'calls-count',
    visibleInOverview: true,
  },
  {
    key: 'calls-duration',
    dataIndex: 'calls-duration',
    visibleInOverview: false,
  },
  {
    key: 'first-call-at',
    dataIndex: 'first-call-at',
    visibleInOverview: true,
  },
  {
    key: 'first-successful-call-at',
    dataIndex: 'first-successful-call-at',
    visibleInOverview: false,
  },
  {
    key: 'last-call-at',
    dataIndex: 'last-call-at',
    visibleInOverview: true,
  },
  {
    key: 'last-successful-call-at',
    dataIndex: 'last-successful-call-at',
    visibleInOverview: false,
  },
  {
    key: 'successful-calls-count',
    dataIndex: 'successful-calls-count',
    visibleInOverview: false,
  },
];
