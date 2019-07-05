<template>
  <div class="select-login">
    <div class="bottom">
      <router-link tag="div" to="/home"><img src="./images/login_footer.png" alt="" width="200"></router-link>
    </div>
    <h4>选择登录方式</h4>
    <router-link tag="button" to="/login">手机登录</router-link>
    <!-- <router-link tag="button" to="/loginz">密码登录</router-link> -->
  </div>
</template>

<script>
    export default {
        name: "SelectLogin",

    }
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
  .select-login
    background-color #f5f5f5
    width 100%
    height 100%
    position fixed
    left 0
    top 0
    z-index 1000
    display flex
    flex-direction column
    justify-content center
    align-items center
    button
      width 80%
      height 38px
      background-color #f6a622
      border none
      border-radius 5px
      font-size 20px
      color #fff
      margin-top 30px
    .bottom
      position: fixed;
      bottom: .62rem;
      width: 100%;
      text-align: center;
      max-width: 640px;


</style>
