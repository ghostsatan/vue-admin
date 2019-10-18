<template>
  <div class="marketDetail">
    <el-form :model="form" label-width="120px" :rules="rules" ref="form" class="add-form">
      <el-row>
        <el-col :offset="1" :span="18">
          <el-row>
            <el-col :span="12">
              <el-form-item label="商场名称：" prop="marketName">
                 <el-input :maxlength="50" v-model.trim="form.marketName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="省市：" class="selectCity" prop="selectCity">
                <ProvinceCity @getProvinceCity="getProvinceCity" ref="province" style="width:100%"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="商场联系人：" prop="marketContacts">
                 <el-input :maxlength="50" v-model="form.marketContacts"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式：" prop="marketPhone">
                 <el-input :maxlength="50" v-model.trim="form.marketPhone"></el-input>
              </el-form-item>
            </el-col>        
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="数据对接方式：" prop="endpointType">
                <el-select v-model="form.endpointType">
                  <el-option v-for="item in endpointType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="传输频次：" prop="frequencyType">
                <el-select v-model="form.frequencyType">
                  <el-option v-for="item in frequencyType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="请求超时时间(秒)：" prop="endpointTimeOut">
                 <el-input :maxlength="50" v-model="form.endpointTimeOut"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务重试次数：" prop="endpointTryCount">
                 <el-input :maxlength="50" v-model="form.endpointTryCount"></el-input>
              </el-form-item>
            </el-col>      
             
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="160px" label="webservice请求数据类型：" prop="endpointContextType">
                 <el-input :maxlength="255" v-model="form.endpointContextType"></el-input>
              </el-form-item>
            </el-col>    
          </el-row>
          <el-row >
            <el-col :span="24">
              <el-form-item label="自定义参数：" prop="exConfig">
                <div v-for="(item,index) in form.exConfig" :key="index" class="customArg">
                  <i @click="plus" v-if="index === 0" class="el-icon-plus"></i>
                  <i @click="minus(index)" v-if="index > 0" class="el-icon-minus"></i>
                  <div class="customBox">
                    <span>自定义属性:</span> 
                    <el-input :maxlength="50" v-model.trim="item.exConfigName" :readonly="index === 0 ? isRead : false"></el-input>
                  </div>
                  <div class="customBox">
                    <span>KEY值：</span>
                    <el-input :maxlength="50" v-model.trim="item.exConfigKey"></el-input>
                  </div>               
                </div>               
              </el-form-item>
            </el-col>         
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="报文模板：" prop="template">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="直接输入报文代码即可"
                  :maxlength="10240"
                  v-model.trim="form.template">
                </el-input>      
              </el-form-item>  
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="24">
              <el-form-item label="成功标识：" prop="sucResult">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="成功标识"
                  :maxlength="10240"
                  v-model="form.sucResult">
                </el-input>     
              </el-form-item>   
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="测试地址：" prop="testUrl">
                 <el-input :maxlength="255" v-model.trim="form.testUrl"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="正式地址：" prop="releaseUrl">
                 <el-input :maxlength="255" v-model="form.releaseUrl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注：" prop="remark">
                 <el-input 
                  type="textarea"
                  :rows="4"
                  :maxlength="200" 
                  v-model="form.remark">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="footBtn">
              <el-button type="primary" @click="handleSave">保存</el-button>
              <el-button @click="goback">返回</el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
      
    </el-form>
  </div>
</template>

<script>
import ProvinceCity from '@ui/ProvinceCity/ProvinceCity';

export default {
  created () {
    if (this.$route.query.id) {
      this.marketDetail();
    }
  },
  data () {
    const selectCity = (rule,value,callback) => {
      if (!this.selectedOptions || this.selectedOptions.length === 0) {
        return callback(new Error('请输入省市'));
      } else {
        callback();
      }
    };
    const exConfig = (rule,value,callback) => {
      this.form.exConfig.map((item)=>{
        if (!item.exConfigKey && !item.exConfigName) {
          return callback(new Error('请输入自定义参数'));
        } else if (!item.exConfigKey && item.exConfigName) {
          return callback(new Error('请输入KEY值'));
        } else if (item.exConfigKey && !item.exConfigName) {
          return callback(new Error('请输入自定义属性'));
        }
      })
      callback();
    };
    const selectType = (rule,value,callback) => {
      if (this.form.endpointType === undefined) {
        this.isRead = false;
        return callback(new Error('请选择数据对接方式'));
      } else if (this.form.endpointType === 0) {
        this.isRead = true;
        this.form.exConfig[0].exConfigName = 'fileName';
        callback();
      } else {
        this.isRead = false;
        callback();
      }
    };
    const endpointTimeOut = (rule,value,callback) => {
      if (value === '' || value === undefined) {
        callback();
      } else if (!/^\d*$/.test(value)) {
        return callback('请输入数字');
      }
      callback();
    };
    const endpointTryCount = (rule,value,callback) => {
      if (value === '' || value === undefined) {
        callback();
      } else if (!/^\d*$/.test(value)) {
        return callback('请输入数字');
      }
      callback();
    };
    const marketPhone = (rule,value,callback) => {
      if (value) {
        var reg = /^(\d3,4|\d{3,4}-)?\d{7,8}$/;
        var telephoneReg = /^1\d{10}$/;
        if (reg.test(value) || telephoneReg.test(value)) {
          callback();
        } else {
          return callback(new Error('您输入的联系电话有误'));
        }
      } else {
        callback('请输入联系方式');
      }
    };
    const rules = {
      selectCity: [
        {validator: selectCity, trigger: 'change', required: true},
      ],
      marketName: [
        {required: true, message: '请输入商场名称', trigger: 'change'}
      ],
      testUrl: [
        {required: true, message: '请输入测试地址', trigger: 'blur'}
      ],
      frequencyType: [
        {required: true, message: '请选择传输频次', trigger: 'change'}
      ],
      endpointType: [
        {required: true, validator: selectType, trigger: 'change'}
      ],
      marketPhone:[
        {required: true, validator: marketPhone, trigger: 'change'}
      ],
      template:[
        {required: true, message: '请输入报文模板', trigger: 'change'}
      ],
      endpointTimeOut:[
        {validator: endpointTimeOut,trigger: 'change'}
      ],
      endpointTryCount:[
        {validator: endpointTryCount,trigger: 'change'}
      ],
      exConfig:[
        {required: true, validator: exConfig, trigger: 'change'}
      ]

    };
    return {
      form: {
        exConfig:[{
          exConfigName: '',
          exConfigKey: ''
        }],
      },
      rules,
      isRead:false,
      props: {
        value: 'label',
      },
      selectedOptions: [],
      isSaved:false,
      
      frequencyType :[{
        label:'每五分钟',
        value:'1'
      },{
        label:'每十分钟',
        value:'2'
      },{
        label:'每半小时',
        value:'3'
      },{
        label:'每一小时',
        value:'4'
      },{
        label:'每天',
        value:'5'
      }],
      endpointType:[{
        label:'FTP',
        value:0
      },{
        label:'HTTP',
        value:1
      },{
        label:'WEBSERVICE',
        value:2
      }]
    };
  },
  components: {
    ProvinceCity
  },
  methods: {
    plus () {
      this.form.exConfig.push({
        exConfigName: '',
        exConfigKey: ''
      });
    },
    minus (index) {
      if (this.form.exConfig.length > 1) {
        this.form.exConfig.splice(index, 1);
      }
    },
    getProvinceCity(data) {
      this.form.marketProvince = data[0];
      this.form.marketCity = data[1];
      this.selectedOptions = data;
    },
    marketDetail () {
      this.$axios.post('/dtp-admin/market/detail', {id:this.$route.query.id}).then((res) => {
        if (res.code === 200) {
          this.form = res.data;
          this.selectedOptions.push(this.form.marketProvince);
          this.selectedOptions.push(this.form.marketCity);
          if (!res.data.exConfig || res.data.exConfig.length === 0) {
            this.form.exConfig = [{
              exConfigName: '',
              exConfigKey: ''
            }]
          }
          this.$refs.province.echo(this.form.marketProvince,this.form.marketCity);
          if (this.type === 3) {
            delete this.form.id;
          }
        } else {
          this.$message.error(res.message);      
        }
      }).catch(()=>{
        this.$message.error('系统繁忙，请稍后重试');
      });
    },
    addMarket () {
      let addURL;
      if (this.type === 2) {
        addURL = '/dtp-admin/market/edit';
      } else {
        addURL = '/dtp-admin/market/add';
      }
      this.$axios.post(addURL, this.form).then((res) => {
        if (res.code === 200) {
          this.isSaved = false;
          this.$message.success(res.message);
          this.goback();
        } else {
          this.isSaved = false;
          this.$message.error(res.message);      
        }
      }).catch(()=>{
        this.isSaved = false;
        this.$message.error('系统繁忙，请稍后重试');
      });
      
      
    },
    goback () {
      this.$router.push({path:'/'});
    },
    selectCity () {
      this.form.marketProvince = this.selectedOptions[0];
      this.form.marketCity = this.selectedOptions[1];
    },
    handleSave () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.isSaved) {
            this.isSaved = true;
            this.addMarket();
          }
        }
      });
      
      
    },
    
  }
};
</script>

<style lang="less">
  .marketDetail {
    .footBtn {
      text-align: center;
      margin-top:20px;
    }
    .customArg {
      // width:100%;
      display:flex;
      margin-bottom:10px;
      .customBox {
        display: flex;
        width:100%;
        span {
          width:100%;
          padding-right:50px;
          text-align: right;
          font-size:12px;
        }
      }
    }
    .el-form-item .el-input__inner {
      width:100%;
      
    }
    .el-form-item__label {
      text-align: right;
    }
    .el-select {
      width:100%;
    }
    .el-icon-plus,.el-icon-minus {
      font-size:20px;
      line-height:36px;
      padding-left:20px;
      cursor: pointer;
    }
  }
</style>
