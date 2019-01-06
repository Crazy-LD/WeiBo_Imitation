<template>
  <div class="sendweibo">
    <Header title="发微博">
      <i class="iconfont icon-zuojiantou left" slot="left" @click="$router.back()"></i>
      <button class="right right_send" slot="right" @click="sendWeiBo" :class="{on: weiBoText}">发送</button>
    </Header>
    <div class="sendweibo_content">
      <div class="content_text">
        <textarea id="" cols="30" rows="10" placeholder="分享新鲜事..." v-model="weiBoText"></textarea>
      </div>
      <div class="content_address">
        <div class="address_info">显示地点</div>
        <div class="address_right">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="content_see">
        <div class="see_info">谁能看见</div>
        <div class="see_right">
          <span>所有人可见</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="content_icon">
        <i class="iconfont icon-qq"></i>
        <i class="iconfont icon-weixin"></i>
        <i class="iconfont icon-shijianlishijilujishizhongbiaoxianxing"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import {reqSendWeiBo} from '../../api/api'
export default {
  data () {
    return {
      weiBoText: ''
    }
  },
  methods: {
    async sendWeiBo () {
      const {weiBoText} = this
      if (!weiBoText) return
      const result = await reqSendWeiBo(weiBoText)
      if (result.code === 0) {
        let weiBoContent = result.data
        this.$store.dispatch('addWeiBoContent', weiBoContent)
        this.$router.back()
      }
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .sendweibo_content
    padding-top 45px
    .content_text
      textarea
        width 100%
        height 200px
        font-size 16px
        padding 10px
        box-sizing border-box
    .content_address
      height 35px
      background #fff
      font-size 17px
      .address_info
        float left
        margin-left 10px
        line-height 35px
      .address_right
        float right
        line-height 35px
        margin-right 10px
    .content_see
      height 35px
      background #fff
      font-size 17px
      margin-top 10px
      .see_info
        float left
        margin-left 10px
        line-height 35px
      .see_right
        float right
        line-height 35px
        margin-right 10px
        span
          font-size 13px
          margin-right 4px
          color: #777
    .content_icon
      padding 10px
      i
        float left
        font-size 25px
        margin 0 10px
        &.icon-shijianlishijilujishizhongbiaoxianxing
          float right
          color blue
        &.icon-qq
          color blue
        &.icon-weixin
          color green
</style>
