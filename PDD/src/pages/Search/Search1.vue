<template>
  <div class="search" ref="search">
    <!--搜索导航-->
    <search-nav/>
    <!--联动列表-->
    <div class="shop">
      <!--左边-->
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item"
              v-for="(goods, index) in searchgoods"
              :key="index"
              :class="{current: index === currentIndex}"
              @click="clickLeftItem(index)"
              ref="menuList"
          >
            <span>{{goods.name}}</span>
          </li>
        </ul>
      </div>
      <!--右边-->
      <div class="shop-wrapper">
        <ul ref="shopsParent">
          <li class="shops-li" v-for="(goods, index1) in searchgoods" :key="index1">
            <div class="shops-title">
              <h4>{{goods.name}}</h4>
              <a href="">查看更多 ></a>
            </div>
            <ul class="phone-type" v-if="goods.tag === 'phone'">
              <li v-for="(phone,index3) in goods.category" :key="index3">
                <img :src="phone.icon" alt="">
              </li>
            </ul>
            <ul class="shops-items" >
              <li v-for="(item, index2) in goods.items" :key="index2">
                <img :src="item.icon" alt="">
                <span>{{item.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!--搜索面板-->
    <search-panel v-if="isShow"></search-panel>
  </div>
</template>

<script>
  import SearchNav from './children/SearchNav'
  import SearchPanel from './children/SearchPanel'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    name: "Search",
    mounted() {
      this.$store.dispatch('reqSearchGoods');
      this.clientHeight=`${document.documentElement.clientHeight}`
      /*
      , ()=>{
        this._initBScroll();
      }
      */
    },
    computed: {
      ...mapState(['searchgoods']),
      //用于决定左侧那个选项被选中
      currentIndex(){
        //获取数据
        const {scrollY,rightLiTops} = this;
        return rightLiTops.findIndex((liTop,index)=>{
          this._leftScroll(index);
          return scrollY >= liTop  &&  scrollY< rightLiTops[index +1];
        })
      }
    },
    components: {
      SearchNav,
      SearchPanel
    },
    watch: {
      searchgoods() {
        this.$nextTick(() => {
          //初始化
          this._initBScroll();
          //求出右边所有板块的位置
          this._initRightLiTops();
        })
      },

    },
    methods: {
      //初始化左
      _initBScroll() {
        // 1.1 左边
        this.leftScroll = new BScroll('.menu-wrapper', {
          scrollY: true,
          click: true
        });
        // 1.2 右边
        this.rightScroll = new BScroll('.shop-wrapper', {
          scrollY: true,
          click: true,
          probeType:3
        });
        //监听右侧的滑动事件
        this.rightScroll.on('scroll',(pos)=>{
          this.scrollY=Math.abs(pos.y);
        });

      },
      //初始化右
      _initRightLiTops(){
        //定义一个空数组
        const tempArr =[];
        //定义变量记录高度
        let top = 0;
        tempArr.push(top);
        //遍历右边的li标签，取出对应的li的高度
        let allLis = this.$refs.shopsParent.getElementsByClassName('shops-li');
        Array.prototype.slice.call(allLis).forEach(li=>{
          top += li.clientHeight;
          tempArr.push(top);
        });
        //更新数组的数据
        this.rightLiTops= tempArr;
        console.log(tempArr);
      },
      //点击联动切换
      clickLeftItem(index){
        this.scrollY=this.rightLiTops[index];
        this.rightScroll.scrollTo(0,-this.scrollY,300)
      },
      //左侧联动
      _leftScroll(index){
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        // console.log(el);
        this.leftScroll.scrollToElement(el,1,0,-500)
      },

    },
    data(){
      return{
        scrollY:0,//右侧列表滑动的Y轴坐标
        rightLiTops:[],//所有Li的分类的头部位置
        isShow:false//控制搜索面板的显示
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .search
    background #F5F5F5
    width 100%
    height 100%
    overflow hidden

  .shop
    display flex
    position absolute
    top 60px
    bottom 50px
    width 100%
    overflow hidden
    .menu-wrapper
      background-color #e0e0e0
      width 80px
      flex 0 0 80px
      .menu-item
        width 100%
        height 60px
        background-color: #fafafa
        display flex
        justify-content center
        align-items center
        font-weight lighter
        color #666666
        position relative
      .current
        color #e02e24
      .current::before
        content: ''
        background-color #e02e24
        width 4px
        height 30px
        position absolute
        left 0
    .shop-wrapper
      flex 1
      background-color #fff
      .shops-title
        display flex
        flex-direction row
        padding 0 10px
        height 44px
        align-items center
        justify-content space-between
        color #999
        a
          color #999
          text-decoration none
          font-weight lighter
      .shops-items
        display flex
        flex-wrap wrap
        li
          display flex
          flex-direction column
          width 33.3%
          height 90px
          justify-content center
          align-items center
          color #666
          font-weight lighter
          font-size 14px
          img
            width 60%
            height 60%
            margin-bottom 5px
      .phone-type
        width 100%
        display flex
        flex-direction row
        flex-wrap wrap
        border-bottom-1px(#ccc)
        li
          width 33.3%
          display flex
          justify-content center
          align-items center
          margin 5px 0
          img
            width 70%
</style>
