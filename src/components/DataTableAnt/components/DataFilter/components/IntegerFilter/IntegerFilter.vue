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
      :rules="rules"
      @finish="filter"
    >
      <a-form-item>
        <a-radio-group
          v-model:value="form.modifier"
        >
          <a-radio value="eq">
            {{ $t('message.eq') }}
          </a-radio>
          <a-radio value="gt">
            {{ $t('message.gt') }}
          </a-radio>
          <a-radio value="lt">
            {{ $t('message.lt') }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        name="value"
      >
        <a-input-number
          v-model:value="form.value"
          :placeholder="field.title"
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
  name: 'IntegerFilter',
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
        modifier: 'eq',
        value: '',
      },
      rules: {
        value: [{
          required: true,
          message: this.$t('message.filterNotCorrect'),
          trigger: 'change',
        }],
      },
    };
  },
  methods: {
    filter() {
      this.$emit('filterChange', {
        modifier: this.form.modifier,
        value: this.form.value,
        field: this.field,
      });
      this.$refs.form.resetFields();
    },
  },
};
</script>
