<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/login_footer.png" alt="" width="250">
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;" :class="{current : !loginMode} " @click="dealLoginMode(false) ">短信登录</a>
          <a href="javascript:;" :class="{current : loginMode}" @click="dealLoginMode(true)">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current : !loginMode} " @click="dealLoginMode(false)">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                v-if="!countDown"
                class="get-verification"
                :class="{phone_right:phoneRight}"
                @click.prevent="getVerifyCode"
              >获取验证码</button>
              <button
                v-else disabled="disabled"
                class="get-verification"
              >重新发送{{countDown}}</button>
            </section>
            <section class="login-verification">
              <input
                type="tel"
                maxlength="6"
                placeholder="验证码"
                v-model="code"
                ref="code"
              >
            </section>
            <section class="login-hint">
              登录即代表您已同意
              <a href="javascript:;"> <span>服务协议与隐私政策</span></a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current : loginMode}" @click="dealLoginMode(true)">
            <section>
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="用户名/手机/邮箱" v-model="user_name">
              </section>
              <section class="login-verification">
                <input type="password" maxlength="18" placeholder="密码" v-if="pwdMode" v-model="pwd">
                <input type="text" maxlength="18" placeholder="密码" v-else v-model="pwd">
                <div class="switch-show">
                  <img
                    :class="{on:pwdMode}"
                    src="./images/hide_pwd.png"
                    @click.prevent="changePwdMode(false)"
                    alt="" width="20">
                  <img
                    :class="{on:!pwdMode}"
                    src="./images/show_pwd.png"
                    @click.prevent="changePwdMode(true)"
                    alt=""
                    width="20">
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                <img
                  class="get_verification"
                  src="http://localhost:3000/api/captcha"
                  alt="captcha"
                  ref="captcha"
                  @click.prevent="getCaptcha()"
                >
              </section>
            </section>
          </div>
          <button class="login-submit" @click.prevent="login">登录</button>
        </form>
        <!--<button class="login-back" @click="$router.back()">返回</button>-->
        <router-link tag="button" to="/me" class="login-back">返回</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import {getPhoneCode} from './../../api/index'
  import {phoneCodeLogin} from './../../api/index'
  import {pwdLogin} from './../../api/index'
  import { Toast } from 'mint-ui';
  import {mapActions} from 'vuex';
  export default {
    name: "Login",
    data(){
      return{
        loginMode:true, //设置选择登录的方式  true是手机登录  false是账号密码登录
        phone:'',       //手机号码
        countDown:0,    //验证码倒计时
        pwdMode:true,   //密码的显示方式
        pwd:'',         //密码
        captcha: '',    //图形验证码
        code:'',        //手机验证码
        userInfo:{},    //用户信息
        empty:'',       //错误的验证码清空
        user_name:'',   //用户名

      }
    },
    methods: {
      ...mapActions(['syncUserInfo']),
      //清空输入框
      clearInput(){
        this.code='';
      },
      //改变登录方式
      dealLoginMode(flag) {
        this.loginMode = flag
      },
      //改变密码的显示模式
      changePwdMode(flag) {
        this.pwdMode = flag;
      },
      //验证码设置
      async getVerifyCode() {
        //开启倒计时
        if (this.phoneRight) {
          this.countDown = 60;
          this.intervalId = setInterval(() => {
            this.countDown--;
            if (this.countDown === 0) {
              clearInterval(this.intervalId);
            }
          }, 1000)
        }
        //获取短信验证码
        let result = await getPhoneCode(this.phone);
        console.log(result);
        //获取验证码吗成功
        if (result.success_code === 200) {
          Toast({
            message: "发送成功",
            position: 'center',
            duration: 3000
          })}
        //获取验证码失败
        if (result.err_code === 0) {
          Toast({
            message: result.message,
            position: 'center',
            duration: 3000
          })
        }
      },
      //图形验证码改变
      getCaptcha(){
        this.$refs.captcha.src = 'http://localhost:3000/api/captcha?time=' + new Date();
      },
      //登录
      async login(){
        //登录模式
        if (this.loginMode) {//手机验证码登录
          //网页校验
          if (!this.phone){
            Toast({
              message: "请手机号码!",
              position: 'center',
              duration: 4000
            });
            return;
          }else if (!this.phoneRight) {
            Toast({
              message: "请输入正确的手机号码!",
              position: 'center',
              duration: 4000
            });
            return;
          }
          if (!this.code){
            Toast({
              message: "验证码不能为空!",
              position: 'center',
              duration: 3000
            });
            return;
          } else if(!(/^\d{6}$/gi.test(this.code))){
            Toast({
              message: "验证码不正确!",
              position: 'center',
              duration: 3000
            });
            return;
          }
          //提交登录
          const result = await phoneCodeLogin(this.phone,this.code);
          // console.log(result);
          //登录成功
          if (result.success_code === 200) {
            this.userInfo = result.message;

          }else{//登录失败
            this.userInfo= {
              message:'登录失败，验证码错误!'
            }
          }



        }else {//账号密码登录
          //网页校验
          if (!this.user_name) {
            Toast({
              message: "请输入用户名/手机/邮箱",
              position: 'center',
              duration: 4000
            });
            return;
          }
          if(!this.pwd){
            Toast({
              message: "请输入密码",
              position: 'center',
              duration: 4000
            });
            return;
          }
          if (!this.captcha) {
            Toast({
              message: "请输入验证码",
              position: 'center',
              duration: 4000
            });
            return;
          }
          //提交登录
          const result = await pwdLogin(this.user_name,this.pwd,this.captcha);
          // console.log(result);
          if (result.success_code === 200) {
            this.userInfo = result.message;

          }else{//登录失败
            this.userInfo= {
              message:'登录失败，账号或密码错误!'
            }
          }

        }


        //后续处理
        if(!this.userInfo.id){//登录失败
          Toast(this.userInfo.message);
          this.clearInput();
        }else{//成功
          //同步用户数据，将用户数据插入数据库
          this.syncUserInfo(this.userInfo);
          //路由返回
          this.$router.back()

        }
      }
    },


    computed:{
      phoneRight(){ //验证当前手机是否合法
        return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .login-container
    width 100%
    height 100%
    background #fff
    .login-inner
      padding-top 60px
      width 80%
      margin 0 auto
      .login-header
        .login-logo
          font-size 40px
          font-weight bold
          color #e02e24
          text-align center
        .login-header-title
          padding-top 40px
          padding-bottom 10px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.current
              color #e02e24
              font-weight 700
              border-bottom 2px solid #e02e24
      .login-content
        >form
          >div
            display none
            &.current
              display block
            input
              width 100%
              height 100%
              padding-left 8px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #e02e24
            .login-message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get-verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.phone_right
                  color red
            .login-verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch-show
                position absolute
                right 10px
                top 12px
                img
                  display none
                img.on
                  display block
            .login-hint
              margin-top 12px
              color #999
              font-size 12px
              line-height 20px
              >a
                color #e02e24
          .login-submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #e02e24
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .login-back
          display block
          width 100%
          height 42px
          margin-top 15px
          border-radius 4px
          background transparent
          border: 1px solid #e02e24
          color #e02e24
          text-align center
          font-size 16px
          line-height 42px
  .login_message
    position: relative
    margin-top 16px
    height 48px
    font-size 14px
    background #fff
  .get_verification
    position: absolute
    height: 80%
    top 3px
    right 3px
</style>
