import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import moment from 'moment';
import '@/assets/styles/theme.less';
import '@/components/core/registerAjax';
import '@/components/core/registerFilter';
import '@/components/core/registerCore';
import '@/components/core/registerDirective';
import Util from '@/components/util/util';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 


moment.locale('zh-cn');
Vue.prototype.$moment = moment;

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
  router,
  store,
  render: h => h(App)
}).$mount('#app');
