<template>
  <nav class="sidenav">
    <div class='sideNav'>
    <el-menu
      :default-active="active"
      :unique-opened="true"
      :default-openeds="opened"
      v-if="isReady"
      :collapse="bodyWidth < 1280"
    >
      <div v-for="(menu,index) in menus" :key="index">
        <div v-if="menu.children">
          <el-submenu :index="`${menu.id}`">
            <template slot="title">
              <i :class="'iconfont '+menu.icon"></i>
              <span class="menu-name">{{menu.name}}</span>
            </template>
            <div v-for="(child,index) in menu.children" :key="index" :class="child.className ? child.className : null">
              <el-menu-item :index="`${child.id}`" @click="jump(child.path)">{{child.name}}</el-menu-item>
            </div>
          </el-submenu>
        </div>
        <div v-else>
          <el-menu-item :index="`${menu.id}`" @click="jump(menu.path)">
            <i :class="'iconfont '+menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
    </div>
  </nav>
</template>

<script>
import menu from "@/constants/menu";
import getRouterConf from "@/components/util/getRouterConf";
export default {
  inject: ['reload'],
  data () {
    return {
      menus: menu,
      isReady: true,
      active: "",
      opened: [1],
      permissionList: [],
      posVersionQualified: false,
      bodyWidth: document.body.clientWidth,
      dialogVisible: false
    };
  },
  created () {
    let _this = this;
    // console.log('menu',_this.menus);
    _this.checkBodyWidth();
    // if (this.$route.path !== "/") {
    //   // active 和 opened 的修改仅限于通过url跳页，鼠标点击菜单栏不需要此 watch
    //   const config = getRouterConf(this.$route.path);
    //   if (config[1] && Object.keys(config[1]).length>0) {  
    //     this.active = config[1].id.toString();
    //   } else {
    //     this.active = config[0].id.toString();
    //   }
    //   this.opened = this.bodyWidth < 1280 ? [] : [config[0].id.toString()];
    // } 
  },
  // watch: {
  //   $route: function() {
  //     if (this.$route.path !== '/') {
  //       // active 和 opened 的修改仅限于通过url跳页，鼠标点击菜单栏不需要此 watch
  //       const config = getRouterConf(this.$route.path);
  //       //判断子路由是不是空对象
  //       if (config[1] && Object.keys(config[1]).length>0) {
  //         this.active = config[1].id.toString();
  //       } else {
  //         this.active = config[0].id.toString();
  //       }
  //       this.opened = this.bodyWidth < 1280 ? [] : [config[0].id.toString()];
  //     } 
  //   }
  // },
  methods: {
    checkBodyWidth() {
      let _this = this;
      window.onresize = function() {
        _this.bodyWidth = document.body.clientWidth;
        _this.opened = _this.bodyWidth < 1280 ? [] : _this.opened;
      };
    },
    jump(path) {
      if (this.$route.path === path || this.$route.path === path + "/") {
        //如果点击当前页面菜单，直接刷新页面数据
        this.reload();
      } else {
        this.$router.push({
          path: path
        });
      }
    }
  }
};
</script>

<style lang="less">
nav {
  width: 200px;
  position: absolute;
  background-color:rgb(48, 65, 86);
  top: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  
  .sideNav{
    min-height: 582px;

  }
  .el-menu {
    border-right: 0 none;
    background-color:rgb(48, 65, 86);
    color: rgb(191, 203, 217);
  }
  .el-menu .el-submenu .el-menu{
    color:rgb(191, 203, 217);
    background-color:rgb(48, 65, 86);
  }
  .el-menu-item{
    color:rgb(191, 203, 217);

  }
  .el-submenu__title{
    color:rgb(191, 203, 217);
  }
  .el-menu .el-menu-item:hover, .el-menu .el-submenu__title:hover {
   background-color:#1f2d3d
}

.el-menu-item.is-active, .el-menu-item.is-active:hover {
  background-color:#1f2d3d;
  color: #118bfb;
  border-right: 2px solid #118bfb;
}
  .moreMessage {
    p {
      text-align: center;
    }
  }
}
</style>
