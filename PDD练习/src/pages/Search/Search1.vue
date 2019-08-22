<template>
  <div class="search" ref="search">
    <!--搜索导航-->
    <search-nav/>
    <div class="shop">
      <!--左边-->
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item "
              v-for="(goods, index) in searchgoods"
              :key="index"
              :class="{current: index === currentIndex}"
              ref="menuList"
              @click="clickLeftItem(index)"
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
  </div>
</template>

<script>
  import SearchNav from './children/SearchNav'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    name: "Search",
    mounted() {
      this.$store.dispatch('reqSearchGoods');
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
        const {scrollY,rightLiTops}= this;
        return rightLiTops.findIndex((liTop,index)=>{
          this._leftScroll(index);
          return scrollY >=liTop && scrollY <= rightLiTops [ index + 1 ];
        })
      }
    },
    components: {
      SearchNav
    },
    watch: {
      searchgoods() {
        this.$nextTick(() => {
          //初始化
          this._initBScroll();
          //初始化右边的Li的高度
          this._initRightLiTops();
        })
      },
    },
    methods: {
      //初始化左
      _initBScroll() {
        // 1.1 左边
        this.leftBscroll = new BScroll('.menu-wrapper', {
          scrollY: true,
          click:true
        });
        // 1.2 右边
        this.rightBscroll = new BScroll('.shop-wrapper', {
          scrollY: true,
          click: true,
          probeType:3
        });
        //监听右侧的滑动事件
        this.rightBscroll.on('scroll',(pos)=>{
          this.scrollY=Math.abs(pos.y);
        })

      },
      //初始化右
      //求出Li的高度
      _initRightLiTops(){
        //定义一个空数组来接收每个li当前的高度
        const tempArr=[];
        //定义一个记录高度为0
        let top = 0;
        //将当前的高度推入数组中
        tempArr.push(top);
        //遍历右边所有的li元素
        let allLis =this.$refs.shopsParent.getElementsByClassName('shops-li');
        //将伪数组转换成真数组
        Array.prototype.slice.call(allLis).forEach(li=>{
          top+=li.clientHeight;
          tempArr.push(top);
        });
        //将临时数组存入LiTops
        this.rightLiTops = tempArr;

      },
      clickLeftItem(index){
        this.scrollY=this.rightLiTops[index];
        this.rightBscroll.scrollTo(0,-this.scrollY,300)
      },
      //左侧联动
      _leftScroll(index){
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.leftBscroll.scrollToElement(el,1,0,-400)
      }

    },
    data(){
      return{
        scrollY:0,
        rightLiTops:[],
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
