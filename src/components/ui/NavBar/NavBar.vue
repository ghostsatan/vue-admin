<template>
  <header class="nav-bar">
    
    <el-row>
		<el-col :span="6">
        <img :src="logoUrl" alt="" class="nav-logo">
      </el-col>
      <el-col :span="6" :offset="6">
        <div class="sub-header-menu">
          <!-- <div v-for="(sys,index) in sysMenus" :key="index" class="system-item" :class="sys.code === 'crm' ? 'active' : ''">
            <a :href="sys.url">
              {{sys.name}}
            </a>
          </div> -->
        </div>
      </el-col>
      <div class="login-btn">
        <el-button @click.native="changeType('zh')">切换中文</el-button>
        <el-button @click.native="changeType('en')">切换英文</el-button>

        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            <span class="name">欢迎你，afdasfd</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
            <el-dropdown-item>退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
    <changePwd ref="changePwd"></changePwd>
  </header>
</template>

<script>
import logoUrl from '../../../assets/images/logo.png';
import changePwd from '@ui/changePwd/changePwd'
import {mapState} from 'vuex';
export default {
  data() {
    return {
      logoUrl,
      dialogInfo: {},
      // sysMenus: [
      //   {
      //     code: 'sys',
      //     name: '系统1',
      //     url: '/web1'
      //   }, {
      //     code: 'chain',
      //     name: '实验室',
      //     url: '/laboratory.html'
      //   }, {
      //     code: 'chain',
      //     name: '系统3',
      //     url: '/web3'
      //   }
      // ],
      
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  components:{
    changePwd
  },
  methods : {
    handleCommand (command) {
      if (command === 'changePwd') {
        this.dialogInfo = {
          title: '修改密码',
          height: 280
        };
        this.$refs.changePwd.show(this.dialogInfo,this.userInfo);
      } else {
        this.$axios.get("/dtp-admin/auth/logout").then(res => {
          if (res.code === 200) {
            window.location.href = process.env.NODE_ENV === 'development' ? '/account.html' : '/ka-admin/account-web';
          }
        });
      }
      
    },
    changeType(type){
      console.log(type);
      // 此处做了语言选择记录
      localStorage.setItem('locale',type)
      // 修改显示语言
      this.$i18n.locale = type;
    }
  }
};
</script>

<style lang="less">
  header.nav-bar {
    top: 0;
    left: 0;
    width: 100%;
    height:60px;
    line-height: 60px;
    background: #fff;
    z-index: 2;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.15);
    .iconfont {
      cursor: pointer;
      font-size: 18px;
      padding-right: 0;
    }
    .nav-logo {
      width: 110px;
    }
    img {
      height:20px;
      margin: 20px 17px 19px 30px;
    }

    .sub-header-menu {
      line-height: 60px;
      margin-left: 40px;

      .system-item {
        display: inline-block;
        font-size: 18px;
        opacity: 0.8;
        width: 130px;
        text-align: center;

        &.active {
          opacity: 1;

          a {
            border-bottom: 2px solid white;
            padding-bottom: 5px;
          }
        }

        a {
          cursor: pointer;
          color: #fff;
        }
      }
    }
    .login-btn {
      float: right;
      padding-right: 30px;
      span {
        font-size:16px;
        cursor: pointer;
      }
    }
  }

</style>
