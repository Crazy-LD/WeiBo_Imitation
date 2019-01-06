<template>
  <section class="message">
    <Header title="消息"/>
    <div class="message_container">
      消息
    </div>
  </section>
</template>

<script>
import Header from '../../components/Header/Header'
export default {
  components: {
    Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .message_container
    padding-top 45px
</style>
