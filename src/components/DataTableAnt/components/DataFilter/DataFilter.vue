<template>
  <div id="filterView">
    <a-tag
      v-for="(filter, key) in activeFilters"
      :key="key"
      type="primary"
      color="#108ee9"
      closable
      @close="() => removeFilter(key)"
    >
      <b>{{ filter.field.title }} {{ $t(`message.${filter.modifier}`) }}</b>: {{ filter.value }}
    </a-tag>

    <a-dropdown
      v-model:visible="visible"
      placement="bottomLeft"
      :trigger="['click']"
    >
      <a-tag
        type="dashed"
        class="filter-btn"
      >
        <plus-outlined />
        {{ $t('message.addFilter') }}
      </a-tag>
      <template #overlay>
        <a-menu>
          <a-sub-menu
            v-for="(field, index) in filterFields"
            :key="index"
            :title="field.title"
          >
            <component
              :is="getFilterComponent(field.filter)"
              :field="field"
              class="filter"
              @filter-change="onFilterChange"
            />
          </a-sub-menu>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { unset } from 'lodash';
import { PlusOutlined } from '@ant-design/icons-vue';

import BooleanFilter from './components/BooleanFilter/BooleanFilter.vue';
import StringFilter from './components/StringFilter/StringFilter.vue';
import IntegerFilter from './components/IntegerFilter/IntegerFilter.vue';

import locale from './locale';

export default {
  name: 'DataFilter',
  components: {
    PlusOutlined,
    BooleanFilter,
    StringFilter,
    IntegerFilter,
  },
  i18n: locale,
  props: {
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    activeFilters: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: [
    'filterChange',
  ],
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    filterFields() {
      return this.fields.filter((field) => ['boolean', 'integer', 'string'].includes(field.filter));
    },
  },
  methods: {
    getFilterComponent(type) {
      return `${type}-filter`;
    },
    onFilterChange(filter) {
      this.visible = false;
      const key = `${filter.field.key}-${filter.modifier}`;
      this.$emit('filterChange', {
        ...this.activeFilters,
        [key]: filter,
      });
    },

    removeFilter(filter) {
      unset(this.activeFilters, filter);
      this.$emit('filterChange', this.activeFilters);
    },
  },

};
</script>

<style lang="scss">
.filter {
  width: 15rem;
  padding: 10px 20px 10px 20px;

  .field-desc {
    font-weight: 500;
  }
  .ant-form-item {
    margin: 0 0 10px;
  }
  .ant-radio-group {
    display: flex;
    flex-direction: column;
  }
  .ant-input-number {
    width: 100%;
  }
  .ant-btn {
    width: 100%;
  }
}
</style>
