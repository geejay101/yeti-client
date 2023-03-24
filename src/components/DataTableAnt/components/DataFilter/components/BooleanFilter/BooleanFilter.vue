<template>
  <div>
    <p
      class="field-desc"
    >
      {{ field.title }}
    </p>
    <a-form
      ref="form"
      :model="form"
      @finish="filter"
    >
      <a-form-item
        name="value"
      >
        <a-radio-group
          v-model:value="form.value"
        >
          <a-radio :value="true">
            {{ $t('message.yes') }}
          </a-radio>
          <a-radio :value="false">
            {{ $t('message.no') }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          {{ $t('message.applyFilter') }}
        </a-button>
      </a-form-item>
    </a-form>
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
  emits: [
    'filterChange',
  ],
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
