<template>
  <div class="setAvatar">
    <Header title="编辑资料">
      <i class="iconfont icon-zuojiantou left" slot="left" @click="$router.back()"></i>
      <button class="right right_send" slot="right" @click="handleSubmit">提交</button>
    </Header>
    <div class="setAvatar_container">
      <form ref="form" @submit.prevent>
        <div class="imgPick_container">
          <input type="file" ref="imgPicker" accept=".jpg, .png .jpeg" name="avatar">
          <span>头像：</span>
          <img ref="preView" src="http://localhost:3000/blank_avatar.jpg">
        </div>
        <div class="name_container">
          <span>昵称：</span>
          <input type="text" v-model="name" name="name">
        </div>
      </form>
    </div>
    <AlertTip :alertText="alertText" @closeTip="isShowAlert = false" v-show="isShowAlert"/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import {mapState} from 'vuex'
import axios from 'axios'
import AlertTip from '../../components/AlertTip/AlertTip'
export default {
  data () {
    return {
      avatar: '',
      name: '',
      alertText: '',
      isShowAlert: false
    }
  },
  mounted () {
    this.$refs.imgPicker.onchange = () => {
      var imgFile = this.$refs.imgPicker.files[0]
      var fr = new FileReader()
      fr.onload = () => {
        this.$refs.preView.src = fr.result
        this.avatar = imgFile
      }
      fr.readAsDataURL(imgFile)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    handleSubmit () {
      // const {avatar, name, userInfo} = this
      // let userName = userInfo.userName
      // console.log(avatar, 'handleSubmit')
      // this.$store.dispatch('changeInfo', {avatar, name, userName})
      // this.$refs.form.submit()
      if (!this.avatar) {
        this._showTip('请上传头像')
        return 0
      }
      if (!this.name.trim()) {
        this._showTip('请输入名字')
        return 0
      }
      let param = new FormData()
      param.append('name', this.name)
      param.append('avatar', this.avatar, 'avatar.jpg')
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      console.log(param, 'param')
      axios.post('/api/changeInfo', param, config)
        .then(response => {
          if (response.data.code === 0) {
            let userInfo = response.data.data
            console.log(userInfo)
            this.$store.dispatch('recordUserInfo', userInfo)
            this.$router.replace('/profile')
          }
        })
    },
    _showTip (alertText) {
      this.alertText = alertText
      this.isShowAlert = true
    }
  },
  components: {
    Header,
    AlertTip
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .setAvatar
    height 100%
    width 100%
    padding-top 50px
    .setAvatar_container
      .imgPick_container
        position relative
        margin 10px 0
        height 130px
        background #fff
        input
          position absolute
          width 100px
          height 100px
          left 20%
          top 10%
          z-index 100
          border 2px solid orange
          opacity 0
        img
          position absolute
          width 100px
          height 100px
          left 20%
          top 10%
          border 2px solid orange
          border-radius 50%
        span
          line-height 130px
          font-size 17px
          margin-left 10px
      .name_container
        width 100%
        height 50px
        background #fff
        span
          font-size 17px
          line-height 50px
          margin-left 10px
        input
          border 1px solid orange
          border-radius 5px
          padding 5px
</style>
