<template>
  <div class="accounts-filter">
    <span v-if="activeAccount">
      <dollar-outlined />
      {{ $t('message.balance') }} {{ balance }}
    </span>
    <a-dropdown
      v-if="activeAccount"
      :trigger="['click']"
      @visible-change="visibleChange"
    >
      <template #overlay>
        <a-menu
          @click="handleMenuClick"
        >
          <a-menu-item
            v-for="account in accounts"
            :key="account.id"
          >
            {{ account.name }}
          </a-menu-item>
        </a-menu>
      </template>
      <div>
        <a-button
          type="text"
          style="margin-left: 5px"
        >
          <user-outlined />
          <span>
            {{ activeAccount.name }}
          </span>
          <down-outlined
            :rotate="bgIconRotate"
            class="dropdown-icon"
          />
        </a-button>
      </div>
    </a-dropdown>
  </div>
</template>

<script>
import { UserOutlined, DownOutlined, DollarOutlined } from '@ant-design/icons-vue';
import { mapGetters, mapActions } from 'vuex';

import { ACCOUNTS } from '@/constants';

import locale from './locale';

export default {
  i18n: locale,
  components: {
    UserOutlined,
    DownOutlined,
    DollarOutlined,
  },
  data() {
    return {
      visible: undefined,
    };
  },
  computed: {
    ...mapGetters(['activeAccount', 'accounts']),
    bgIconRotate() {
      return this.visible ? 180 : 0;
    },
    balance() {
      return Number(this.activeAccount?.balance).toFixed(2);
    },
  },
  created() {
    this[ACCOUNTS.ACTIONS.GET_ACCOUNTS]();
  },
  methods: {
    ...mapActions([ACCOUNTS.ACTIONS.GET_ACCOUNTS, ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID]),
    handleMenuClick(e) {
      if (this.activeAccount.id !== e.key) {
        this[ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID](e.key);
      }
    },
    visibleChange(visible) {
      this.visible = visible;
    },
  },
};
</script>

<style lang="scss" scoped>
.accounts-filter {
  display: flex;
  gap: 10px
}

.dropdown-icon {
  font-size: 0.6rem;
}
</style>
