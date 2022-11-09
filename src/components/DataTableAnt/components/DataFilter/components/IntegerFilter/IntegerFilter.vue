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
      :rules="rules"
      @submit.prevent="filter"
    >
      <a-form-model-item>
        <a-radio-group
          v-model="form.modifier"
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
      </a-form-model-item>
      <a-form-model-item
        prop="value"
      >
        <a-input-number
          v-model="form.value"
          :placeholder="field.title"
        />
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('filterChange', {
            modifier: this.form.modifier,
            value: this.form.value,
            field: this.field,
          });
          this.$refs.form.resetFields();
        }
        return valid;
      });
    },
  },
};
</script>
