<template>
  <div class="footer_guide" v-show="$router.currentRoute.meta.isShowFooter">
    <span class="guide_item" @click="goTo('/msite')">
      <span class="item_icon">
        <i class="iconfont" :class="$route.path === '/msite' ? 'icon-homepage_fill' : 'icon-homepage'"></i>
      </span>
      微博
    </span>
    <span class="guide_item" @click="goTo('/video')">
      <span class="item_icon">
        <i class="iconfont" :class="$route.path === '/video' ? 'icon-video_fill' : 'icon-video1'"></i>
      </span>
      视频
    </span>
    <span class="guide_item" @click="goTo('/find')">
      <span class="item_icon">
        <i class="iconfont" :class="$route.path === '/find' ? 'icon-searchfill' : 'icon-search'"></i>
      </span>
      发现
    </span>
    <span class="guide_item" @click="goTo('/message')">
      <span class="item_icon">
        <i class="iconfont" :class="$route.path === '/message' ? 'icon-mail_fill' : 'icon-mail'"></i>
      </span>
      消息
    </span>
    <span class="guide_item" @click="goTo('/profile')">
      <span class="item_icon">
        <i class="iconfont" :class="$route.path === '/profile' ? 'icon-mine_fill' : 'icon-mine'"></i>
      </span>
      我的
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    goTo (router) {
      this.$router.replace(router)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .footer_guide
    position fixed
    bottom 0
    left 0
    display flex
    width 100%
    height 40px
    background #fff
    z-index 100
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      span
        font-size 12px
        .iconfont
          font-size 23px
</style>
