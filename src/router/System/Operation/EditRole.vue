<template>
<div class="edit-role">
  <el-dialog title="修改角色" :visible.sync="isVisible">
   <el-form :model="form">
    <el-form-item label="角色名称" >
      <el-input v-model="form.Name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="排序号" >
       <el-input v-model="form.Num" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="状态" >
      <el-checkbox v-model="checked">已启用</el-checkbox>
    </el-form-item>
     <el-form-item label="备注" >
       <el-input v-model="form.note" autocomplete="off"></el-input>
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
      form:{},
      isVisible: false,
      roleData:'',
      checked:true
    };
  },
  methods: {
    show(data) {
      this.isVisible = true;
      this.roleData = data;
      console.log(data);
      this.form.Name = data.Name;
      this.form.Num = data.Num;
      this.form.note = data.note;
    },
  }
};
</script>
<style lang="less">
.edit-role{

  .el-dialog{
    width: 30%;
  }
  .el-dialog__footer{
    text-align: center;
  }

}
</style>