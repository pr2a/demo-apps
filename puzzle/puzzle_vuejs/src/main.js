// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import './filter';
import './icon';
import router from './router';
import SocialSharing from 'vue-social-sharing';

Vue.config.productionTip = false;
Vue.use(SocialSharing);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
