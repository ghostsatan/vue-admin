<template>
  <el-dialog
    class="changPwd"
    :title="dialogInfo.title"
    :visible.sync="dialogVisible"
    @close="close">
    <el-form :model="form" :rules="rule" label-width="100px" ref="form" class="password-info-dialog">
      <el-form-item label="用户名">
        <span>{{userInfo.userName}}</span>
      </el-form-item>
      <el-form-item label="登录密码" prop="loginPwd">
        <el-input type="password" v-model="form.loginPwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input type="password" v-model="form.confirmPwd"></el-input>
      </el-form-item>
      <div class="footer-btns">
        <el-button type="primary" :loading="loading" @click="handleSave">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data () {
    let checkConfirmPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        return callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      form: {
        loginPwd: '',
        password: '',
        confirmPwd: '',
      },
      loading:false,
      dialogVisible:false,
      dialogInfo:{},
      userInfo: {},
      curUser: {},
      rule: {
        loginPwd: [
          {required: true, message: '请输入登录密码', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入新密码',trigger: 'blur'}
        ],
        confirmPwd: [
          {required: true, validator: checkConfirmPassword, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    show (dialogInfo,userInfo) {
      this.dialogInfo = dialogInfo;
      this.userInfo = userInfo;
      this.dialogVisible = true;
      this.dialogLoading = true;
    },
    close () {
      this.dialogVisible = false;
    },
    handleSave () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            oldPassword: this.form.loginPwd,
            newPassword: this.form.password
          };        
          this.loading = true;
          this.$axios.post('/dtp-admin/user/changePwd', params).then(res => {
            if (res.code === 200) {
              this.$message.success('修改成功');
              setTimeout(() => {
                window.location.href = process.env.NODE_ENV === 'development' ? '/account.html' : '/ka-admin/account-web';
              }, 1000);
            } else {
              this.$message.error(res.message);
              this.loading = false;
            }
          });
        }
          
      });
    },
    handleCancel () {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="less">
  .changPwd {
    .password-info-dialog {
      padding: 0 120px 0 100px;
      .el-form-item__label {
        padding-right: 30px;
        text-align: right;
      }
      .el-form-item {
        .el-input__inner {
          width:100%;
        }
      }
      .footer-btns {
        margin-top: 30px;
        text-align: center;
      }
    }
  }
  
</style>
