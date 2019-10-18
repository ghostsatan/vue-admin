<template>
  <div class="permission">
    <div class="table">
      <div class="table-title">权限管理</div>
      <div class="table-btn">
       <el-button type="primary" size="small" >新增</el-button>
        <!-- <el-button size="small">重置</el-button> -->
       </div>
      <el-table :data="data" style="width: 100%;" height="250">
        <el-table-column align="center" label="模块" prop="module"></el-table-column>
        <!-- <el-table-column align="center" label="状态" prop="hotelId"></el-table-column> -->
        <el-table-column align="center" label="权限" prop="permisson"></el-table-column>
         <el-table-column align="center" label="排序" prop="sort"></el-table-column>
        <el-table-column align="center" label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <a class="operation" @click="roleCheck(scope.row)">查看</a>
            <a class="operation" @click="Edit(scope.row)">修改</a>
            <a class="operation" @click="roleDelete(scope.row.id)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
     <div class="table">
      <div class="system-title">系统管理</div>
      <div class="table-btn">
       <el-button type="primary" size="small" >新增</el-button>
        <el-button size="small" type='danger'>删除</el-button>
       </div>
      <el-table :data="tableData" style="width: 100%;" height="250">
        <el-table-column align="center" label="权限名" prop="permissonName"></el-table-column>
        <el-table-column align="center" label="授权码" prop="code"></el-table-column>
         <el-table-column align="center" label="状态" prop="status">
           <template slot-scope="scope">
          <span v-if="scope.row.status === 1">启用</span>
          <span v-if="scope.row.status === 2">禁用</span>
        </template>
         </el-table-column>

        <el-table-column align="center" label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <!-- <a class="operation" @click="roleCheck(scope.row)">查看</a> -->
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
      data:[],
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
    this.$axios("mock/test/permisson").then(res => {
      this.data = res.data;
    });
    this.query('mock/test/system').then(res =>{
      // console.log(res.data);
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
.permission{
  .table{
    .table-title{
      font-size: 20px;
      margin-bottom: 10px;
    }
    .table-btn{
      margin-bottom: 10px;
    }
    .system-title{
      margin-top:10px;
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
