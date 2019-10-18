<template>
  <div class="login-container">
    <div class="head-top-wrap">
      <header>
        <div class="header_left">
          <img  class="logo"/>
          <span class="separator"></span>
          <span class="header_title">vue后台管理</span>
        </div>
      </header>
    </div>
    <div class="container-wrap">
      <div style="background:#0858eb99;width:100%;height:698px;"></div>
      <el-form class="login-wrap"
              :model="form"
              ref="form"
              :rules="rules"
              v-loading="isLogin"
              element-loading-text="登录成功，正在为您跳转..."
              @keyup.native.enter="login">
        <p class="welcome-tip">欢迎登录</p>
        <el-form-item prop="userName">
          <el-input type="text" v-model="form.userName" placeholder="用户名" :maxlength="20" ref="userName"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input type="password" v-model="form.passWord" placeholder="密码" :maxlength="20" ref="passWord"></el-input>
        </el-form-item>
        <el-form-item class="sm-input" prop="verificationCode">
          <el-input type="text" v-model="form.verificationCode" placeholder="验证码" :maxlength="4" ref="verificationCode"></el-input>
          <img class="img-verificationCode" :src="`/dtp-admin/auth/getVerificationCode?captchaKey=${form.captchaKey}`"/>
          <span class="refresh-btn" @click="refresh">刷新</span>
        </el-form-item>
        <el-form-item class="sm-input">
          <el-checkbox v-model="remember" @change="change">记住密码</el-checkbox>
        </el-form-item>
        <div>
          <el-button class="login-btn" type="primary" @click="login" :loading="loading">登 录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import logoUrl from '@assets/images/logo.png';
import secret from '@util/secret';
export default {
  data () {
    return {
      window: window,
      visible: false,
      form: {
        userName: '',
        passWord: '',
        verificationCode: '',
        captchaKey: ''
      },
      loading: false,
      isLogin: false,
      // logoUrl: logoUrl,
      remember: false,
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        passWord: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        verificationCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    };
  },
  
  created () {
    // this.$router.push({path:'/Market'});
    let user = this.getCookie('user');
    let pwd;
    if (this.getCookie('pwd')) {
      pwd = this.getCookie('pwd');
    }
    if (this.getCookie('passWord')) {
      pwd = secret.Decrypt(this.getCookie('passWord'));
    }
    this.form.userName = user;
    if (user && pwd) {
      this.remember = true;  
      this.form.passWord = pwd;
    }

    this.form.captchaKey = String(Date.now()).substr(-5) + Math.random().toString(36).substr(2);

  },
  methods: {
    refresh () {
      this.form.captchaKey = String(Date.now()).substr(-5) + Math.random().toString(36).substr(2);
    },
    login () {
      // this.redirect();
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.form.userName = this.form.userName.trim();
          this.form.userName = this.form.userName.toLowerCase();

          if (this.remember) {
            this.setCookie('user', this.form.userName, 7);
            this.setCookie('passWord', secret.Encrypt(this.form.passWord), 7);
            this.delCookie('pwd');
          }
          this.isLogin = true;
          this.redirect();

          // this.$axios.post('/dtp-admin/auth/login', this.form).then((res) => {
          //   if (res.code === 200) {
          //     this.isLogin = true;
          //     this.redirect();
          //   } else {
          //     this.loading = false;
          //     if (res.code === 500) {
          //       this.$alert(res.message);
          //     } else {
          //       this.$alert('登录失败，请稍后重试');
          //     }
          //     this.form.verificationCode = '';
          //     this.form.passWord = '';
          //     this.refresh();
          //   }
          // }).catch(()=>{
          //   this.loading = false;
          //   this.$alert('系统繁忙，请稍后重试');
          // });
        }
      });
    },
    redirect () {
      this.loading = false;
      console.log(123);
      // var a = this.getCookie('user');
      let user = {};
      user.user = this.getCookie('user');
      user.pwd = this.getCookie('pwd');
      // console.log(a);
      sessionStorage.setItem('user', JSON.stringify(user));
      window.location.href = process.env.NODE_ENV === 'development' ? '/index.html' : '/ka-admin';
    },
    change (value) {
      if (!value) {
        // this.delCookie('user');
        this.delCookie('pwd');
        this.delCookie('passWord');
      }
    },
    setCookie (name,value,day) {
      var date = new Date();
      date.setDate(date.getDate() + day);
      document.cookie = name + '=' + value + ';expires='+ date;
    },
    getCookie (name) {
      var reg = RegExp(name+'=([^;]+)');
      var arr = document.cookie.match(reg);
      if (arr) {
        return arr[1];
      } else {
        return '';
      }
    },
    delCookie (name) {
      this.setCookie(name, null, -1);
    }
  }
};
</script>

<style lang="less">
  .login-container {
    min-width: 1280px;
    .head-top-wrap {
      header {
        height: 70px;
        line-height: 70px;
        display: flex;
        justify-content: space-between;
        .header_left {
          margin-left: 74px;
          display: flex;
          align-items: center;
          .logo {
            width:110px;
          }
          .separator {
            display: inline-block;
            height: 18px;
            border: 1px solid #C4C3C3;
            margin: 0 12px;
          }
          .header_title {
            color: #333333;
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
    }

    .container-wrap {
      position: relative;
      margin-bottom: 30px;

      .login-wrap {
        position: absolute;
        bottom: 23%;
        right: 12%;
        z-index: 99;
        padding: 15px 30px 25px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.6);
        box-shadow: 0 5px 10px 0 rgba(0,55,115,.3);

        .welcome-tip {
          margin-bottom: 24px;
          font-size: 24px;
          font-weight: bolder;
          color: #123B69;
          opacity: .67;
        }
        .el-form-item {
          width: 290px;
        }
        .el-input__inner {
          width: 290px;
          border-radius: 5px;
        }
        .el-input--prefix {
          .el-input__inner {
            padding-left: 40px;
          }
        }
        .el-input__prefix {
          .iconfont {
            display: inline-block;
            font-size: 14px;
            padding: 0;
            width: 35px;
            line-height: 1;
          }
        }
        .sm-input {
          .el-input__inner {
            width: 140px;
          }
          .el-input {
            width:50%;
          }
        }
        .img-verificationCode {
          height: 34px;
          border-radius: 4px;
          margin: 0 6px;
          vertical-align: middle;
        }
        .el-checkbox__label {
          color: #fff !important;
        }
        .el-checkbox__inner {
          box-shadow: none;
        }
        .el-button {
          width: 290px;
        }
        
        .refresh-btn {
          cursor: pointer;
          color: #016CDF;
          font-size: 16px;
        }
        .login-btn {
          letter-spacing: 5px;
          height: 50px;
          font-size: 22px;
        }
      }
    }

  }
</style>
