let path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir);
}
let express = require('express');
let app = express();
let port = 8085;

let customConfig = null;
try {
  customConfig = require('./custom.config');
} catch (e) {}

let entry = {
  'index': './src/index.js',
  'account': './src/view/account.js'
}
let dev = {}
Object.keys(entry).forEach(function (key) {
  dev[key] = {
    // entry for the page
    entry: entry[key],
    // the source template
    template: './public/' + key + '.html',
    filename: key + '.html',
  }
});

module.exports = {
  pages: dev,
  // baseUrl  type:{string} default:'/' 
  baseUrl: '/',
  // 将部署应用程序的基本URL。
  // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
  // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.
  // baseUrl: process.env.NODE_ENV === 'development' ? '/' : '/ka-admin',
  outputDir: 'dist',
  // //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  //指定生成的 index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)
  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: true,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('@util', resolve('src/components/util'))
      .set('@ui', resolve('src/components/ui'))
      .set('@assets',resolve('src/assets'))
      .set('@mixins',resolve('src/mixins'))
    // config.module.rule('eslint').use('eslint-loader')
  },
  runtimeCompiler: true,   //设置热更新
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项
  devServer: {
    port: port, // 端口号
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器,
    index: '/account.html',   //启动项目后，默认进入的页面地址
    overlay: { //通过设置让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    proxy: Object.assign({
      '/api': {
        target: 'http://192.168.1.29:81',
        // target: 'http://pre.e.fanxiaojian.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
      }
      },
    }, (customConfig ? customConfig.proxyTable : {})),
    before(app) {
      //mock数据
      app.use('/mock', function (req, res) {
        var urls = req.url.split('?')[0].split('/');
        var url = [];
        urls.forEach((u) => {
          if (isNaN(parseInt(u))) {
            url.push(u);
          }
        });
        url = url.join('/');

        var mockPath = path.join(__dirname, './mock', url + '.js');
        var mock = require(mockPath);
        delete require.cache[mockPath];
        if (mock['m-type'] === 'select') {
          var ret = [];
          for (var i = 0; i < 5; i++) {
            var data = {};
            data[mock.fields[0]] = i;
            data[mock.fields[1]] = '选项' + (i + 1);
            ret.push(data)
          }
          res.status(200).json({
            data: mock.isStringify ? JSON.stringify(ret) : ret
          });
        } else {
          res.status(200).json(mock);
        }
      });
    }
  }
}