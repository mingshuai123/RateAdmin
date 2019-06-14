<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h2 class="title">全国上网场所评级平台</h2>
        <div class="title2">星评员后台登录</div>
      </div>

      <el-form-item  prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="mobile"
          v-model="loginForm.mobile"
          placeholder="请输入手机号"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="code" class="login-form-item">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="code"
          v-model="code"
          placeholder="请输入6位验证码"
          name="code"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
        <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span> -->
        <el-button class="code" v-if="btnTitle" @click="getVerifyCode" :disabled="disabled">{{btnTitle}}</el-button>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <div style="margin-right:20px;">如果您尚未注册账号，立即前往 <router-link to='register' class="routerlink">注册账号</router-link> </div>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import {router,dynamicRouter} from '@/router'
import store from '../../store';
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的手机号码（11位数字）'))
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
      code:'',
      loginForm: {
        mobile: '',
        code: ''
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', validator: validateUsername }],
        code: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      redirect: undefined,
      btnTitle:"获取验证码",
      disabled:false,  //是否可点击
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    code:function(val){
      this.loginForm.code=val
      if(val.length==6){

      }
    }
  },
  methods: {
    getVerifyCode(){
        if(this.validatePhone()) {
        //发送网络请求
        var data  = {
            act : 'REG',
            mobile: this.loginForm.mobile
        }
        this.postAxios('account/smscode/get',data).then(json=>{
            if(!json.code){
              this.$message.success('发送成功');
              this.disabled=true;
              this.validateBtn();
            }else{
              this.$message.error(json.message);
            }
        });
      }
    },
    validatePhone(){
            //判断输入的手机号是否合法
            if(!this.loginForm.mobile) {
                this.errors = {
                phone:"手机号码不能为空"
            }
                // return false
            } else if(!/^1[345678]\d{9}$/.test(this.loginForm.mobile)) {
                this.errors = {
                phone:"请输入正确是手机号"
            }
                // return false
            } else {
                this.errors ={}
                return true
            }
        },
    validateBtn(){
            //倒计时
            let time = 60;
            let timer = setInterval(() => {
            if(time == 0) {
                clearInterval(timer);
                this.disabled = false;
                this.btnTitle = "获取验证码";
            } else {
                this.btnTitle =time + '秒后重试';
                this.disabled = true;
                time--
            }
            },1000)
        },
    // showPwd() {
    //   if (this.passwordType === 'password') {
    //     this.passwordType = ''
    //   } else {
    //     this.passwordType = 'password'
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.password.focus()
    //   })
    // },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('user/login', this.loginForm).then(res => {
            console.log(res)
            if(res.role_id==0){
              this.$router.push({ path: this.redirect || '/Myform' })
            }else{
              this.$router.push({ path: this.redirect || '/' })
            }
              this.loading = false
          }).catch(() => {
            this.loading = false
          })
          
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
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

     .routerlink{
      color: #409eff;
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
