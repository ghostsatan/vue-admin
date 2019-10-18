<template>
  <div class="custom-list">
    <h1>{{title}}</h1>
    <el-form :model="form" label-width="100px" class="seach-form" inline>
      <!-- <el-form-item label="省市" label-width="40px">
        <ProvinceCity @getProvinceCity="getProvinceCity" ref="province"/>
      </el-form-item>-->
      <el-form-item label="商场名称">
        <el-input placeholder="请输入商场名称" v-model.trim="form.marketName" clearable maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="商户编号">
        <el-input placeholder="请输入商户编号" v-model.trim="form.hotelId" clearable maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="商户名称">
        <el-input placeholder="请输入商户名称" v-model.trim="form.hotelName" clearable maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="时间区间">
        <el-date-picker
          v-model="form.startTime"
          type="date"
          :picker-options="startPickerOptions"
          placeholder="选择日期时间"
        ></el-date-picker>
        <span class="padd8">至</span>
        <el-date-picker
          v-model="form.endTime"
          type="date"
          :picker-options="endPickerOptions"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="search">搜索</el-button>
        <el-button size="small">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <!-- <el-row>
        <el-button type="success" @click="choceItems">
          <i class="el-icon-menu"></i>
          <i class="el-icon-caret-bottom"></i>
        </el-button>
        <div class="alertChoce" v-show="choseItems">
          <el-checkbox v-model="checked1" @change="changeCheck">备选项1</el-checkbox>
        </div>
      </el-row> -->
      <table-template
        :tableData="tableData"
        :tableColumns="listColumns"
        :selectionShow="true"
        :selectColumns="true"
        :tableOperationShow="true"
        :headerBackColor="headerBackColor"
        :cellBackColor="cellBackColor"
        :cellBorderColor="cellBorderColor"
        :linkLogin="true"
        @emitDel="Del"
        @handleSelectionChange="select"
      ></table-template>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="size"
        layout="total, sizes,jumper,->,prev, pager, next"
        :total="totalRecords"
      ></el-pagination>
    </div>
    <div class="cw-button">
      <el-button type="primary" @click="testProcess" :message="id">测试弹窗</el-button>
      <el-button type="primary">测试功能</el-button>
    </div>
    <div class="operation-dialog">
      <test-process ref="testProcess" v-on:titleChanged="updateTitle"></test-process>
    </div>
  </div>
</template>

<script>
import pagQuery from "@mixins/pagQuery";
import TestProcess from "./TestProcess";
import TableTemplate from "../Components/Table/Table";

export default {
  name: "home",
  components: {
    TestProcess,
    TableTemplate
  },
  mixins: [pagQuery],
  data() {
    let _this = this;
    return {
      form: {
        marketName: "",
        hotelName: "",
        hotelId: "",
        startTime: "",
        endTime: ""
      },
      listColumns: [
        {
          title: "id",
          prop:"id",
          isShow: true
        },
        {
          title: "商户名",
          prop:"tag",
          isShow: true
        },
        {
          title: "商户2",
          prop:"hotelName",
          isShow: true
        }
      ],
      headerBackColor:"#1087",
      cellBackColor:"#981",
      cellBorderColor:"	#DB7093",
      // test: false,
      // checked1: false,
      // choseItems: false,
      title: "父级标qqq1111111题",
      // disabled: true,
      id: "12",
      tableData:[],
      startPickerOptions: {
        disabledDate(time) {
          return (
            Date.now() <= time.getTime() ||
            (_this.form.endTime && time.getTime() > _this.form.endTime)
          );
        }
      },
      endPickerOptions: {
        disabledDate(time) {
          return (
            Date.now() <= time.getTime() ||
            (_this.form.startTime && time.getTime() < _this.form.startTime)
          );
        }
      }
    };
  },
  created() {
    // this.query("mock/dtp-admin/hotel/list").then(res => {
    //   this.data = res.data;
    // });
    // let data ={
    //   name:1,
    //   satus:1
    // };
    this.query("mock/dtp-admin/hotel/list", { type: "get" }).then(res => {
      this.data = res.data;
      this.tableData = res.data;
      console.log(1111, res.data);
    });
    // this.$axios.get('/mock/15/s/test').then((res)=>{
    //   console.log(1212121,res.data);
    // })
    // this.$axios.get("/api/api/ship/list.json").then(res => {
    //   this.data = res.data;
    //   console.log(123,res);
    // });
  },

  methods: {
    sortChange(col, prop, order) {
      console.log(col, prop, order);
    },
    Del(d){
      console.log(d);
      //触发父级方法
      console.log("父级删除");
    },

    go() {
      this.$router.push({ path: "/Table/Detail" });
    },
    //选择项弹窗显示隐藏；
    choceItems() {
      this.choseItems = !this.choseItems;
    },
    select(val){
      console.log("触发多选");
      console.log(11112121212,val);
    },
    changeCheck() {
      this.test = !this.test;
    },
    updateTitle(e) {
      this.title = e;
    },
    search() {
      this.query("mock/dtp-admin/hotel/list", { query: this.form });
    },
    testProcess() {
      this.$refs.testProcess.show(this.id);
    }
  }
};
</script>
<style lang='less'>
.custom-list {
  padding: 10px 0;
  .seach-form {
    .notice {
      font-size: 10px;
      color: gray;
      margin-right: 20px;
    }
  }
  /* 选择按钮相关 */
  .cw-icon-radio {
    display: inline-block;
    position: relative;
    width: 14px;
    height: 14px;
    background: #f8f8f8;
    border: 1px solid #dcdcdc;
    border-radius: 50%;
    box-shadow: inset 1px 1px 2px 0 rgba(0, 0, 0, 0.5);
  }
  .cw-icon-radio.checked {
    background: #018cdf;
    border-color: #018cdf;
    box-shadow: none;
    &:after {
      position: absolute;
      background: #ffffff;
      width: 4px;
      height: 4px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: "";
      border-radius: 50%;
    }
  }
  /* 表格标题选项 */
  .alertChoce {
    width: 170px;
    background: #ffffff;
    border: 1px solid #ccc;
    position: absolute;
    z-index: 10000;
    box-sizing: border-box;
    font-size: 18px;
    padding: 0px 10px 20px 20px;
  }
  .cw-button {
    text-align: center;
    margin: 10px auto;
    padding: 10px 10px;
  }
}
</style>
