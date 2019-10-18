import Vue from 'vue';
import axios from 'axios';
axios.interceptors.request.use(config => {
  return config;
}

);
axios.interceptors.response.use(function (response) {
  console.log(response);
  if (response.data.code === 401) {
    //  登录失效操作
    global.vm.$message.error('登录失效，请重新登录');
    setTimeout(() => {
      window.location.href = '/account.html';
    }, 1000);
  } else {
    return response.data;
  }
}, function (error) {
  console.log(11111,error);
  if (error.response.status === 401) {
    //  登录失效操作
    global.vm.$message.error('登录失效，请重新登录');
    setTimeout(() => {
      window.location.href = '/account.html';
    }, 1000);
  } else if (error.response.status === 500) {
    global.vm.$message.error('服务器异常，请稍后再试');
  }
  return Promise.reject(error);
});

Vue.prototype.$axios = axios;