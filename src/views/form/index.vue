<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h2 class="title">全国上网场所评级平台</h2>
        <div class="title2">星评员资料填写</div>
        <div class="title2">您的登录手机号：{{mobile}}</div>
        <div class="title2">请完善您的星评员资料</div>
      </div>
      <el-form-item class="login-form-item" prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="mobile"
          v-model="loginForm.name"
          placeholder="真实姓名"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="tel"
          v-model="loginForm.tel"
          placeholder="其他联系方式(选填)"
          name="tel"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">完成</el-button>
      
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;margin-left:0;" @click.native.prevent="handleLogout">退出登录</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">mobile: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { validRealname } from '@/utils/validate'
import store from '../../store';
import {router,dynamicRouter} from '@/router'
export default {
  name: 'Myform',
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log(!validRealname(value))
      if (!validRealname(value)) {
        callback(new Error('请输入真实姓名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }
    return {
      mobile:'',
      loginForm: {
        name: '',
        tel: ''
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', validator: validateUsername }],
      },
      loading: false,
      redirect: undefined,
      btnTitle:"获取验证码",
      disabled:false,  //是否可点击
    }
  },
  watch: {
    // password:function(val){
    //   this.loginForm.password=val
    //   if(val.length==6){

    //   }
    // }
  },
  created(){
    console.log(store)
  },
  methods: {
    getVerifyCode(){
        if(this.validatePhone()) {
        //发送网络请求
        var data  = {
            act : 'findpwd',
            mobile: this.loginForm.mobile
        }
        this.postAxios('member/sms/getcode',data).then(json=>{
            if(!json.errCode){
              this.$message.success('发送成功');
              this.disabled=true;
              this.validateBtn();
            }else{
              this.$message.error(json.errMsg);
            }
        });
        }
    },
    validatePhone(){
            //判断输入的手机号是否合法
            if(!this.loginForm.name) {
                this.errors = {
                phone:"真实姓名不能为空"
            }
                return false
            } else if(/^([\u4e00-\u9fa5]){2,7}$/.test(this.loginForm.name)) {
                this.errors = {
                phone:"请输入真实姓名"
            }
                return false
            } else {
                this.errors ={}
                return true
            }
        },
        handleLogout(){
          this.$store.dispatch('user/logout').then((res)=>{
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          })
          
        },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postAxios('judge/info/post', this.loginForm).then((res) => {
            this.$message.error(res.errMsg)
            if(res.errCode==0){
              this.loading = false;
            }else{
              this.$message.error(res.errMsg)
              console.log(res.errMsg)
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .login-form-item{
      position: relative;
      .code{
        position:absolute;
        right:10px;
        top:5px;
        cursor: pointer;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .title2 {
      font-size: 20px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>