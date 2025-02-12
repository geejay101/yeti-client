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
            @filter-change="onFilterChange"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col
          :span="24"
          class="action-bar"
        >
          <slot name="action-bar" />
        </a-col>
      </a-row>
      <a-table
        :columns="visibleInOverview"
        :data-source="items"
        :pagination="{
          current: currentPage,
          pageSize: 50,
          total: rows,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }"
        :loading="requestIsPending"
        @change="onPaginationChange"
      >
        <template
          v-if="expandable"
          #expandedRowRender="{ record }"
        >
          <a-descriptions>
            <a-descriptions-item
              v-for="(field) of fields"
              :key="field.key"
              :label="field.title"
            >
              {{ record[field.key] }}
              <span class="quick-filter">
                <ZoomInOutlined
                  v-if="field.filter"
                  @click="() => addQuickFilter(field, record[field.key])"
                />
              </span>
            </a-descriptions-item>
          </a-descriptions>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ZoomInOutlined } from '@ant-design/icons-vue';

import locale from './locale';
import DataFilter from './components/DataFilter/DataFilter.vue';

export default {
  name: 'DataTableAnt',
  components: {
    DataFilter,
    ZoomInOutlined,
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
      currentPage: 1,
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
      this.currentPage = 1;
      this.setFilter(filter);
    },
    onPaginationChange(page) {
      this.currentPage = page.current;
      this.getData(page.current);
    },
    addQuickFilter(field, value) {
      const key = `${field.key}-eq`;

      this.currentPage = 1;
      this.setFilter({
        ...this.activeFilters,
        [key]: {
          modifier: 'eq',
          value,
          field,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ant-col {
  padding: 8px;
}
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

  .quick-filter {
    margin-left: 3px;
    color: #1990ff;
    font-size: 0.75rem;
  }
}
.action-bar {
  display: flex;
  gap: 5px;
  background: #fafafa;
}
.action-bar:empty {
  display: none;
}
</style>
