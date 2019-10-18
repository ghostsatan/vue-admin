<template>
  <div class="app-container">

    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="apple">apple</el-checkbox>
        <el-checkbox label="banana">banana</el-checkbox>
        <el-checkbox label="orange">orange</el-checkbox>
         <el-checkbox label="status">status</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" :key="key" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="fruitName" width="180"/>
     <el-table-column v-for="(fruit,index) in formThead" :key="fruit" :label="fruit">
    <template slot-scope="scope">
      {{ scope.row[fruit]}}
        <template v-if="index === formThead.length - 1">
            <span :class="{'class1':scope.row.status === '1','class2':scope.row.status === '2'}">
                {{scope.row.status === '1' ? '成功' : '失败'}}
            </span>
        </template>
    </template>
</el-table-column>
    </el-table>

  </div>
</template>

<script>
const defaultFormThead = ['apple', 'banana']

export default {
  data() {
    return {
      tableData: [
        {
          name: '水果',
          apple: '苹果-10',
          banana: '香蕉-10',
          orange: '句子-10',
          status:"1"
        },
        {
          name: '水果-2',
          apple: '苹果-20',
          banana: '香蕉-20',
          orange: '句子-20',
          status:"1"
        },
        {
          name: '水果-2',
          apple: '苹果-20',
          banana: '香蕉-20',
          orange: '句子-20',
          status:"2"
        }
      ],
      key: 1, // table key
      formTheadOptions: ['apple', 'banana', 'orange','status'],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead // 默认表头 Default header
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  }
}
</script>

<style lang='less'>
.app-container{
  .class1 {
    color:red;
  }
  .class2{
    color:green;
  }
}
</style>

