<template>
  <a-button
    type="primary"
    ghost
    size="small"
    class="cdr-exports-modal-anchor-button"
    @click="showModal"
  >
    <PlusOutlined />
    {{ $t('actions.newPayment') }}
  </a-button>
  <a-modal
    v-model:visible="visible"
    :title="$t('newPaymentModal.title')"
    :ok-text="$t('newPaymentModal.submit')"
    :cancel-text="$t('newPaymentModal.cancel')"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formState"
      autocomplete="off"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      :rules="rules"
    >
      <a-form-item
        :label="$t('newPaymentModal.amount')"
        name="amount"
      >
        <a-input-number
          v-model:value="formState.amount"
          :min="5"
          :placeholder="$t('newPaymentModal.placeholder')"
          class="amount-input"
          allow-clear
        />
      </a-form-item>
    </a-form>
    <i>{{ $t('newPaymentModal.feeNotification') }}</i>
  </a-modal>
</template>
<script>
import { notification } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { mapActions } from 'vuex';
import { PAYMENTS } from '@/constants';
import locale from '../locale';

export default {
  name: 'PaymentCreateModal',
  components: {
    PlusOutlined,
  },
  i18n: locale,
  data() {
    return {
      visible: false,
      formState: {
        amount: null,
      },
      rules: {
        amount: [{
          type: 'number',
          required: true,
          min: 5,
          max: 1000,
          message: this.$t('paymentCreate.amountError'),
        }],
      },
    };
  },
  methods: {
    ...mapActions([PAYMENTS.ACTIONS.CREATE_PAYMENT]),
    showModal() {
      this.visible = true;
    },
    async handleOk() {
      try {
        const form = await this.$refs.formRef.validateFields();
        this[PAYMENTS.ACTIONS.CREATE_PAYMENT](form);
        this.visible = false;
        this.$refs.formRef.resetFields();
      } catch (e) {
        notification.error({
          message: this.$t('paymentCreate.errorNotification'),
        });
      }
    },
    handleCancel() {
      this.$refs.formRef.resetFields();
    },
  },
};
</script>
<style scoped>
.amount-input {
  width: 100%;
}
</style>
