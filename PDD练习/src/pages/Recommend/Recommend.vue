<template>
    <div class="recommend-container">
      <ul class="recommend" v-if="recommendshoplist.length>0">
     <!--
     <li class="recommend-item" v-for="(recommend,index) in recommendshoplist" :key="index">
          <img :src="recommend.thumb_url" alt="" width="100%" v-if="recommend.thumb_url">
          <h4 class="item-title">{{recommend.short_name}}</h4>
          <div class="item-bottom">
            <span class="item-price">￥{{recommend.normal_price/100}}</span>
            <span class="item-sales">{{recommend.sales_tip}}</span>
            <button class="item-btn">找相关</button>
          </div>
        </li>
    -->
        <ShopList
                  tag="li"
                  v-for="(item,index) in recommendshoplist"
                  :key="index"
                  :item=item
        ></ShopList>
      </ul>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ShopList from './../../components/ShopList/ShopList'
    export default {
        name: "Recommend",
      mounted() {
          this.$store.dispatch('reqRecommendShopList')
      },
      computed:{
        ...mapState(['recommendshoplist']),
      },
      components:{
        ShopList
      },
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-container
    background: #f5f5f5
    width: 100%
    height: 100%
  .recommend
    display: flex
    flex-direction:row

    flex-wrap wrap
    background: #fff
    margin-bottom 50px

 /* .recommend-item:nth-child(2n-1)
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
    font-size 9px*/


</style>
