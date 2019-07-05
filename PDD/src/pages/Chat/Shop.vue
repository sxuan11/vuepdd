<template>
    <div>
      <p>你的购物车是空的，</p>
      <router-link tag="button" to="/recommend">点击去购物</router-link>
    </div>
</template>

<script>
    export default {
        name: "Shop"
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  div
    margin 100px auto
</style>
