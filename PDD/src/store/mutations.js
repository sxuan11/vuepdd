import Vue from 'vue'
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
  DELETE_SELECT_GOODS,
} from './mutation-types'

export default {
  [HOME_CASUAL](state, {homecasual}) {
    state.homecasual = homecasual;
  },

  [HOME_NAV](state, {homenav}) {
    state.homenav = homenav;
  },

  [HOME_SHOP_LIST](state, {homeshoplist}) {
    state.homeshoplist = homeshoplist;
  },

  [RECOMMEND_SHOP_LIST](state, {recommendshoplist}) {
    state.recommendshoplist = state.recommendshoplist.concat(recommendshoplist);
  },

  [SEARCH_GOODS](state, {searchgoods}) {
    state.searchgoods = searchgoods;
  },

  [USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo;
  },

  [RESET_USER_INFO](state) {
    state.userInfo = {};
  },

  [QUERY_CART](state, {userCart}) {
    state.userCart = userCart;
  },

  [ADD_GOODS_COUNT](state, {goods}) {
    goods.buy_count = goods.buy_count +1;
  },

  [DECREASE_GOODS_COUNT](state, {goods}) {
    if (goods.buy_count){
      goods.buy_count = goods.buy_count -1;
      if (goods.buy_count === 0) {
        const  index = state.userCart.indexOf(goods);
        state.userCart.splice(index,1);
      }
    }
  },

  [SELECT_ALL_GOODS](state, {isSelected}) {
    state.userCart.forEach((goods,index)=>{
      if (goods.checked) {
        goods.checked = !isSelected
      }else {
        Vue.set(goods,'checked',!isSelected)
      }
    });
  },

  [SINGLE_SELECT_GOODS](state, {goods}) {
    if(goods.checked){ // 存在该属性
      goods.checked = !goods.checked;
   }else {
      Vue.set(goods, 'checked', true)
   }
},

  [DELETE_SELECT_GOODS](state, {goods}) {
    const  index = state.userCart.indexOf(goods);
    state.userCart.splice(index,1);
  },


}
