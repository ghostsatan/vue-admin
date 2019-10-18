<template>
 <div class ='line'>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :key="index" v-for="(item,index) in items">
        <a v-if="item.path" @click="handleClick(item.path)">{{item.name}}</a>
        <span v-else>{{item.name}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  
</template>

<script>
import menus from '../../../constants/menu';
import getRouterConf from '@util/getRouterConf';

export default {
  data () {
    return {
      items: []
    };
  },
  watch: {
    '$route': function () {
      this.items = this.getTitle();
    }
  },
  methods: {
    getTitle () {
      const {title} = this.$route.meta;
      if (title && typeof title === 'string') {
        return [{name: title}];
      } else if (title && typeof title === 'object') {
        return title;
      } else {
        if (this.$route.path === '/Midware') {
          return;
        }
        return [{name: getRouterConf(this.$route.path)[1].name}];
      }
    },
    handleClick (path) {
      this.$router.push({
        path
      });
    }
  },
};
</script>

<style lang="less">
  .line{
    min-width: 1020px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ddd;
    margin-left:20px;
    margin-right: 20px;
    // padding-bottom: 5px;
    .breadcrumb {
      // padding-top: 15px;
      height: 40px;
      line-height: 55px !important;
      background: white;
      font-size: 16px;
      color: #333333;
      letter-spacing: -0.34px;
      font-weight: bold;
      // margin-left: 20px;
      // border-bottom: 1px solid #ddd;
      .el-breadcrumb__item:first-child {
        // margin-left: 21px;
      }
    }
  }
</style>
