<template>
  <div class="app-container">
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/>
        </template>
      </el-table-column>-->

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
            >cancel</el-button>
          </template>
          <span v-else>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(scope.row)"
          >Ok</el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="scope.row.edit=!scope.row.edit"
          >Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" icon="el-icon-thumb" @click="changeType" size="small">转为度分秒输入</el-button>
    <el-table :data="tableData2" style="width: 100%;">
      <el-table-column align="center" prop="name" label="站号" fixed="left"></el-table-column>
      <el-table-column align="center" prop="type" label="预计纬度"></el-table-column>
      <el-table-column align="center" prop="type" label="预计经度"></el-table-column>
      <el-table-column align="center" label="实测纬度">
        <template slot-scope="scope">
          <el-input
            v-if="inputType"
            v-model="scope.row.exchangeNum"
            class="exchangeNum"
            @change="inputChange(scope.row)"
          ></el-input>
          <div v-else class="multi-input">
            <el-input
              v-model="scope.row.exchangeNum"
              class="exchangeNum"
              @change="inputChange(scope.row)"
            >
              <span slot="suffix">°</span>
            </el-input>
            <el-input
              v-model="scope.row.exchangeNum"
              class="exchangeNum"
              @change="inputChange(scope.row)"
            >
              <span slot="suffix">′</span>
            </el-input>
            <el-input
              v-model="scope.row.exchangeNum"
              class="exchangeNum"
              @change="inputChange(scope.row)"
            >
              <span slot="suffix">″</span>
            </el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="实测经度">
        <template slot-scope="scope">
          <el-input
            v-if="inputType"
            v-model="scope.row.exchangeNum"
            class="exchangeNum"
            @change="inputChange(scope.row)"
          ></el-input>
          <div v-else class="multi-input">
            <el-input
              v-model="scope.row.exchangeNum"
              class="exchangeNum"
              @change="inputChange(scope.row)"
            >
              <span slot="suffix">°</span>
            </el-input>
            <el-input
              v-model="scope.row.exchangeNum"
              class="exchangeNum"
              @change="inputChange(scope.row)"
            >
              <span slot="suffix">′</span>
            </el-input>
            <el-input
              v-model="scope.row.exchangeNum"
              class="exchangeNum"
              @change="inputChange(scope.row)"
            >
              <span slot="suffix">″</span>
            </el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="纬度站位差" prop="costPointsNum"></el-table-column>
      <el-table-column align="center" label="经度站位差" prop="costPointsNum"></el-table-column>
      <el-table-column align="center" label="定位方法" prop="leftNum">
        <template slot-scope="scope">
          <el-select v-model="form.equipmentType" placeholder="请选择调查船">
            <el-option
              v-for="item in equipmentTypes"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="水深">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.exchangeNum"
            class="exchangeNum"
            @change="inputChange(scope.row)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="测深方法" prop="leftNum">
        <template slot-scope="scope">
          <el-select placeholder="请选择调查船">
            <el-option
              v-for="item in equipmentTypes"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="createdate" header-align="center" align="center" label="定位时间">
        <template slot-scope="scope">
          <el-date-picker type="date" clearable :editable="false" v-model="scope.row.createdate"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column prop="createdate" header-align="center" align="center" label="观测时间">
        <template slot-scope="scope">
          <el-date-picker type="date" clearable :editable="false" v-model="scope.row.createdate"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column align="center" label="定位者">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.exchangeNum"
            class="exchangeNum"
            @change="inputChange(scope.row)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class="handleButs" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-copy-document" size="small">向下复制</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import pagQuery from "@mixins/pagQuery";

export default {
  name: "InlineEditTable",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  mixins: [pagQuery],
  data() {
    return {
      list: null,
      listLoading: true,
      inputType: true,
      form:{},
      tableData2: [
        {
          name: "夕阳红一号"
        }
      ],
      listQuery: {
        page: 1,
        limit: 10
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.query("mock/test/test").then(res => {
        this.tableData = res.data;
      });
      // this.listLoading = true
      // fetchList(this.listQuery).then(response => {
      //   const items = response.data.items
      //   this.list = items.map(v => {
      //     this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
      //     v.originalTitle = v.title //  will be used when user click the cancel botton
      //     return v
      //   })
      //   this.listLoading = false
      // })
    },
    cancelEdit(row) {
      row.title = row.originalTitle;
      row.edit = false;
      this.$message({
        message: "标题已还原为原始值",
        type: "warning"
      });
    },
    changeType() {
      this.inputType = !this.inputType;
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTitle = row.title;
      this.$message({
        message: "标题已经被修改",
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.multi-input {
    display: inline-flex;
  }
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 120px;  
}
</style>
