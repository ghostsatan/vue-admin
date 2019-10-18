import Vue from 'vue';
import moment from 'moment';

//时间戳转换(毫秒)
Vue.filter('timeReturn', (value, type = '') => {
  value = +value;
  switch (type) {
    case '':
      if (value === 0){
        return '--';
      } else {
        return moment(Number(value)).format('YYYY-MM-DD HH:mm:ss') || '--';
      }
    case 'D':
    case 'd':
    case 'day':
    case 'Day':
      return value ? moment(+value).format('YYYY-MM-DD') : '--';
    default:
      return value;
  }
});

