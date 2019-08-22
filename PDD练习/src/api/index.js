import ajax from './ajax'

// 1. 基础路径
const BASE_URL = 'http://127.0.0.1:3000';

// 2. 请求方法

// 2.1 请求首页的轮播图
export const getHomeCasual = ()=>ajax(BASE_URL + '/api/homecasual');

//  请求首页的nav
export const getHomeNav = ()=>ajax(BASE_URL+'/api/homenav');

//获取首页商品列表
export const getHomeShopList= ()=>ajax(BASE_URL+'/api/homeshoplist');

//获取推荐商品列表
export const getRecommendShopList= ()=>ajax(BASE_URL+'/api/recommendshoplist');

//获取搜索页面数据
export const getSearchGoods = ()=>ajax(BASE_URL+'/api/searchgoods');
