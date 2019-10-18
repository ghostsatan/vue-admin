<template>
  <div class="roles">
     <el-form :model="form" label-width="100px" class="seach-form" inline>
     
        <el-form-item label="角色名称">
          <el-input  placeholder="请输入角色名称" v-model.trim="form.marketName" clearable maxlength="50"></el-input>
        </el-form-item>
         <el-form-item label="状态" prop = "roles">
              <el-select v-model="form.roles">
                <el-option v-for="item in roles" 
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
              </el-select>
            </el-form-item>
      
          <el-form-item >
            <el-button type="primary" size="small" >搜索</el-button>
            <el-button size="small">重置</el-button>
           
          </el-form-item>
     </el-form>
     
        

    <div class="table">
           <div class="operate-btn">
           <el-button size="small" type="success" @click="addRole">新增</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </div>
      <el-table :data="tableData" style="width: 100%;" height="100%">
        <el-table-column align="center" label="角色名" prop="Name"></el-table-column>
        <!-- <el-table-column align="center" label="状态" prop="hotelId"></el-table-column> -->
        <el-table-column align="center" label="备注" prop="note"></el-table-column>
         <el-table-column align="center" label="状态" prop="status">
           <template slot-scope="scope">
          <span v-if="scope.row.status === 1">启用</span>
          <span v-if="scope.row.status === 2">禁用</span>
        </template>
         </el-table-column>

        <el-table-column align="center" label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <a class="operation" @click="roleCheck(scope.row)">查看</a>
            <a class="operation" @click="Edit(scope.row)">修改</a>
            <a class="operation" @click="roleDelete(scope.row.id)">删除</a>
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

    <div class="operation-dialog">
      <check-role ref='roleCheck'></check-role>
      <edit-role ref="editRole"></edit-role>
      <add-role ref="addRole"></add-role>
    </div>
  </div>
 
</template>

<script>
import pagQuery from "@mixins/pagQuery";
import CheckRole from "./Operation/checkRole"
import EditRole from "./Operation/EditRole"
import AddRole from "./Operation/AddRole"

export default {

  mixins: [pagQuery],
  components:{
    CheckRole,
    EditRole,
    AddRole

  },
  data() {
    let _this = this;
    return {
      form: {
        marketName:'',
        hotelName:'',
      },
      disabled: true,
      roles :[{
        label:'全部',
        value:'1'
      },{
        label:'启用',
        value:'2'
      },{
        label:'禁用',
        value:'3'
      }],
    };
  },
  created() {
    console.log(123,this.$store.state.userInfo);
    this.query("mock/test/role").then(res => {
      console.log(res);
    });
  },
  
  methods: {
    //查看角色
    roleCheck (data){
      this.$refs.roleCheck.show(data);
    },
    //修改角色
    Edit (data){
      this.$refs.editRole.show(data);
    },
    //新增角色
    addRole(){
      this.$refs.addRole.show();
    },
    //删除角色
    roleDelete(id) {
      let _this = this;
      let param = { id };
      _this
        .$confirm("是否确认删除?", "提示", {
          // 删除提示
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          customClass: "warning"
        })
        .then(() => {
          _this.$axios
            .post(`mock/test/role`, param)
            .then(res => {
              if (res.code === 200) {
                _this.$message({
                  message: '删除成功！',
                  type: 'success'
                });
                _this.getData();
              } else {
                _this.$message({
                  message: '删除失败！',
                  type: 'error'
                });
              }
            });
        });
    },


  }
};
</script>
<style lang='less'>
.roles{
  .operate-btn{
    text-align: right;
    margin-bottom: 15px;
    margin-right:7px;
  }
}
</style>
