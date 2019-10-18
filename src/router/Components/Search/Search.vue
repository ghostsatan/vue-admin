<template>
  <div class="searchCommen">
    <div class="block">
      <el-form :model="form" ref = "ruleForm" inline class="el-base-form" >
        <div >
         <el-form-item label="卡种类：">
            <el-select v-model="form.kindCode" @change="changeVal">
              <el-option label="全部" value=""></el-option>
              <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.hotelName"
      :value="item.id">
    </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡类型：">
            <el-select v-model="form.cardTypeId">
              <el-option label="全部" value=""></el-option>
              
            </el-select>
          </el-form-item>

          <el-form-item label="时间:" class="form-item">
            <el-date-picker  v-model="form.startTime" type="date" @change = "dateValidation()"/>
            <span class="date-range-seperator-cutoff">&nbsp;至&nbsp; </span>
            <el-date-picker v-model="form.endTime" type="date" @change = "dateValidation()"/>
          </el-form-item>
          <el-form-item class="form-item" label-width="40px">
            <date-short-cut :onClick="toDay" :items="items" ref="shortCut"></date-short-cut>
          </el-form-item>
          <el-form-item label="" style = "margin-top:2px">
            <el-button type="success" size="small" >搜索</el-button>
            <el-button size="small" >重置</el-button>
          </el-form-item>
        </div>
       
      </el-form>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import DateShortCut from './DateShortCut.vue';
export default {
  components:{
    DateShortCut
  },
  mounted () {
    //日期默认今天
    this.$refs.shortCut.handleItemClick(0);
  },
  data () {
    return {
      options:[],
      form: {
        kindCode: '',//卡种类
        hotelIds: [],
        endTime: '',
        startTime: '',
        cardTypeId:'',//卡类型
      },
      items: [
        {
          text: '今天',
          values: [
            this.$moment().subtract(0, 'days').valueOf(),
            this.$moment().valueOf()
          ]
        },
        {
          text: '7天',
          values: [
            this.$moment().subtract(6, 'days').valueOf(),
            this.$moment().valueOf()
          ]
        },
        {
          text: '15天',
          values: [
            this.$moment().subtract(14, 'days').valueOf(),
            this.$moment().valueOf()
          ]
        },
        {
          text: '30天',
          values: [
            this.$moment().subtract(29, 'days').valueOf(),
            this.$moment().valueOf()
          ]
        }
      ],
    };
  },
  created() {
    this.$axios.post("mock/dtp-admin/hotel/list").then((res)=>{
      // console.log(res);
      this.options = res.data;
    });
  },
  methods: {
    dateValidation (){
      //开始时间不能大约结束时间
      if (this.form.startTime > this.form.endTime){
        this.$message({
          message: '开始时间不能大于结束时间',
          type: 'warning'
        });
        this.toDay('', 1);
        this.$refs.shortCut.handleItemClick(0);//回到默认日期(今天)
      } else if (this.form.endTime > new Date()){//结束时间不能大约当前时间
        this.$message({
          message: '结束时间不能大于当前时间',
          type: 'warning'
        });
        this.form.endTime = new Date();
      }
    },
    //获取选中的组织机构
    handleCheckAgencyLeaves (checkedAgencyLeaves) {
      this.form.hotelIds = checkedAgencyLeaves;
    },
    changeVal(val){
      console.log(val);
    },
    //快捷日期设定
    toDay (val) {
      this.form.startTime = val[0];
      this.form.endTime = val[1];
    },
    
   
   
  }
};
</script>
<style lang="less">
  .searchCommen {
    .el-form{
      padding-left:30px;
    }
  }
</style>
