<template>
    <div class="search-panel">
      <div class="search-nav">
        <div class="search-input">
          <img  src="../images/search.png" alt="" width="25">
          <input ref="mySearch" type="search" placeholder="搜索">
        </div>
        <button @click.prevent="isShowSearchPanel(false)">取消</button>
      </div>
      <div class="search-content">
        <div class="title">
          <img src="../images/hot.png" alt="" width="25">
          <span>热门搜索</span>
        </div>
        <ul class="search-list">
          <li>充电器快充</li>
          <li>一字肩连衣裙夏</li>
          <li>多功能衣架</li>
          <li>宝宝睡衣夏</li>
          <li>钥匙扣ins</li>
          <li>卷发筒</li>
          <li>九分高腰花苞裤</li>
          <li>婴儿衣服夏季女</li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "SearchPanel",
        props:{
          isShowSearchPanel:Function,
        },
        mounted() {
          this.$refs.mySearch.focus();
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .search-panel
    width: 100%
    height: 100%
    background-color: #fff
    position: fixed
    left 0
    top 0
    z-index 1000
  .search-nav
    width: 100%
    height: 60px
    border-bottom-1px(#ddd)
    padding 0 20px
    display: flex
    flex-direction row
    justify-content space-between
    align-content center
    padding-top 10px
  .search-input
    display: flex
    flex-direction row
    align-items center
    width: 85%
    background-color: #ededed
    height 38px
    border-radius 10px
    padding 0 10px
  input
    width: 90%
    height: 90%
    padding-left 10px
    font-size 16px
    background: transparent
    outline none
  button
    border-bottom-1px(#ddd)
    background: transparent
    font-size 17px
    color #aaa
    padding-bottom 12px
  .search-content
    padding 30px 15px
  .title
    display: flex
    flex-direction row
    align-items center
    color: #aaa
    margin-bottom 10px
  .search-list
    display: flex
    flex-direction row
    /*align-items center*/
    flex-wrap wrap
  li
    background: #ededed
    color #58595b
    margin  10px 5px
    padding 8px 8px
    border-radius 14px
    font-weight lighter
    font-size 15px

</style>
