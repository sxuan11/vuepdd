<template>
  <div id="app" class="main">
    <router-view/>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from './components/TabBar/TabBar'
export default {
  name: 'App',
  components:{
    TabBar
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
#app {
  width: 100%
  height: 100%
  background: #fff
}

</style>
