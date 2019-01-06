<template>
  <div class="header">
    <slot name="left"/>
    <span class="header_title">
      <span class="header_title_text">
        {{title}}
      </span>
    </span>
    <slot name="right"/>
  </div>
</template>

<script>
export default {
  props: {
    title: String // 接受一个标题
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    position fixed
    width 100%
    height 45px
    top 0
    left 0
    background-color #FAFAFA
    font-size 17px
    font-weight bold
    z-index 100
    .header_title
      height 50%
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
    .left
      position absolute
      left 10px
      top 50%
      transform translateY(-50%)
    .right
      position absolute
      right 10px
      top 50%
      transform translateY(-50%)
      &.icon-jia
        font-size 25px
        background #FAFAFA
        color orange
      &.right_send
        background #fff
        border 1px solid #ddd
        padding 5px
        border-radius 5px
        &.on
          background orange
</style>
