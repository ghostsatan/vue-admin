<template>
<div class="edit-role">
  <el-dialog title="新增角色" :visible.sync="isVisible">
   <el-form :model="form">
    <el-form-item label="角色名称" >
      <el-input v-model="form.Name" placeholder="请输入角色名称"></el-input>
    </el-form-item>
    <el-form-item label="排序号" >
       <el-input v-model="form.Num" placeholder="请输入排序号"></el-input>
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
      checked:true
    };
  },
  methods: {
    show() {
      this.isVisible = true;
      
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