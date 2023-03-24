import { createApp } from 'vue';
import { sync } from 'vuex-router-sync';
import AntVue from 'ant-design-vue';
import { createI18n } from 'vue-i18n';
import Notifications from '@kyvg/vue3-notification';
import * as Sentry from '@sentry/vue';
import 'ant-design-vue/dist/antd.min.css';

import App from './App.vue';
import { router } from './router';
import store from './store/store';

sync(store, router);

const i18n = createI18n();

const app = createApp(App);

Sentry.init({
  app,
  dsn: 'https://7725872f254e423f8d07b8b2b17b58f2@errors.yeti-switch.org/3',
  environment: window.location.hostname,
  denyUrls: [
    'http://localhost',
  ],
});

app.use(AntVue)
  .use(Notifications)
  .use(router)
  .use(store)
  .use(i18n)
  .mount('#app');

// Setting up page title
document.head.querySelector('title').textContent = YETI_CONFIG.yeti.pageTitle;
