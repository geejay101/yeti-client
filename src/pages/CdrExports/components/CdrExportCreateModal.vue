<template>
  <a-button
    type="primary"
    ghost
    size="small"
    class="cdr-exports-modal-anchor-button"
    @click="showModal"
  >
    <PlusOutlined />
    {{ $t('exportCreate.triggerButton') }}
  </a-button>
  <a-modal
    v-model:visible="visible"
    :title="$t('exportCreate.modalTitle')"
    :ok-text="$t('exportCreate.submit')"
    :cancel-text="$t('exportCreate.cancel')"
    @ok="handleOk"
  >
    <cdr-export-form ref="formRef" />
  </a-modal>
</template>
<script>
import { notification } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { mapActions } from 'vuex';
import { CDR_EXPORTS } from '@/constants';
import CdrExportForm from './CdrExportForm.vue';
import locale from '../locale';

export default {
  name: 'CdrExportModal',
  components: {
    CdrExportForm,
    PlusOutlined,
  },
  i18n: locale,
  data() {
    return {
      visible: false,
      notificationVisible: false,
      formRef: null,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    showNotification() {
      notification.info({
        message: this.$t('exportCreate.notification'),
      });
    },
    handleOk() {
      this.$refs.formRef.cdrFormRef.validateFields().then(({
        // eslint-disable-next-line camelcase
        range, duration, src_prefix_routing_eq, dst_prefix_routing_eq, success_eq,
      }) => {
        const createRequestParams = {
          time_start_gteq: range[0].$d.toISOString(),
          time_start_lt: range[1].$d.toISOString(),
        };
        if (duration.modifier !== 'eq' || duration.duration !== 0) {
          createRequestParams[`duration_${duration.modifier}`] = duration.duration;
        }
        // eslint-disable-next-line camelcase
        if (src_prefix_routing_eq) {
        // eslint-disable-next-line camelcase
          createRequestParams.src_prefix_routing_eq = src_prefix_routing_eq;
        }
        // eslint-disable-next-line camelcase
        if (dst_prefix_routing_eq) {
        // eslint-disable-next-line camelcase
          createRequestParams.dst_prefix_routing_eq = dst_prefix_routing_eq;
        }
        // eslint-disable-next-line camelcase
        if (typeof success_eq === 'boolean') {
        // eslint-disable-next-line camelcase
          createRequestParams.success_eq = success_eq;
        }

        this[CDR_EXPORTS.ACTIONS.CREATE_CDR_EXPORT](createRequestParams);
        this.visible = false;
        this.showNotification();
      }).catch((info) => {
        window.console.log('Validate Failed:', info);
      });
    },
    ...mapActions([CDR_EXPORTS.ACTIONS.CREATE_CDR_EXPORT]),
  },
};

</script>
