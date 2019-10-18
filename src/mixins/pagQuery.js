/**
 * 处理分页查询的mixin
 * 移除_isSearching: Element2.0 表单组件的 change 事件和 Pagination 的 current-change 事件现在仅响应用户交互
 * options提供配置参数：
 *              type - 请求方式 'get'、'post'
 *              loading - 是否需要loading
 *              target - 渲染loading的dom元素，可传class或id或dom对象（只能传入一个dom元素）
 *              tableData -- 用来接收返回数据存储的变量，用来应变一个页面存在多个table
 */
import q from './query';

export default {
  created () {
    this._url = '';
    this.queryParams = {};
    this._type = 'post'; // 默认post请求
    this._tableData = '';
  },
  data () {
    return {
      tableData: [],
      totalRecords: 0,
      currentPage: 1,
      size: 10,
      arr:[]
    };
  },
  methods: {
    query (url = '', params = null, options = {}) {
      // 设置请求类型后，将type存在当前实例中，调用query时直接从实例中的type取值
      if (options.type) {
        this._type = options.type;
      }
      options.type = this._type;
      //缓存存储数据的tableData变量名，用于换页时赋值
      if (options.tableData) {
        this._tableData = options.tableData;
      }
      options.tableData = this._tableData;
      if (url !== '') {
        this._url = url;
      }
      if (params) {
        // 传入查询参数时需要重置currentPage
        this.currentPage = 1;
        this.queryParams = Object.assign({}, params);// 缓存查询参数
      }
      let data = Object.assign({}, this.queryParams, {
        size: this.size,
        start: (this.currentPage - 1) * this.size
      });
      return q(this._url, data, options, this).then((res) => {
        if (res.totalRecords) {
          this.totalRecords = res.totalRecords;
        } else if (this.currentPage === 1) {
          this.totalRecords = 0;
        }
        this.tableData = res.data || [];
        if (options.tableData) {
          this[options.tableData] = this.tableData;
        }
        return res;
      });
    },
    handleSizeChange (size) {
      this.currentPage = 1;
      this.size = size;
      this.query();
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage;
      this.query('',null,{'tableData':this._tableData});
    },
    indexMethod (index) {
      return index + 1 + (this.currentPage - 1) * this.size;
    },
    reverseOrder (index) {
      return this.tableData.length - index;
    }
  }
};