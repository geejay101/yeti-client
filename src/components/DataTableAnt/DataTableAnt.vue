<template>
  <div id="dataTableAnt">
    <div
      :style="{overflow: hiddenIfLoading}"
      class="dataTable"
    >
      <a-row
        v-if="filterable"
        :gutter="[16, 16]"
      >
        <a-col
          :span="24"
          class="gutter-row"
        >
          <DataFilter
            :fields="fields"
            :active-filters="activeFilters"
            @filterChange="onFilterChange"
          />
        </a-col>
      </a-row>
      <a-table
        :columns="visibleInOverview"
        :data-source="items"
        :pagination="{ pageSize: 50, total: rows, hideOnSinglePage: true }"
        :loading="requestIsPending"
        @change="onPaginationChange"
      >
        <span
          slot="badge"
          slot-scope="badge"
        >
          <a-tag
            :key="badge"
            :color="badge === 'No' || badge === 'false' ? 'volcano' : 'green'"
          >
            {{ badge }}
          </a-tag>
        </span>
        <template
          v-if="expandable"
          v-slot:expandedRowRender="record"
        >
          <a-descriptions>
            <a-descriptions-item
              v-for="(field) of fields"
              :key="field.key"
              :label="field.title"
            >
              {{ record[field.key] }}
            </a-descriptions-item>
          </a-descriptions>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import locale from './locale';
import DataFilter from './components/DataFilter/DataFilter';

export default {
  name: 'DataTableAnt',
  components: {
    DataFilter,
  },
  i18n: locale,
  props: {
    filterable: {
      type: Boolean,
      default: false,
    },
    activeFilters: {
      type: Object,
      default() {
        return {};
      },
    },
    setFilter: {
      type: Function,
      default() {
        return null;
      },
    },
    rows: {
      type: Number,
      default: 0,
    },
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    getData: {
      type: Function,
      default() {
        return [];
      },
    },
    expandable: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['requestIsPending']),
    hiddenIfLoading() {
      return this.requestIsPending ? 'hidden' : 'visible';
    },
    visibleInOverview() {
      return this.fields.filter((field) => field.visibleInOverview);
    },
  },
  methods: {
    onFilterChange(filter) {
      this.setFilter(filter);
    },
    onPaginationChange(page) {
      this.getData(page.current);
    },
  },
};
</script>

<style lang="scss">
.ant-table {
  td {
    white-space: nowrap;
  }

  .ant-table-row {
    td {
      padding: 10px;
    }
  }

  table {
    width: 100% !important;
  }
}

.ant-table-wrapper {
  .ant-table-pagination {
    &.ant-pagination {
      float: left;

      .anticon {
        vertical-align: .125em;
      }
    }
  }
  .ant-table-body {
    background-color: #ffffff;
  }
  .ant-table-row {
    background-color: #ffffff;
  }
}
</style>
