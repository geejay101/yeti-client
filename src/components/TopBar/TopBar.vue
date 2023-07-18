<template>
  <a-layout-header class="top-bar">
    <TimeRangeFilter v-if="isTimeRangeEnabled" />
    <AccountsFilter />
    <a-tooltip
      :title="$t('message.logout')"
      placement="bottomRight"
    >
      <a-button
        type="text"
        class="logout-btn"
        @click="logoutHandler"
      >
        <LogoutOutlined />
      </a-button>
    </a-tooltip>
  </a-layout-header>
</template>

<script>
import { mapActions } from 'vuex';
import { LogoutOutlined } from '@ant-design/icons-vue';
import { ACCOUNT_INFO_ROUTE_NAMES, AUTH } from '@/constants';
import locale from './locale';

import TimeRangeFilter from './components/TimeRangeFilter/TimeRangeFilter.vue';
import AccountsFilter from './components/AccountsFilter/AccountsFilter.vue';

export default {
  i18n: locale,
  components: {
    TimeRangeFilter,
    AccountsFilter,
    LogoutOutlined,
  },
  computed: {
    isTimeRangeEnabled() {
      return [
        ACCOUNT_INFO_ROUTE_NAMES.CDRS,
        ACCOUNT_INFO_ROUTE_NAMES.STATISTICS,
        ACCOUNT_INFO_ROUTE_NAMES.PAYMENTS,
        ACCOUNT_INFO_ROUTE_NAMES.ORIGINATION_STATISTICS,
      ].includes(this.$route.name);
    },
  },
  methods: {
    ...mapActions([AUTH.ACTIONS.LOGOUT]),
    logoutHandler() {
      this[AUTH.ACTIONS.LOGOUT]().then(() => this.$router.push('/login'));
    },
  },
};
</script>

<style lang="scss">
  .logout-btn {
    margin-right: 10px;
  }
  .top-bar {
    color: #4f5258;
    display: flex;
    justify-content: flex-end;
    height: 3rem;
    align-items: center;
    padding: 0;
    gap: 10px;
    border-bottom: 1px solid #dee2e6;
    background: #fafafa;
  }
</style>
