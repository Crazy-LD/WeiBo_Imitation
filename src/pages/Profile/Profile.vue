<template>
  <section class="profile">
    <Header title="个人中心"/>
    <div class="profile_container">
      <div class="profile_head">
        <div class="head_produce" @click="!userInfo.userName && $router.push('/login')">
          <img :src="userInfo.avatar ? (BASE_URL + userInfo.avatar) : 'http://localhost:3000/blank_avatar.jpg'" ref="avatar" @click.stop="$router.push(userInfo.userName ? '/setavatar' : '/login')">
          <div>
            <p class="produce_username" v-text="userInfo.name || userInfo.userName || '登录/注册'"></p>
            <p class="produce_pro">简介：暂无介绍</p>
          </div>
          <div class="produce_right">
            <i class="iconfont icon-right"></i>
          </div>
        </div>
        <div class="head_info">
          <span class="info_item">
            2<p>微博</p>
          </span>
          <span class="info_item">
            44<p>关注</p>
          </span>
          <span class="info_item">
            22<p>粉丝</p>
          </span>
        </div>
      </div>
      <div class="profile_nav">
        <div class="nav_list" v-for="(navInfo, index) in navInfos" :key="index">
          <div class="list_item" v-for="(item, index) in navInfo" :key="index">
            <i class="iconfont" :class="item.icon"></i>
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="profile_list">
        <div class="list_item">
          <i class="iconfont icon-mianliuliangxiazai"></i>
          <span>免流量</span>
          <i class="iconfont icon-right"></i>
        </div>
        <div class="list_item">
          <i class="iconfont icon-river_xx_cgx"></i>
          <span>草稿箱</span>
          <i class="iconfont icon-right"></i>
        </div>
        <div class="list_item">
          <i class="iconfont icon-phone"></i>
          <span>微博服务</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="profile_leave">
        <button class="leave_quit" @click="$router.push('/changepwd')">修改密码</button>
        <button class="leave_quit" @click="logout">退出</button>
        <button class="leave_logout" @click="deleteUser">注销</button>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '../../components/Header/Header'
import {MessageBox} from 'mint-ui'
import {mapState} from 'vuex'
import {reqDeleteUser} from '../../api/api'
export default {
  data () {
    return {
      navInfos: [
        [
          {
            icon: 'icon-19',
            name: '我的相册'
          },
          {
            icon: 'icon-service-directory',
            name: '我的故事'
          },
          {
            icon: 'icon-zan',
            name: '我的赞'
          },
          {
            icon: 'icon-liebiao',
            name: '粉丝服务'
          }
        ],
        [
          {
            icon: 'icon-qianbao',
            name: '微博钱包'
          },
          {
            icon: 'icon-icon-test',
            name: '微博运动'
          },
          {
            icon: 'icon-weibo',
            name: '粉丝头条'
          },
          {
            icon: 'icon-kefu',
            name: '客服中心'
          }
        ]
      ],
      BASE_URL: 'http://localhost:3000/'
    }
  },
  mounted () {
    if (this.userInfo.avatar) {
      this.$refs.avatar.src = this.BASE_URL + this.userInfo.avatar
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    logout () {
      MessageBox.confirm('确定要退出吗？').then(() => {
        this.$store.dispatch('clearUserInfo')
      })
    },
    deleteUser () {
      const {userName, isManager} = this.userInfo
      MessageBox.confirm('确定要注销吗？').then(() => {
        if (isManager) {
          reqDeleteUser().then(result => {
            if (result.code === 0) {
              this.$store.dispatch('deleteUser')
              this.$store.dispatch('clearUserInfo')
            }
          })
        } else {
          reqDeleteUser(userName).then(result => {
            if (result.code === 0) {
              this.$store.dispatch('deleteUser', userName)
              this.$store.dispatch('clearUserInfo')
            }
          })
        }
      })
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .profile_container
    padding-top 45px
    background-color #F5F5F5
    height 100%
    overflow auto
    padding-bottom 50px
    .profile_head
      margin-top 10px
      background-color #fff
      display flex
      flex-direction column
      .head_produce
        float left
        .produce_right
          float right
          margin-top 30px
          margin-right 10px
        img
          float left
          height 60px
          width 60px
          border-radius 50%
          margin 10px
        div
          float left
          margin-top 20px
          .produce_username
            font-size 16px
            font-weight 550
          .produce_pro
            font-size 12px
            margin-top 10px
            color: #999
      .head_info
        border-top 1px solid #eee
        padding 10px
        width 100%
        display flex
        .info_item
          flex 1
          text-align center
          p
            margin-top 3px
            font-size 12px
            color: #999
    .profile_nav
      width 100%
      background-color white
      margin-top 10px
      .nav_list
        display flex
        .list_item
          position relative
          display flex
          flex-direction column
          flex 1
          text-align center
          padding 10px
          font-size 10px
          .iconfont
            font-size 30px
            padding-bottom 10px
          .icon-19
            color green
          .icon-service-directory
            color yellow
          .icon-zan
            color pink
          .icon-liebiao
            color blue
          .icon-qianbao
            color red
          .icon-icon-test
            color pink
          .icon-weibo
            color yellow
          .icon-kefu
            color green
    .profile_list
      margin-top 10px
      background #fff
      clearFix()
      .list_item
        width 100%
        height 50px
        line-height 50px
        border-bottom 1px solid #eee
        sapn
        font-size 14px
        float left
        .iconfont
          font-size 25px
          vertical-align middle
          padding 10px
        .icon-river_xx_cgx
          color orange
        .icon-mianliuliangxiazai
          color blue
        .icon-phone
          color red
        .icon-right
          float right
          font-size 20px
          color #ccc
    .profile_leave
      background #fff
      margin-top 10px
      display flex
      flex-direction column
      button
        height 50px
        width 100%
        font-size 15px
        font-weight bold
        border-radius 10px
        background #fff
        color #EF4F4F
</style>
