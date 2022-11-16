<template>
  <a-layout-header class="view-filters">
    <AccountsFilter />
    <TimeRangeFilter v-if="isTimeRangeEnabled" />
  </a-layout-header>
</template>

<script>
import { ACCOUNT_INFO_ROUTE_NAMES } from '@/constants';

import TimeRangeFilter from './components/TimeRangeFilter/TimeRangeFilter.vue';
import AccountsFilter from './components/AccountsFilter/AccountsFilter.vue';

export default {
  components: {
    TimeRangeFilter,
    AccountsFilter,
  },
  computed: {
    isTimeRangeEnabled() {
      return [
        ACCOUNT_INFO_ROUTE_NAMES.CDRS,
        ACCOUNT_INFO_ROUTE_NAMES.STATISTICS,
        ACCOUNT_INFO_ROUTE_NAMES.PAYMENTS,
      ].includes(this.$route.name);
    },
  },
};
</script>

<style lang="scss">
  .view-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    padding: 0;
  }
</style>
