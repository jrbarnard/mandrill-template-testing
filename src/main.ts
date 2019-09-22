import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import './assets/sass/main.scss';

Vue.config.productionTip = false;

Vue.component(
  'sidebar-template-meta',
  () => import('./components/sidebar/TemplateMeta.vue'),
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
