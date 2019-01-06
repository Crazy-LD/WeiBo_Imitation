<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">{{isLogin ? '微博登录' : '修改密码'}}</h2>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <section>
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="userName">
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="密码" v-model="pwd" v-if="isShowMys">
              <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
              <div class="switch_button" :class="isShowMys ? 'off' : 'on'" @click="isShowMys = !isShowMys">
                <div class="switch_circle" :class="{right: isShowMys}"></div>
                <span class="switch_text" v-text="isShowMys ? '...' : '....abc'"></span>
              </div>
            </section>
            <section class="login_verification" v-if="!isLogin">
              <input type="tel" maxlength="8" placeholder="请再次输入密码" v-model="pwd2" v-if="isShowMys2">
              <input type="password" maxlength="8" placeholder="请再次输入密码" v-model="pwd2" v-else>
              <div class="switch_button" :class="isShowMys2 ? 'off' : 'on'" @click="isShowMys2 = !isShowMys2">
                <div class="switch_circle" :class="{right: isShowMys2}"></div>
                <span class="switch_text" v-text="isShowMys2 ? '...' : '....abc'"></span>
              </div>
            </section>
            <section class="login_message">
              <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
              <img src="http://localhost:3000/captcha" alt="captcha" class="get_verification" @click="getCaptcha" ref="captcha"></section>
            <section class="login_verification" v-if="isLogin">
              <div class="switch_button manager" :class="isManager ? 'on' : 'off'" @click="isManager = !isManager">
                <div class="switch_circle" :class="{right: isManager}"></div>
                <span class="switch_text" v-text="isManager ? 'on' : 'off'"></span>
              </div>
              <div class="verification_text">我是管理员</div>
            </section>
          </section>
          <button class="login_submit">{{isLogin ? '登录' : '确认修改'}}</button>
        </form>
        <a href="javascript:;" class="about_us" v-if="isLogin">关于我们</a>
      </div>
      <a href="javascript:" class="go_back iconfont icon-zuojiantou" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="isShowAlert" @closeTip="closeTip"/>
  </section>
</template>

<script>
import AlertTip from '../AlertTip/AlertTip'
import {reqLoginPwd, reqChangePwd} from '../../api/api'
import {Toast} from 'mint-ui'
import {mapState} from 'vuex'
export default {
  props: {
    isLogin: Boolean
  },
  data () {
    return {
      alertText: '', // 提示框的内容
      isShowAlert: false, // 是否显示提示框
      isShowMys: false, // 是否显示密码
      isShowMys2: false, // 是否显示确认密码
      isManager: false, // 是否为管理员登录
      pwd: '', // 用户密码
      pwd2: '', // 确认密码
      userName: '', // 用户名
      captcha: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  components: {
    AlertTip
  },
  methods: {
    // 登录函数
    async login () {
      const {userName, pwd, isManager, captcha, showTipFun, isLogin} = this
      if (!userName) {
        showTipFun('用户名不能为空')
        return 0
      } else if (!pwd) {
        showTipFun('密码不能为空')
        return 0
      } else if (!isLogin && !this.pwd2) {
        showTipFun('新密码不能为空')
        return 0
      } else if (!captcha) {
        showTipFun('验证码不能为空')
        return 0
      }
      if (isLogin) {
        let result = await reqLoginPwd({userName, pwd, isManager, captcha})
        console.log(result)
        if (result.code === 0) {
          this.$store.dispatch('recordUserInfo', result.data)
          this.getCaptcha()
          this.$router.replace('/profile')
          sessionStorage.setItem('access_token', true)
        } else {
          showTipFun(result.msg)
          this.getCaptcha()
        }
      } else {
        if (this.userName !== this.userInfo.userName) {
          console.log(this.userInfo)
          showTipFun('用户名不正确')
          return 0
        }
        const {pwd2} = this
        if (pwd !== pwd2) {
          showTipFun('请重新检查密码')
          return 0
        } else {
          let result = await reqChangePwd({pwd, captcha})
          if (result.code === 0) {
            Toast({
              message: '修改成功',
              position: 'bottom',
              duration: 3000
            })
            this.$router.replace('/profile')
            return 0
          } else {
            showTipFun(result.msg)
            return 0
          }
        }
      }
      this.getCaptcha()
    },
    // 传入提示框内容并显示
    showTipFun (text) {
      this.alertText = text
      this.isShowAlert = true
    },
    // 关闭提示框
    closeTip () {
      this.alertText = ''
      this.isShowAlert = false
    },
    // 重新获取验证码
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:3000/captcha?time=' + Date.now()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
    .login_content
      >form
        margin-top 40px
        input
          width 100%
          height 50px
          padding-left 10px
          box-sizing border-box
          border 1px solid #ddd
          border-radius 4px
          outline 0
          font 400 14px Arial
          &:focus
            border 1px solid #02a774
        .login_message
          position relative
          margin-top 16px
          height 48px
          font-size 14px
          background #fff
          .get_verification
            position absolute
            top 50%
            right 10px
            transform translateY(-50%)
            border 0
            color #ccc
            font-size 14px
            background transparent
            &.isChoosed
              color black
        .login_verification
          position relative
          margin-top 16px
          height 48px
          font-size 14px
          background #fff
          .verification_text
            font 400 14px Arial
            margin-left 60px
            line-height 48px
            color #999
          .switch_button
            font-size 12px
            border 1px solid #ddd
            border-radius 8px
            transition background-color .3s,border-color .3s
            padding 0 6px
            width 30px
            height 16px
            line-height 16px
            color #fff
            position absolute
            top 50%
            right 10px
            transform translateY(-50%)
            &.manager
              left 10px !important
            &.off
              background #fff
              .switch_text
                float right
                color #ddd
            &.on
              background #02a774
            >.switch_circle
              position absolute
              top -1px
              left -1px
              width 16px
              height 16px
              border 1px solid #ddd
              border-radius 50%
              background #fff
              box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
              transition transform .3s
              &.right
                transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      z-index:120
      .iconfont
        font-size 20px
        color #999
</style>
