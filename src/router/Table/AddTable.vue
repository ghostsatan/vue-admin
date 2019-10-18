<template>
  <div class="table_box">
    <div class="btn" style="text-align: left;">
      <el-button type="primary" @click="addItem" size ='small'>新增</el-button>
       <el-button type="primary" @click="show" size ='small'>控制可见</el-button>
    </div>
    <el-table :data="list" border :summary-method="getSummaries" show-summary style="width: 100%;" stripe height="260">
      <el-table-column label="序号" width="80px" align='center'>
        <template slot-scope="scope">
          <span>{{ scope.$index +1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最喜欢吃" align='center'>
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{['橙子','橘子','榴莲'][scope.row.fruitSort-1]}}</span>
          <el-select placeholder="请选择" v-if="scope.row.isEgdit" v-model="scope.row.fruitSort">
            <el-option v-for="(item, index) in ['橙子','橘子','榴莲']" :key="index+1" :label="item" :value="index+1">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="firstNum" label="第一周吃的数量" align='center'>
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.firstNum}}</span>
          <el-input v-if="scope.row.isEgdit" v-model="scope.row.firstNum"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="secondNum" label="第二周吃的数量" align='center' v-if="test">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.secondNum}}</span>
          <el-input v-if="scope.row.isEgdit" v-model="scope.row.secondNum"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="thirdNum" label="第三周吃的数量" align='center'>
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.thirdNum}}</span>
          <el-input v-if="scope.row.isEgdit" v-model="scope.row.thirdNum"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="fourthNum" label="第四周吃的数量" align='center'>
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.fourthNum}}</span>
          <el-input v-if="scope.row.isEgdit" v-model="scope.row.fourthNum"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align='center'>
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click='edit(scope.$index,scope.row)' icon="el-icon-edit" round></el-button>
          <el-button v-if="scope.row.isEgdit" type="success" size="small" @click='editSuccess(scope.$index,scope.row)' icon="el-icon-check" round></el-button>
          <el-button @click.native.prevent="deleteItem(scope.$index, list)" type="danger" size="small" icon="el-icon-delete" round></el-button>
        </template>
      </el-table-column>
    </el-table>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [{
        id: 1,
        fruitSort: 1,
        firstNum: 10,
        secondNum: 3,
        thirdNum: 4,
        fourthNum: 6,
      }, {
        id: 2,
        fruitSort: 2,
        firstNum: 7,
        secondNum: 6,
        thirdNum: 8,
        fourthNum: 2,
      }, {
        id: 3,
        fruitSort: 3,
        firstNum: 5,
        secondNum: 6,
        thirdNum: 8,
        fourthNum: 9,
      }, {
        id: 4,
        fruitSort: 3,
        firstNum: 10,
        secondNum: 3,
        thirdNum: 4,
        fourthNum: 6,
      }],
      test:true
    }
  },
  methods: {
    //合计 表格每一列需要带上prop
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总数量';
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
          sums[index] += '(个)';
        } else {
          sums[index] = '';
        }
      });

      return sums;
    },
    //新增数据
    addItem() {
      let item = {
        id: null,
        fruitSort: null,
        firstNum: null,
        secondNum: null,
        thirdNum: null,
        fourthNum: null,
        isEgdit: true
      }
      this.list.push(item)
    },
    show(){
      this.test = !this.test;
    },
    //删除数据
    deleteItem(index, list) {
      list.splice(index, 1);
    },
    //编辑数据
    edit(index, row) {
      this.$set(row, 'isEgdit', true)
    },
    //编辑成功
    editSuccess(index, row) {
      this.$set(row, 'isEgdit', false)
    },
    //跳转下一页面
    goNextPage() {
      this.$router.push({ name: 'echartTest' })
    }
  }

}

</script>