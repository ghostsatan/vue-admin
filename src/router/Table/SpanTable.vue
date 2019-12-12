<template>
  <div class="custom-list">
    <el-form :model="form" label-width="100px" class="seach-form" inline>
      <el-form-item label="商场名称">
        <el-input placeholder="请输入商场名称" v-model.trim="form.marketName" clearable maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="商户编号">
        <el-input placeholder="请输入商户编号" v-model.trim="form.hotelId" clearable maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="商户名称">
        <el-input placeholder="请输入商户名称" v-model.trim="form.hotelName" clearable maxlength="50"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small">搜索</el-button>
        <el-button size="small">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table
        :data="tableData6"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px"
      >
        <!-- <el-table-column align="center" label="商户编号" prop="hotelId"></el-table-column>
        <el-table-column align="center" label="商户名称" prop="hotelName"></el-table-column>
        <el-table-column align="center" label="商户名称" prop="tag"></el-table-column>-->
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
        <el-table-column prop="amount2" label="数值 2（元）"></el-table-column>
        <el-table-column prop="amount3" label="数值 3（元）"></el-table-column>
      </el-table>
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
      <el-button type="primary" @click="show">测试弹窗</el-button>
      <el-button type="primary" :disabled="disabled">测试功能</el-button>
    </div>
    <div class="operation-dialog">
      <test-process ref="testProcess"></test-process>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import pagQuery from "@mixins/pagQuery";
import TestProcess from "./TestProcess";
import ProvinceCity from "@ui/ProvinceCity/ProvinceCity";

export default {
  name: "home",
  components: {
    ProvinceCity,
    TestProcess
  },
  mixins: [pagQuery],
  data() {
    return {
      props: {
        value: "label"
      },
      spanArr: [],
    //   tableData6:[],
      tableData6: [
        {
          id: "1",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10
        },
        {
          id: "1",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "2",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "2",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17
        },
        {
          id: "2",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        }
      ],
      form: {
        marketName: "",
        hotelName: "",
        hotelId: ""
      },
      disabled: true,
      checked: {}, //表格选中行数据
      id: "" //商户id作为参数传给子组件
    };
  },

  //    created() {
  //     this.query("mock/dtp-admin/hotel/list").then(res => {
  //       this.tableData6 = res.data;
  //     });

  //   },
  created() {
      
        this.getSpanArr(this.tableData6);
  },

  methods: {
    getSpanArr(data) {　
          for (var i = 0; i < data.length; i++) {
            if (i === 0) {
              this.spanArr.push(1);
              this.pos = 0
            } else {
              // 判断当前元素与上一个元素是否相同
            if (data[i].id === data[i - 1].id) {
                this.spanArr[this.pos] += 1;
                this.spanArr.push(0);
              } else {
                this.spanArr.push(1);
                this.pos = i;
              }
            }
        }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          console.log(222,this.spanArr);
          if (columnIndex === 1) {
            const _row = this.spanArr[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            console.log(1111,_row);
            console.log(_col);
            return {
                  rowspan: _row,
                  colspan: _col
            }
          }
        },
    filterTag(value, row) {
      return row.tag === value;
    },
    //弹窗
    show() {
      this.$refs.testProcess.show();
    },
    //合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
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
  .cw-button {
    text-align: center;
    margin: 10px auto;
    padding: 10px 10px;
  }
}
</style>
