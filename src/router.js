/* jshint esversion: 6 */ 
import Vue from 'vue';
import Router from 'vue-router';
const Table = r => require.ensure([], () => r(require('@/router/Table/TableList.vue')), 'Table');
const Detail = r => require.ensure([], () => r(require('@/router/Table/Detail.vue')), 'Table');
const List = r => require.ensure([], () => r(require('@/router/Table/List.vue')),'Table');
const DynamicTable = r => require.ensure([], () => r(require('@/router/Table/DynamicTable/index')),'Table');
const EditTable = r => require.ensure([], () => r(require('@/router/Table/EditTable')),'Table');
const ComplexTable = r => require.ensure([], () => r(require('@/router/Table/ComplexTable')),'Table');
const AddTable = r => require.ensure([], () => r(require('@/router/Table/AddTable')),'Table');

const Login = r => require.ensure([], () => r(require('@/router/Login/Login.vue')), 'Login');

const Line = r => require.ensure([], () => r(require('@/router/Charts/LineCharts.vue')), 'Charts');
const MixChart = r => require.ensure([], () => r(require('@/router/Charts/MixChart.vue')), 'Charts');

const Tree = r => require.ensure([], () => r(require('@/router/Components/Tree/Tree.vue')), 'Components');
const PanelGroup = r => require.ensure([], () => r(require('@/router/Components/PanelGroup/PanelGroup.vue')), 'Components');
const FileUpload = r => require.ensure([], () => r(require('@/router/Components/FileUpload/FileUpload')), 'Components');
const Search = r => require.ensure([], () => r(require('@/router/Components/Search/Search')), 'Components');
const Dragable = r => require.ensure([], () => r(require('@/router/Components/Dragable/Dragable')), 'Components');
const Tinymce = r => require.ensure([], () => r(require('@/router/Components/Tinymce/tinymce')), 'Components');

const Permission = r => require.ensure([], () => r(require('@/router/System/Permission')), 'System');
const Roles = r => require.ensure([], () => r(require('@/router/System/Roles')), 'System');

const Map = r => require.ensure([], () => r(require('@/router/map')), 'Map');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/TableList'
    },
    {
      name: '登录',
      path: '/login',
      component:Login,
    },
    {
      name: '表格',
      path: '/TableList',
      component:Table,
      meta: {
        title: '表格功能'
      }
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail,
      meta: {
        title: [{
          name: '表格功能',
          path: '/Table/Detail',
        }, {
          name: '表单提交校验'
        }]
      }
    },
    {
      path: '/List',
      name: '统计发范德萨发斯蒂芬',
      component: List,
      meta: {
        title: '表格统计筛选排序'
      }
    },
    {
      path: '/DynamicTable',
      name: '动态表格',
      component: DynamicTable ,
      meta: {
        title: '动态表格'
      }
    },
    {
      path: '/EditTable',
      name: 'EditTable',
      component: EditTable ,
      meta: {
        title: '可编辑表格'
      }
    },
    {
      path: '/Table/ComplexTable',
      name: 'ComplexTable',
      component: ComplexTable ,
      meta: {
        title: '综合性表格'
      }
    },
    {
      path: '/Table/AddTable',
      name: 'AddTable',
      component: AddTable ,
      meta: {
        title: '添加行表格'
      }
    },
    {
      path: '/Components/Tree/Tree',
      name: 'Tree',
      component: Tree,
      meta: {
        title: '树结构'
      }
    },
    {
      path: '/Components/PanelGroup/PanelGroup',
      name: 'PanelGroup',
      component: PanelGroup,
      meta: {
        title: '卡片'
      }
    },
    {
      path: '/Components/FileUpload/FileUpload',
      name: 'FileUpload',
      component: FileUpload,
      meta: {
        title: '文件上传'
      }
    },
    {
      path: '/Components/Search/Search',
      name: 'Search',
      component: Search,
      meta: {
        title: '通用搜索'
      }
    },
    {
      path: '/Components/Dragable/Dragable',
      name: 'Dragable',
      component: Dragable,
      meta: {
        title: '可拖拽todolist'
      }
    },
    {
      path: '/Components/Tinymce',
      name: '富文本编辑器',
      component: Tinymce,
      meta: {
        title: '富文本编辑器'
      }
    },
    //登录
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
   
    {
      path: '/Charts/LineCharts',
      name: 'echart',
      component: Line,
      meta: {
        title: '柱状图'
      }
    },
    {
      path: '/Charts/MixChart',
      name: 'Mixchart',
      component: MixChart,
      meta: {
        title: '混合图表'
      }
    },
    {
      path: '/System/Permission',
      name: 'Permission',
      component: Permission,
      meta: {
        title: '权限管理'
      }
    },
    {
      path: '/System/Roles',
      name: 'Roles',
      component: Roles,
      meta: {
        title: '角色管理'
      }
    },
    //地图
    {
      path: '/Components/Map',
      name: 'map',
      component: Map,
      meta: {
        title: '地图'
      }
    }
    
  ]
});
router.beforeEach((to, from, next) => {
  //此处获取用户信息，可以用你自己的方式获取登陆后用户信息
  const userInfo = localStorage.userInfo;
  //判断是否存在用户信息、或者该页面是否需要登陆
  if (userInfo || !to.meta.login ) {
    //如果能获取到用户信息，说明用户登陆了，或者该页面不需要登陆也能进入就直接放行进入该页面
    next();
  } else {
    //否则的跳转到登陆页面，并且带上当前页面的地址，用于登陆后重新跳回来
    next({
      name: 'Login',
      query: {
        redirect: to.fullPath//当前页面的地址
      }
    });
  }

});

export default router;