import Vue from 'vue';
import store from '@/store';
import Login from '@/router/Login/Login.vue';
import router from '@/router';
import '@/assets/styles/theme.less';
import '@/components/core/registerAjax';
import Util from '@/components/util/util';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

Vue.config.productionTip = false;

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

import axios from 'axios';
Vue.prototype.$axios = axios;
Vue.prototype.$util = Util;
global.vm = new Vue({
  store,
  router,
  render: h => h(Login)
}).$mount('#login');
