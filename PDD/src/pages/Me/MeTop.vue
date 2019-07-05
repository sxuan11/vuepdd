<template>
    <div class="me-top">
      <router-link  class="user" to="./MeDetail" tag="div" >
        <img src="./images/me_icon.png" alt="">
        <p>{{userInfo.user_name}}</p>
        <p>{{userInfo.user_phone | phoneFormat}}</p>
      </router-link>
      <div class="my-older">
        <div class="older-top">
          <p>我的订单</p>
          <span>查看全部></span>
        </div>
        <div class="older-bottom">
          <div class="bottom-item">
            <i class="icon-pay"></i>
            <span>待付款</span>
          </div>
          <div class="bottom-item">
            <i class="icon-send"></i>
            <span>待发货</span>
          </div>
          <div class="bottom-item">
            <i class="icon-deliver"></i>
            <span>待收货</span>
          </div>
          <div class="bottom-item">
            <i class="icon-comment"></i>
            <span>待评价</span>
          </div>
          <div class="bottom-item">
            <i class="icon-refund"></i>
            <span>退款/售后</span>
          </div>
        </div>
      </div>
      <div class="setting">
        <div class="setting-top">
          <span>工具与服务</span>
        </div>
        <div class="setting-bottom">
          <div class="setting-item">
            <i class="icon-service"></i>
            <span>客户服务</span>
          </div>
          <div class="setting-item">
            <i class="icon-paint-format"></i>
            <span>主题换肤</span>
          </div>
          <div class="setting-item">
            <i class="icon-box-add"></i>
            <span>闲置管家</span>
          </div>
          <div class="setting-item">
            <i class="icon-checkbox-checked"></i>
            <span>我的预约</span>
          </div>
          <div class="setting-item">
            <i class="icon-spinner5"></i>
            <span>我的试用</span>
          </div>
          <div class="setting-item">
            <i class="icon-cascades"></i>
            <span>我的拼购</span>
          </div>
          <div class="setting-item">
            <i class="icon-qr_code"></i>
            <span>我的必购码</span>
          </div>
          <div class="setting-item">
            <i class="icon-spinner5"></i>
            <span>我的预约</span>
          </div>
          <router-link class="setting-item" tag="div" to="/MeSetting">
            <i class="icon-more"></i>
            <span>更多</span>
          </router-link>
        </div>

      </div>
    </div>

</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "MeTop",
        computed:{
          ...mapState(["userInfo"])
        },
        filters:{
          phoneFormat(phone){
            //转换成数组
            let phoneArr = [...phone];
            //遍历数组
            let str = '';
            phoneArr.forEach((item,index)=>{
              if (index === 3 || index === 4 || index === 5 || index === 6 ){
                str = str +"*";
              }else {
                str += item ;
              }
            });
            return str
          }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .user
    background-color: #fff
    display flex
    flex-direction row
    align-items center
    padding 20px
    margin-bottom: 10px
    img
      border-radius 60px
      width: 20%
      height: 20%
    p
      font-size 20px
      margin-left 5px
  .my-older
    background-color: #fff
    margin-top 10px
    .older-top
      display flex
      flex-direction row
      padding 0 10px
      justify-content space-between
      height 44px
      line-height 44px
    .older-bottom
      display flex
      .bottom-item
        flex 1
        height 80px
        display flex
        flex-direction column
        justify-content center
        align-items center
        i
          font-size 25px
          color #E9232C
          margin-bottom 5px
  .setting
    margin-top 10px
    background-color: #fff
    padding: 10px
    .setting-top
      display flex
      flex-direction row
      justify-content flex-start
      align-items flex-start
      margin-top 10px
    .setting-bottom
      margin-top 10px
      height 300px
      display flex
      justify-content space-around


      flex-wrap wrap
      .setting-item
        width 90px
        height 70px
        display flex
        flex-direction column
        justify-content center
        align-items center
        i
          font-size 25px
          color orange
          margin-bottom 5px
</style>
