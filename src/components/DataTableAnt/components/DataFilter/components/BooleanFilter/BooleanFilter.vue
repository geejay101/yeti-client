<template>
  <div>
    <p
      class="field-desc"
    >
      {{ field.title }}
    </p>
    <a-form-model
      ref="form"
      :model="form"
      @submit.prevent="filter"
    >
      <a-form-model-item
        prop="value"
      >
        <a-radio-group
          v-model="form.value"
        >
          <a-radio :value="true">
            {{ $t('message.yes') }}
          </a-radio>
          <a-radio :value="false">
            {{ $t('message.no') }}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          {{ $t('message.applyFilter') }}
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import locale from '../../locale';

export default {
  name: 'BooleanFilter',
  i18n: locale,
  props: {
    field: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      form: {
        value: true,
      },
    };
  },
  methods: {
    filter() {
      this.$emit('filterChange', {
        modifier: 'eq',
        value: this.form.value,
        field: this.field,
      });
      this.$refs.form.resetFields();
    },
  },
};
</script>
