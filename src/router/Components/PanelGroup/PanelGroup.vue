<template>
  <div class="dashboard-editor-container">


    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-tabs type="border-card">
  <el-tab-pane label="我的行程">
   
      <div v-for="(item, key, index) in tabData"  :key="index" style="text-align:center">
        
          <dt>片名：{{ item.content }}</dt>
          <dd>时长：{{ item.originalTitle }}</dd>
        
      </div>
   
  </el-tab-pane>
  <el-tab-pane label="消息中心">消息中心</el-tab-pane>
  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
</el-tabs>

<div class="nav">
  <div class="nav-list">
<ul class="item" v-for=" (item,index) in list" :key="index" @click ="change(index)"><a :class="{'active':selected===index}">{{item.name}}</a>

</ul>
</div>
</div>
    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row> -->

    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row> -->

    <!-- <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card/>
      </el-col>
    </el-row> -->

  </div>
</template>

<script>
import PanelGroup from '@ui/PanelGroup'



export default {
  name: 'DashboardAdmin',
  components: {  
    PanelGroup,
  },
  data() {
    return {
      tabData:[],
      selected:0,
      list:[
        {name:"首页"},
        {name:"功能"},
        {name:"下载"},
        {name:"详情"},
        {name:"加入我们"},
        {name:"联系我们"},
        {name:"nike"},
        {name:"air jordan"},
        {name:"end"}
      ]
      
    }
  },
  created () {
    this.$axios.get("mock/test/test").then((res)=>{
      console.log(res);
      this.tabData = res.data;
    })
  },
  methods: {
    handleSetLineChartData(type) {
      console.log(123);
    },
    change (index){
      console.log(index);
      this.selected = index;
    }
  }
}
</script>

<style lang='less' scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .nav{
    .nav-list{
      overflow: hidden;
      .item{
        display: inline-block;
        .a{
          font-size: 12px;
          line-height: 12px;
          padding: 0 5px;
        
        }
        .active{
            background-color: aqua;
            color:red;
          }
        // :hover{
        //    color: red;
        // }
      }
    }
  }
}
</style>
