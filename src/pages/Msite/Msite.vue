<template>
  <section class="msite">
    <Header title="微博首页">
      <router-link :to="userInfo.userName ? '/sendweibo': '/login'" slot="right" v-if="!userInfo.isManager">
        <i class="iconfont icon-jia right"></i>
      </router-link>
    </Header>
    <div class="msite_container">
        <div class='scroll'>
          <div class="msite_head">
            <div class="head_container" ref="head_list">
              <div class="head_item" v-for="(followeesInfo, index) in followeesInfos" :key="index">
                <div class="item_avatar" @click="chooseUser(followeesInfo.name)">
                  <img :src="BASE_URL + followeesInfo.avatar" :class="{on: followeesInfo.name === name}">
                </div>
                {{followeesInfo.name}}
              </div>
            </div>
          </div>
          <div class="msite_content_container">
            <div class="content_list">
              <div class="list_item" v-for="(weiboContent, weiBoIndex) in currentContents" :key="weiBoIndex">
                <div class="item_head">
                  <div class="head_img" @click="deleteUser(weiboContent)">
                    <img :src="BASE_URL +weiboContent.avatar">
                  </div>
                  <div class="head_info">
                    <div class="info_name">
                      {{weiboContent.name}}
                    </div>
                    <span class="info_date">
                  {{weiboContent.time | moment}}
                </span>
                  </div>
                </div>
                <div class="item_body">
                  <div class="body_text">
                    {{weiboContent.content}}
                  </div>
                </div>
                <div class="item_footer">
                  <div class="footer_container">
                    <i class="iconfont icon-appreciate_fill_light" :class="{on: (weiboContent.thumb_up_peoples ? weiboContent.thumb_up_peoples.indexOf(userInfo.name) : -1) !== -1}" @click="handleClick(weiboContent, (weiboContent.thumb_up_peoples ? weiboContent.thumb_up_peoples.indexOf(userInfo.name) : -1) !== -1)"></i>
                    <i class="iconfont icon-comment_fill_light" @click="$refs.text[weiBoIndex].focus()" v-if="!userInfo.isManager"></i>
                    <i class="iconfont icon-shanchu" v-if="userInfo.isManager || userInfo.name === weiboContent.name" @click="deleteWeiBo(weiboContent)"></i>
                    <i class="iconfont icon-forwardfill"></i>
                  </div>
                </div>
                <div class="item_like">
                  <i class="iconfont icon-zan2" v-show="weiboContent.thumb_up_peoples ? weiboContent.thumb_up_peoples.length > 0 ? true : false : false"></i>
                  <span v-for="(people, index) in weiboContent.thumb_up_peoples" :key="index" v-if="index < 6">{{people}}、</span>
                  <span v-if="weiboContent.thumb_up_peoples && weiboContent.thumb_up_peoples.length > 5">等{{weiboContent.thumb_up_peoples ? weiboContent.thumb_up_peoples.length : ''}}个人觉得很赞</span>
                </div>
                <div class="item_comment">
                  <div class="comment_content" v-for="(comment, index) in weiboContent.weiBoComments" :key="index" @click="atObserved(weiBoIndex, $event)">
                    <a class="content_observer" :data-index="index">{{comment.observerName}}</a>
                    <span v-if="comment.observedName">
                        回复
                      <span class="content_observee">{{comment.observedName}}</span>
                    </span>:
                    <span class="content_text">{{comment.content}}</span>
                  </div>
                </div>
                <div class="item_send_comment">
                  <textarea rows="1" ref="text"></textarea>
                  <button @click="handleComment(weiboContent.weiBoID, weiBoIndex)">评论</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
import Header from '../../components/Header/Header'
import {mapState, mapActions} from 'vuex'
import Vue from 'vue'
import BScroll from 'better-scroll'
import {reqDeleteUser} from '../../api/api'
import {MessageBox} from 'mint-ui'
export default {
  data () {
    return {
      BASE_URL: 'http://localhost:3000/',
      observed: '',
      content: '',
      allContent: '',
      name: '' // 当前选择用户的名字
    }
  },
  computed: {
    ...mapState(['weiboContents', 'followeesInfos', 'userInfo', 'currentContents'])
  },
  methods: {
    ...mapActions(['getWeiboContents', 'getFolloweesInfo', 'getCurrentContents']),
    handleClick (weiBoContent, isZan) {
      if (this.userInfo.isManager) return
      let weiBoID = weiBoContent.weiBoID
      this.$store.dispatch('changeZan', {weiBoID, isZan})
    },
    handleComment (weiBoID, index) {
      if (this.userInfo.isManager) return
      let textareas = this.$refs.text
      let textarea = textareas[index]
      this.allContent = textarea.value
      if (!this.allContent) return
      let {allContent, observed} = this
      const content = allContent.replace(`@${observed}:`, '')
      if (content === allContent) {
        observed = ''
      }
      this.$store.dispatch('comment', {content, observed, weiBoID})
      // 修改data里面的数据时，必须用this的形式，不然无效
      textarea.value = ''
      this.allContent = ''
    },
    atObserved (weiBoIndex, $event) {
      if (this.userInfo.isManager) return
      if ($event.target.nodeName.toLowerCase() === 'a') {
        // const index = parseInt($event.target.dataset.index)
        let currentObserved = $event.target.innerHTML
        let textareas = this.$refs.text
        let textarea = textareas[weiBoIndex]
        this.observed = currentObserved
        textarea.value = textarea.value + '@' + this.observed + ':'
        this.allContent = this.allContent + '@' + this.observed + ':'
        textarea.focus()
      }
    },
    deleteWeiBo (weiboContent) {
      MessageBox.confirm('确定要删除微博吗？').then(() => {
        const weiBoID = weiboContent.weiBoID
        this.$store.dispatch('deleteWeiBo', weiBoID)
      })
    },
    async deleteUser (weiboContent) {
      if (this.userInfo.isManager) {
        const {userName, name} = weiboContent
        MessageBox.confirm(`确定要删除${name}吗？`).then(() => {
          reqDeleteUser(userName).then(result => {
            if (result.code === 0) {
              this.$store.dispatch('deleteUser', {userName, name})
            }
          })
        })
      }
    },
    chooseUser (name) {
      if (name === this.name) {
        this.getCurrentContents()
        this.name = ''
      } else {
        this.getCurrentContents(name)
        this.name = name
      }
    }
  },
  async mounted () {
    await this.getWeiboContents(() => {
      this.$nextTick(() => {
        let headSwiper = new BScroll('.msite_head', {
          scrollX: true
        })
        Vue.use(headSwiper)
      })
    })
    await this.getFolloweesInfo(() => {
      this.$nextTick(() => {
        this.$refs.head_list.style.width = this.followeesInfos.length * 70 + 'px'
        let weiboScroll = new BScroll('.msite_container', {
          click: true
        })
        Vue.use(weiboScroll)
      })
    })
  },
  components: {
    Header
  },
  watch: {
    followeesInfos (value) {
      if (value.length) {
        this.$refs.head_list.style.width = value.length * 70 + 'px'
      }
    },
    weiboContents () {
      this.getCurrentContents()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .msite
    height 100%
    padding-top 50px
    overflow hidden
    Header
      .test
        color red
        position absolute
        right 3px
    .msite_container
      height 100%
      .scroll
        padding-bottom 60px
        .msite_head
            height 90px
            margin-top 10px
            background #FAFAFA
            .head_container
              padding 8px
              width 1000px
              height 100%
              .head_item
                height 100%
                width 70px
                float left
                text-align center
                font-size 12px
                color #666
                overflow hidden
                text-overflow ellipsis;
                white-space nowrap;
                .item_avatar
                  margin-bottom 5px
                  img
                    height 55px
                    width 55px
                    border-radius 50%
                    &.on
                      border 3px solid orange
        .msite_content_container
          height 100%
          width 100%
          overflow hidden
          .content_list
            width 100%
            .list_item
              background #fff
              padding 10px
              margin-top 10px
              box-sizing border-box
              .item_head
                height 60px
                .head_img
                  float left
                  img
                    font-size 12px
                    width 55px
                    height 55px
                    border-radius 50%
                .head_info
                  float left
                  height 100%
                  margin-left 10px
                  .info_name
                    font-size 18px
                    line-height 30px
                    font-weight 540
                  .info_date
                    font-size 12px
                    color #888
              .item_body
                padding 10px
                .body_text
                  font-size 16px
              .item_footer
                clearFix()
                border-bottom 1px solid #ddd
                .footer_container
                  float right
                  padding 10px
                  i
                    font-size 22px
                    padding 0 10px
                    color #777
                    &.on
                      color darkblue
              .item_like
                margin-top 10px
                font-size 14px
                color darkblue
                i
                  font-size 18px
              .item_comment
                padding 10px 0
                .comment_content
                  padding 5px 0
                  font-size 14px
                  .content_observer
                    color darkblue
                  .content_observee
                    color darkblue
              .item_send_comment
                width 100%
                display flex
                position relative
                font-size 15px
                textarea
                  flex 9
                  border 1px solid #999
                  margin-right 10px
                  border-radius 5px
                  padding 5px
                button
                  flex 1
                  background #fff
                  border 1px solid #999
                  border-radius 5px
                  color #777
                  &.on
                    background orange
</style>
