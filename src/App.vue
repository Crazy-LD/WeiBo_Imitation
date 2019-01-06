<template>
  <div id="app">
    <router-view/>
    <FooterGuider/>
  </div>
</template>

<script>
import FooterGuider from './components/FooterGuide/FooterGuide'
import {reqInitUser} from './api/api'
export default {
  components: {
    FooterGuider
  },
  async mounted () {
    let result = await reqInitUser()
    if (result.code === 0) {
      this.$store.dispatch('recordUserInfo', result.data)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
