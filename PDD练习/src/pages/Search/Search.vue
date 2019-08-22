<template>
    <div class="search">
      <!--搜索导航-->
      <SearchNav></SearchNav>
      <div class="shop">
        <!--左边-->
        <div class="menu-wrapper" >
          <ul class="" >
            <!-- <li class="menu-item current"><span>{{menu.name}}</span></li>-->
            <li class="menu-item" v-for="(goods,index3) in searchgoods" :key="index3">
              <span>{{goods.name}}</span></li>
          </ul>
        </div>
        <!--右边-->
        <div class="shop-wrapper" >
          <ul >
            <li class="shops-li" v-for="(goods,index4) in searchgoods" :key="index4">
              <div class="shops-title">
                <h4>{{goods.name}}</h4>
                <a href="">查看更多 ></a>
              </div>
              <ul class="shops-item">
                <li class="shop-li" v-for="(items,index5) in goods.items" :key="index5">
                  <img :src="items.icon" alt="">
                  <span>{{items.title}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import SearchNav from './children/SearchNav'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

    export default {
        name: "Search",
      components:{
        SearchNav
      },
        mounted() {
          this.$store.dispatch('reqSearchGoods')
        },
      computed:{
          ...mapState(['searchgoods'])
      },
      watch:{
        searchgoods(){
          this.$nextTick(()=>{

            this._initBScroll();

          })
        }
      },
      methods:{
        _initBScroll(){
          //初始化左边
          let LeftScroll = new BScroll('.menu-wrapper',{
            scrollY: true,
            click: true
          })
          let RightScroll = new BScroll('.shop-wrapper',{
            scrollY: true,
            click: true
          })
        },
      },
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .search
    background: #f5f5f5
    width: 100%
    height: 100%
    overflow: hidden
  .shop
    display: flex
    position: absolute
    top 60px
    bottom 50px
    width 100%
    background-color: #fff
  .menu-wrapper
    background-color: #e0e0e0
    width:80px
    flex 0 0 80px
  .menu-item
    width: 100%
    height: 60px
    background-color: #fafafa
    display: flex
    justify-content center
    align-items center
    font-weight lighter
    color #666
    position: relative
  .current
    color #e02e24
    background-color: #fff
  .current::before
    content:''
    background-color: #e02e24
    width 4px
    height: 30px
    position: absolute
    left:0
  .shop-wrapper
    background-color: #fff
    flex 1
  .shops-title
    display: flex
    flex-direction row
    padding 0 10px
    height 40px
    align-items center
    justify-content space-between
    color #999
  a
    color  #999
    text-decoration none
    font-weight lighter
  .shops-item
    display: flex
    flex-wrap wrap
  .shop-li
    display: flex
    flex-direction column
    width: 33.33%
    height:90px
    justify-content center
    align-items center
    color #666
    font-weight lighter
  img
    width: 60%
    height: 60%
    margin-bottom 5px

</style>
