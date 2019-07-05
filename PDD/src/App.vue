<template>
  <div id="app" class="main">
    <keep-alive>
    <router-view/>
    </keep-alive>
    <tab-bar v-show="$route.meta.showBottomTabBar"></tab-bar>
  </div>
</template>

<script>
  import TabBar from './components/TabBar/TabBar'

  export default {
    name: 'App',
    components:{
      TabBar
    },
    mounted(){
      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
#app {
  width: 100%
  height: 100%
  background: #f5f5f5
  position relative
}

</style>
