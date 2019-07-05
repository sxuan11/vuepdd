<template>
    <div class="me">
      <div v-if="userInfo.id">
        <MeTop></MeTop>
      </div>
      <SelectLogin v-else></SelectLogin>

    </div>
</template>

<script>
    import SelectLogin from './../Login/SelectLogin'
    import MeTop from './MeTop'
    import {mapState} from 'vuex'
    export default {
        name: "Me",
        components:{
         SelectLogin,
         MeTop
       },
        computed:{
          ...mapState(['userInfo'])
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .me
    background: #f5f5f5
</style>
