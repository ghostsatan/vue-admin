<template>
  <div class="custom-list">
     <el-form :model="form" label-width="100px" class="seach-form" inline>
        <el-form-item label="商场名称">
          <el-input  placeholder="请输入商场名称" v-model.trim="form.marketName" clearable maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="商户编号">
          <el-input  placeholder="请输入商户编号" v-model.trim="form.hotelId" clearable maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="商户名称">
          <el-input  placeholder="请输入商户名称" v-model.trim="form.hotelName" clearable maxlength="50"></el-input>
        </el-form-item>
          <el-form-item >
            <el-button type="success" size="small" >搜索</el-button>
            <el-button size="small">重置</el-button>
          </el-form-item>
     </el-form>
    <div>
      <el-table :data="tableData" style="width: 100%;" height="250" :default-sort = "{prop: 'hotelId', order: 'descending'}" :summary-method="getSummaries"
    show-summary  >
        <el-table-column align="center" label="商户编号" prop="hotelId" sortable min-width="150px"></el-table-column>
        <el-table-column align="center" label="商户编号" prop="hotelId"></el-table-column>
        <el-table-column align="center" label="商户编号" prop="hotelId"></el-table-column>
        <el-table-column align="center" label="商户编号" prop="hotelId"></el-table-column>
        <el-table-column align="center" label="商户编号" prop="hotelId"></el-table-column>
        <el-table-column align="center" label="商户编号" prop="hotelId"></el-table-column>
        <el-table-column align="center" label="商户名称" prop="hotelName"></el-table-column>
        <el-table-column align="center" label="商户名称" prop="hotelName"></el-table-column>
        <el-table-column align="center" label="商户名称" prop="hotelName"></el-table-column>
        <el-table-column align="center" label="商户名称" prop="hotelName"></el-table-column>
        <el-table-column align="center" label="商户名称" prop="hotelName"></el-table-column>
        <el-table-column align="center" label="商户名称" prop="hotelName"></el-table-column>
        <el-table-column align="center" label="商户名称" prop="hotelName"></el-table-column>
        <el-table-column align="center" label="交付日期" prop="doneTime" fixed="">
        </el-table-column>
         <el-table-column align="center" label="测试环境测试结果" prop="testConnectResult">
           <template slot-scope="scope">
          <span v-if="scope.row.testConnectResult === 1">成功</span>
          <span v-if="scope.row.testConnectResult === 2">失败</span>
        </template>
         </el-table-column>
         <el-table-column align="center" label="生产环境测试结果" prop="releaseConnectResult">
            <template slot-scope="scope">
          <span v-if="scope.row.releaseConnectResult === 1">成功</span>
          <span v-if="scope.row.releaseConnectResult === 2">失败</span>
        </template>
         </el-table-column>
       <el-table-column
      prop="tag"
      label="标签"
      width="100"
      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' },{ text: '学校', value: '学校' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
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
      <test-process ref='testProcess'></test-process>
    </div>
  </div>
 
</template>

<script>
import pagQuery from "@mixins/pagQuery";
import TestProcess from './TestProcess'
import ProvinceCity from '@ui/ProvinceCity/ProvinceCity';

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
      data: [], //表格数据
      form: {
        marketName:'',
        hotelName:'',
        hotelId:''
      },
      disabled: true,
      checked: {}, //表格选中行数据
      id: "" //商户id作为参数传给子组件
    };
  },
  created() {
    this.query("mock/dtp-admin/hotel/list").then(res => {
      this.data = res.data;
    });
  },
  
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    //弹窗
    show(){
      this.$refs.testProcess.show();
    },
    //合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
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
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
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
