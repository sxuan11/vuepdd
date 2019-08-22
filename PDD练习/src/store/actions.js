import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecommendShopList,
  getSearchGoods,
} from '../api'

import {
  HOME_CASUAL, HOME_NAV,HOME_SHOP_LIST,RECOMMEND_SHOP_LIST,SEARCH_GOODS
} from './mutation-types'

export default {
  // 1. 获取首页的轮播图
  async reqHomeCasual({commit}) {
    const result = await getHomeCasual();
    commit(HOME_CASUAL, {homecasual: result.message.data})
  },
  //获取首页的NAV数据
  async reqHomeNav({commit}){
    const result = await getHomeNav();
    commit(HOME_NAV,{homenav:result.message.data})
  },
  //获取首页的商品列表
  async reqHomeShopList({commit}){
    const result = await  getHomeShopList();
    commit(HOME_SHOP_LIST,{homeshoplist:result.message.goods_list})
  },

  async reqRecommendShopList({commit}){
    const result = await  getRecommendShopList();
    commit(RECOMMEND_SHOP_LIST,{recommendshoplist:result.message.data})
  },

  async reqSearchGoods({commit},callback){
    const result = await  getSearchGoods();
    commit(SEARCH_GOODS,{searchgoods:result.message.data});
    callback && callback();
  }

}
