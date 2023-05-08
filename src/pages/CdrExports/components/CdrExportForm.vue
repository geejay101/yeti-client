<template>
  <a-form
    ref="formRef"
    :model="formState"
    name="basic"
    :label-col="{ span: 14 }"
    autocomplete="off"
    layout="vertical"
    :rules="rules"
  >
    <a-form-item
      :label="$t('exportCreate.range')"
      name="range"
    >
      <a-range-picker
        v-model:value="formState.range"
        show-time
        style="width: 100%"
      />
    </a-form-item>
    <a-form-item
      :label="$t('exportCreate.duration')"
      name="duration"
    >
      <CdrExportDurationPicker
        v-model:value="formState.duration"
      />
    </a-form-item>

    <a-form-item
      :label="$t('exportCreate.src-prefix-routing')"
      name="src_prefix_routing_eq"
    >
      <a-input v-model:value="formState.src_prefix_routing_eq" />
    </a-form-item>

    <a-form-item
      :label="$t('exportCreate.dst-prefix-routing')"
      name="dst_prefix_routing_eq"
    >
      <a-input v-model:value="formState.dst_prefix_routing_eq" />
    </a-form-item>

    <a-form-item
      :label="$t('exportCreate.success')"
      name="success_eq"
    >
      <a-switch v-model:checked="formState.success_eq" />
    </a-form-item>
  </a-form>
</template>
<script>
import locale from '../locale';
import CdrExportDurationPicker from './CdrExportDurationPicker.vue';

export default {
  name: 'CdrExportForm',
  components: { CdrExportDurationPicker },
  i18n: locale,
  emits: [
    'cdrExportCreated',
  ],
  data() {
    return {
      cdrFormRef: null,
      formState: {
        range: [],
        duration: { modifier: 'eq', duration: 0 },
        src_prefix_routing_eq: '',
        dst_prefix_routing_eq: '',
        success_eq: false,
      },
      rules: {
        range: [{
          type: 'array',
          required: true,
          message: this.$t('exportCreate.rangeError'),
        }],
      },
    };
  },
  mounted() {
    this.cdrFormRef = this.$refs.formRef;
  },
};
</script>
