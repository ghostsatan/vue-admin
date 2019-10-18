<template>
  <div id="app">
    <NavBar />
    <div class="body-content">
      <SideNav />
      <div class="content-wrapper">
        <BreadCrumb/>
         <div class="app-wrap">
        <!-- 此处放置el-tabs代码 -->
        <!-- <div class="template-tabs">
          <el-tabs
            v-model="activeIndex"
            type="border-card"
            closable
            @tab-click="tabClick"
            v-if="options.length"
            @tab-remove="tabRemove">
            <el-tab-pane
              :key="item.name"
               v-for="(item) in options"
              :label="item.name"
              :name="item.route">
            </el-tab-pane>
          </el-tabs>
        </div>
          <div class="content-wrap">
            <router-view/>
          </div> -->
      </div>
        <div class="app-content">
          <div class="content-inner-wrapper">
            <router-view v-if="isRouterAlive"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from './components/ui/BreadCrumb/BreadCrumb.vue';
import NavBar from './components/ui/NavBar/NavBar.vue';
import SideNav from './components/ui/SideNav/SideNav.vue';
export default {
  provide () {
    return {
      reload: this.reload
    };
  },
  components: {
    BreadCrumb,
    NavBar,
    SideNav,
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  created () {
    //获取vuex里的数据
    this.$axios.post("mock/test/role").then(res => {
      if (res.code === 200) {
        this.$store.commit('setUserInfo', res.data);
      }
    });
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      });
    },
    //tab切换时，动态的切换路由
    tabClick (tab) {
      let path = this.activeIndex;
      console.log(path);
      // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
      if (this.activeIndex === '/userInfo') {
        // path = this.activeIndex + '/' + this.$store.state.userInfo.name;
      }
      this.$router.push({path: path});
    },
    tabRemove (targetName) {
      // 首页不可删除
      // if(targetName == '/') {
      //   return;
      // }
      this.$store.commit('delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          console.log(this.options);
          this.$store.commit('set_active_index', this.options[this.options.length-1].route);
          this.$router.push({path: this.activeIndex});
        } else {
          // this.$router.push({path: '/'});
        }
      }
    }
  },
  computed: {
    options () {
      return this.$store.state.options;
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex;
      },
      set (val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  watch: {
    '$route'(to) {
      let flag = false;
      for (let option of this.options ) {
        if (option.name === to.name) {
          flag = true;
          this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
        this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
      }
    }
  }
};
</script>

<style lang="less">
#app {
  // position: relative;
  .el-table th.is-leaf{
    padding:0px;
    height:50px;
    background:#f8f8f8;
  }
}
body {
  margin: 0 auto;
  overflow-x: hidden;
  background-color: #f6f6f6;
  columns: 1;
}

.body-content {
  background: #FFF;
  border: 0px solid transparent;
  margin: 0 20px 20px  20px !important;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 80px;
}

.content-wrapper {
  box-shadow: 0 0 2px 0 #ddd;
  position: absolute;
  top: 0;
  left: 200px;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  .app-content {
    width: 100%;
    min-width: 1080px;
    background: #fff;
    z-index: 1;
    .line{
      // margin:0 auto;
      height:1px;
      //  border-bottom: 1px solid #ddd;
       background: #ddd;
       margin-left: 20px;
       max-width:1130px;
    }
    .linenav{
      background:#ffffff !important;
    }
    .content-inner-wrapper {
      min-height: 500px;
      color: black;
      background: #fff;
      padding: 20px;
    }
  }
}

.boxHeader {
  width: 560px;
  margin: 0 auto;
  position: relative;
  padding: 0 20px;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid #dcdcdc;
  top: 190px;
  span {
    font-size: 16px;
  }
}

.fixWrapperBox {
  position: fixed;
  z-index: 1999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.havpv-incorrect-wrapper {
  border-radius: 2px;
  width: 400px;
  padding: 80px 100px 40px;
  background: #FFF;
  margin: 150px auto 0;
  p {
    font-size: 14px;
    line-height: 28px;
  }
  a {
    color: #016cdf;
  }
}

.pv-incorrect-wrapper {
  width: 700px;
  padding: 80px 100px;
  background: #F8F8F8;
  margin: 150px auto 0;
  p {
    font-size: 14px;
    line-height: 28px;
  }
  a {
    color: #016cdf;
  }
  .important {
    font-size: 17px;
    font-weight: bold;
    line-height: 34px;
    margin-bottom: 12px;
  }
}

.el-breadcrumb {
  // position: absolute;
  // top: 0;
  // right: 0;
  // left: 200px;
  background:#ffffff;
  // box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
  // z-index: 1;
}
/*侧边栏收起*/

@media screen and (max-width: 1279px) {
  @navWidth: 64px;
  .sidenav {
    width: @navWidth;
    overflow: visible;
    background: #fff;
    .el-menu {
      border-bottom: 1px solid #ccc;
    }
    .menu-name {
      display: none;
    }
    .el-submenu__icon-arrow {
      display: none;
    }
  }
  .el-breadcrumb {
    left: 65px;
  }
  .content-wrapper {
    left: @navWidth + 5;
    .app-content {
      min-width: 1080px;
    }
  }
}
</style>