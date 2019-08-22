<template>
  <a class="recommend-item" >
    <img :src="item.thumb_url" alt="" width="100%" v-if="item.thumb_url">
    <h4 class="item-title">{{item.short_name}}</h4>
    <div class="item-bottom">
      <span class="item-price">￥{{item.normal_price/100}}</span>
      <span class="item-sales">{{item.sales_tip}}</span>
      <button class="item-btn">找相关</button>
    </div>
  </a>
</template>

<script>
    export default {
        name: "ShopList",
        props:{
          item:Object,
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-item:nth-child(2n-1)
    width: 49.5%
    margin-right 1%
  .recommend-item
    width: 49.5%
    margin-bottom 10px
    padding-bottom 10px
  .item-title
    font-size 14px
    line-height 20px
    font-weight lighter
    height 20px
    overflow: hidden
    margin 5px 0
    padding 0 5px
  .item-bottom
    display: flex
    flex-direction:row
    align-items center
    padding:0 6px
  .item-price
    flex 2
    color red
    font-weight bolder
    font-size 15px
  .item-sales
    flex 4
    font-size 3px
    color #666
    margin-left 1px
  .item-btn
    flex 2
    border 1px solid red
    height 23px
    border-radius 5px
    background-color: transparent
    color red
    font-size 9px

</style>
