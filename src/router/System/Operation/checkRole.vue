<template>
<div class="check-role">
  <el-dialog title="查看角色" :visible.sync="isVisible">
  <el-form>
    <el-form-item label="角色名称:">
       <div class="show-text">{{roleData.Name}}</div>
    </el-form-item>
    <el-form-item label="状态:">
       <div class="show-text">{{roleData.status}}</div>
    </el-form-item>
    <el-form-item label="备注:">
       <div class="show-text">{{roleData.note}}</div>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button>取 消</el-button>
    <el-button type="primary" >确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      roleData:''
    };
  },
  methods: {
    show(data) {
      this.isVisible = true;
      this.roleData = data;
    },
  }
};
</script>
<style lang="less">
.check-role{
  .el-dialog{
    width: 30%;
  }

.el-dialog__footer{
  text-align: center;
}
}
</style>