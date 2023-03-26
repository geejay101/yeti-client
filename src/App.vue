<template>
  <div id="app">
    <notifications />
    <div
      v-if="isApplicationLoading"
      class="loadmask"
    >
      <loading-outlined
        class="loader"
      />
    </div>
    <main>
      <NavBar />
      <a-layout>
        <top-bar v-if="isAuthenticated" />
        <a-layout-content>
          <div class="working-area-wrapper">
            <router-view :name="loginRouteName" />
            <router-view :name="filtersRouteName" />
            <router-view />
          </div>
        </a-layout-content>
      </a-layout>
    </main>
  </div>
</template>

<script>
import { LoadingOutlined } from '@ant-design/icons-vue';

import { mapGetters } from 'vuex';
import NavBar from './components/NavBar/NavBar.vue';
import {
  AUTH, NOTIFICATION_TYPES, GENERAL_ROUTE_NAMES,
} from './constants';
import api from './api';
import TopBar from './components/TopBar/TopBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    LoadingOutlined,
    TopBar,
  },
  data() {
    return {
      type: NOTIFICATION_TYPES.ERROR,
      loginRouteName: GENERAL_ROUTE_NAMES.LOG_IN,
      filtersRouteName: GENERAL_ROUTE_NAMES.VIEW_FILTERS,
    };
  },
  computed: {
    ...mapGetters(['locale', 'requestIsPending', 'isAuthenticated']),
    isApplicationLoading() {
      return this.requestIsPending && this.$route.name === 'login';
    },
  },
  watch: {
    isAuthenticated() {
      this.$router.push(this.$route.query.redirect || '/');
    },
  },
  async beforeCreate() {
    await this.$store.dispatch(AUTH.ACTIONS.LOCAL_AUTH);
    api.apiInstance.insertNetworkErrorMiddleware(this.$notify, this.$store.dispatch);
    api.apiInstance.insertNetworkAuthErrorMiddleware(this.$router, this.$store.dispatch);
  },
  created() {
    this.$i18n.locale = this.locale;
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 00px;
}

a[disabled] {
  pointer-events: none;
}

.loadmask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #a3a3a3aa;
  z-index: 2;
}

.loader {
  font-size: 30px;
  position: relative;
  top: 40vh;
  width: 30px;
  height: 30px;
}

main {
  height: 100vh;
  display: flex;
  /* Aligned to the height of charts */
  /* min-height: 900px; */
}

.working-area-wrapper {
  flex: 1 1 auto;
  width: calc(100vw - 230px);
  padding: 10px 10px 0;
  background-color: #ecf0f5;
  overflow: auto;
}
</style>
