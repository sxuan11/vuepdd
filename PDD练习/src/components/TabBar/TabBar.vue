<template>
    <div class="bottom-tab">
      <span class="tab-item" @click="switchTo('/home')">
        <img :src=" $route.path.includes('/home') ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="">
        <span :class="{on:'/home' === $route.path.includes('/home')}">首页</span>
      </span>
      <span class="tab-item" @click="switchTo('/recommend')">
        <img :src="$route.path.includes('/recommend') ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="">
        <span :class="{on:$route.path.includes('/recommend')}">推荐</span>
      </span>
      <span class="tab-item" @click="switchTo('/search')">
        <img :src="'/search' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="">
        <span :class="{on:'/search' === $route.path}">搜索</span>
      </span>
      <span class="tab-item" @click="switchTo('/chat')">
        <img :src="'/chat' === $route.path ? tabBarImgArr[3].selected : tabBarImgArr[3].normal" alt="">
        <span :class="{on:'/chat' === $route.path}">聊天</span>
      </span>
      <span class="tab-item" @click="switchTo('/me')">
        <img :src="'/me' === $route.path ? tabBarImgArr[4].selected : tabBarImgArr[4].normal" alt="">
        <span :class="{on:'/me' === $route.path}">我的</span>
      </span>
    </div>
</template>

<script>
    export default {
        name: "TabBar",
        methods:{
        switchTo(path){
          // console.log(this.$router);
          this.$router.replace(path)
        }
      },
      data(){
          return{
            tabBarImgArr:[
              {normal:require('./../../../static/img/icon_home.png'),selected:require('./../../../static/img/icon_home_selected.png')},
              {normal:require('./../../../static/img/icon_intro.png'),selected:require('./../../../static/img/icon_intro_selected.png')},
              {normal:require('./../../../static/img/icon_search.png'),selected:require('./../../../static/img/icon_search_selected.png')},
              {normal:require('./../../../static/img/icon_chat.png'),selected:require('./../../../static/img/icon_chat_selected.png')},
              {normal:require('./../../../static/img/icon_mine.png'),selected:require('./../../../static/img/icon_mine_selected.png')},
            ]
          }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .bottom-tab
    width: 100%
    height 50px
    background: #fff;
    position: fixed
    left 0
    bottom 0
    display: flex
    z-index 100
  .tab-item
    display: flex
    flex 1
    flex-direction column
    align-items center
    justify-content center
    font-size 10px
    color #666
  .tab-item img
    width: 35%
    margin-bottom 2px
  .on
   color red
</style>
