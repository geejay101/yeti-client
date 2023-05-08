<template>
  <span>
    <a-select
      :value="value.modifier"
      style="width: 300px; margin-right: 8px"
      :options="[
        { value: 'eq', label: $t('message.eq') },
        { value: 'gteq', label: $t('message.gteq') },
        { value: 'lteq', label: $t('message.lteq')},
      ]"
      @change="onModifierChange"
    />
    <a-input
      type="text"
      :value="value.duration"
      style="width: calc(100% - 308px)"
      @change="onDurationChange"
    />
  </span>
</template>

<script>
import { defineComponent } from 'vue';
import { Form } from 'ant-design-vue';
import locale from '@/components/DataTableAnt/components/DataFilter/locale';

export default defineComponent({
  props: {
    value: { type: Object, isRequired: true, default: null },
  },
  i18n: locale,
  emits: ['update:value'],
  setup(props, { emit }) {
    const formItemContext = Form.useInjectFormItemContext();
    const triggerChange = (changedValue) => {
      emit('update:value', { ...props.value, ...changedValue });
      formItemContext.onFieldChange();
    };
    const onDurationChange = (e) => {
      const duration = parseInt(e.target.value || '0', 10);
      triggerChange({ duration });
    };
    const onModifierChange = (modifier) => {
      triggerChange({ modifier });
    };

    return {
      onDurationChange,
      onModifierChange,
    };
  },
});
</script>
