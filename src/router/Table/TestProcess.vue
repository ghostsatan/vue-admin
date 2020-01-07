<template>
  <div class="text">
    <el-dialog :visible.sync="isVisible" title="我是一个弹窗" @close="closeDialog">
      <h1 @click="changeTitle">{{title}}</h1>
      <h2>{{fatherId}}</h2>
      <el-table style="width: 100%;" height="250" id="printbox">
        <el-table-column align="center" label="商户编号" prop="hotelId"></el-table-column>
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
        <el-table-column align="center" label="交付日期" prop="doneTime" fixed></el-table-column>
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
        <el-table-column align="center" label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <a class="operation" @click="customDetail(scope.row.id)">详情</a>
            <a class="operation" @click="customEdit(scope.row.id)">修改</a>
            <a class="operation" @click="customDelete(scope.row.id)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary">子组件给父组件传参</el-button>
      <el-button type="primary" @click="print">打印</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  prop: ["message"],
  data() {
    return {
      isVisible: false,
      requestData: "",
      fatherId: "",
      title: "这是一条来自子组件的消息"
    };
  },
  methods: {
    show(id) {
      this.isVisible = true;
      this.fatherId = id;
    },
    closeDialog() {
      this.changeTitle();
    },
    print() {
      let text = document.getElementById("printbox");
      let newContent = text.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML= oldContent;
      return false;
    },
    changeTitle() {
      this.$emit("titleChanged", this.title);
    }
  }
};
</script>
<style lang="less">
.text {
  .el-dialog__header {
    margin-bottom: -30px;
  }
  margin: 10px;
  .text-item {
    margin-left: -25px;
  }
}
</style>