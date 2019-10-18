import {Loading} from 'element-ui'; // 统一加loading

/**
 * 提供查询的方法，并且完成loading，
 * 可通过传options的target字段指定loading对象，默认选取table元素
 * @param url 查询地址
 * @param params 查询参数
 * @param options 配置选项，包括是否添加loading、请求类型。
 * @param _this 当前的vue实例
 * @returns {Promise.<TResult>}
 */
export default (url = '', params = null, options = {}, _this) => {
  options.loading = options.loading === undefined ? true : options.loading;
  options.type = options.type === undefined ? 'post' : options.type;
  let loadingInstance = null;
  if (options.loading) {
    _this.$nextTick(() => { // nextTick时 取到 dialog中的el-table
      let tableInDialog = document.querySelector('.el-dialog__body .el-table');
      let table = document.querySelector('.el-table');

      _this._loadingDom = _this._loadingDom || (options.target
        ? returnDom(options.target)
        : (tableInDialog ? tableInDialog : table));
      loadingInstance = Loading.service({target: _this._loadingDom}); // 添加loading
    });
  }
  if (options.type === 'post') {
    return _this.$axios.post(url, params).then(res => {
      setTimeout(() => {
        if (options.loading) {
          loadingInstance.close(); // 接口返回移除loading
        }
      }, 400);
      return res;
    }).catch((error) => {
      setTimeout(() => {
        if (options.loading) {
          loadingInstance.close();// 异常移除loading
        }
      }, 400);
      console.error(error);
    });
  } else {
    return _this.$axios.get(`${url}?${_this.$qs.stringify(params)}`).then(res => {
      setTimeout(() => {
        if (options.loading) {
          loadingInstance.close();// 接口返回移除loading
        }
      }, 400);
      return res;
    }).catch((error) => {
      setTimeout(() => {
        if (options.loading) {
          loadingInstance.close();// 异常移除loading
        }
      }, 400);
      console.error(error);
    });
  }
};

function returnDom (dom) {
  return typeof dom === 'string' ? document.querySelector(dom) : dom;
}
