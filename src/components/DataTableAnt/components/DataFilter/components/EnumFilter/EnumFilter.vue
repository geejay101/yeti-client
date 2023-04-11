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
      <a-form-item>
        <a-radio-group
          v-model:value="form.modifier"
        >
          <a-radio value="eq">
            {{ $t('message.eq') }}
          </a-radio>
          <a-radio value="in">
            {{ $t('message.in') }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        v-if="form.modifier === 'eq'"
        name="value"
      >
        <a-radio-group
          v-model:value="form.value"
          :options="field.filterValues"
        />
      </a-form-item>
      <a-form-item
        v-if="form.modifier === 'in'"
        name="value"
      >
        <a-checkbox-group
          v-model:value="form.value"
          :options="field.filterValues"
        />
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
  name: 'EnumFilter',
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
        value: [],
        modifier: '',
      },
    };
  },
  methods: {
    filter() {
      this.$emit('filterChange', {
        modifier: this.form.modifier,
        value: typeof this.form.value === 'string' ? this.form.value : this.form.value.join(','),
        field: this.field,
      });
      this.$refs.form.resetFields();
    },
  },
};
</script>
