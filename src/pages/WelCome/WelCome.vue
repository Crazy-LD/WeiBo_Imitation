<template>
  <section class="welcome">
    <img src="../../common/images/1.png" v-if="isShow"/>
    <img src="../../common/images/3.jpg" v-else/>
  </section>
</template>

<script>
export default {
  data () {
    return {
      isShow: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.isShow = false
    }, 2000)
    setTimeout(() => {
      this.$router.replace('/profile')
    }, 7000)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .welcome
    width 100%
    height 100%
    img
      height 100%
      width 100%
</style>
