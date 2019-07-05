import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecommendShopList,
  getSearchGoods,
  getUserInfo,
  logout,
  queryShopCart,

} from '../api'

import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOP_LIST,
  RECOMMEND_SHOP_LIST,
  SEARCH_GOODS,
  USER_INFO,
  RESET_USER_INFO,
  QUERY_CART,
  ADD_GOODS_COUNT,
  DECREASE_GOODS_COUNT,
  SELECT_ALL_GOODS,
  SINGLE_SELECT_GOODS,
  DELETE_SELECT_GOODS
} from './mutation-types'

export default {
  // 1. 获取首页的轮播图
  async reqHomeCasual({commit}) {
    const result = await getHomeCasual();
    commit(HOME_CASUAL, {homecasual: result.message})
  },

  // 2. 获取首页的导航
  async reqHomeNav({commit}) {
    const result = await getHomeNav();
    commit(HOME_NAV, {homenav: result.message.data})
  },

  // 3. 获取首页的商品列表
  async reqHomeShopList({commit}) {
    const result = await getHomeShopList();
    commit(HOME_SHOP_LIST, {homeshoplist: result.message.goods_list})
  },

  // 4. 获取推荐的商品数据
  async reqRecommendShopList({commit}, params) {
    console.log(params);
    const result = await getRecommendShopList(params);
    commit(RECOMMEND_SHOP_LIST, {recommendshoplist: result.message});
    params.callback && params.callback();
  },

  // 5. 获取推荐的商品数据
  async reqSearchGoods({commit}, callback) {
    const result = await getSearchGoods();
    commit(SEARCH_GOODS, {searchgoods: result.message.data});
    callback && callback();
  },

  //6.同步用户信息
  syncUserInfo({commit},userInfo) {
    commit(USER_INFO, {userInfo})
  },

  //7.异步获取用户信息
  async getUserInfo({commit}){
    const result= await getUserInfo();
    console.log(result);
    if (result.success_code === 200) {
      commit(USER_INFO,{userInfo : result.message})
    }
  },

  //8.退出登录
  async logout({commit}){
    const result= await logout();
    console.log(result);
    if (result.success_code === 200) {
      commit(RESET_USER_INFO)
    }
  },

  //9.请求购物车数据
  async reqQueryShopCart({commit}) {
    const result = await queryShopCart();
    if (result.success_code === 200) {
    commit(QUERY_CART, {userCart: result.message});
    }
  },

  //10.单个商品的增加和减少
  updateGoodsCount({commit},{goods, isAdd}) {
    if (isAdd) {//增加
      commit(ADD_GOODS_COUNT,{goods})
    }else {//减少
      commit(DECREASE_GOODS_COUNT,{goods})
    }
  },

  //11.是否选中所有商品
  selectedAll({commit},{isSelected}) {
    commit(SELECT_ALL_GOODS,isSelected)
  },

  //12.单个商品
  selectedSingle({commit},{goods}){
    commit(SINGLE_SELECT_GOODS, {goods});
  },

  //13.删除商品
  deleteGoods({commit},{goods}){
    commit(DELETE_SELECT_GOODS, {goods});
  }

}
