import ajax from './ajax'

// 1. 基础路径
// const BASE_URL = '';
const BASE_URL = 'http://localhost:3000';
// 2. 请求方法

// 2.1 请求首页的轮播图
export const getHomeCasual = ()=>ajax(BASE_URL + '/api/homecasual');

// 2.2 请求首页的导航
export const getHomeNav = ()=>ajax(BASE_URL + '/api/homenav');

// 2.3 请求首页的商品数据
export const getHomeShopList = ()=>ajax(BASE_URL + '/api/homeshoplist');

// 2.4 请求推荐的商品数据
export const getRecommendShopList = (params)=>ajax(BASE_URL + '/api/recommendshoplist', params);

// 2.5 请求搜索的列表数据
export const getSearchGoods = ()=>ajax(BASE_URL + '/api/searchgoods');

// 2.6 请求短信验证码
export const getPhoneCode = (phone)=>ajax(BASE_URL + '/api/send_code',{phone:phone});

//2.7 手机验证码登录
export const phoneCodeLogin = (phone,code)=>ajax(BASE_URL + '/api/login_code',{phone:phone,code},'POST');

//2.8 用户名和密码登录
export const pwdLogin = (user_name,pwd,captcha)=>ajax(BASE_URL + '/api/login_pwd',{user_name,pwd,captcha},'POST');

//2.9 获取当前登录的用户信息
export const getUserInfo = ()=>ajax(BASE_URL + '/api/user_info');

//2.10 退出登录
export const logout = ()=>ajax(BASE_URL + '/api/logout');

//2.11 修改用户信息
export const changeUserInfo = (user_id,user_name, user_sex, user_address, user_birthday, user_sign)=>ajax(BASE_URL + '/api/change_user_info',{
  user_id,user_name, user_sex, user_address, user_birthday, user_sign
},'POST');

//2.12 加入购物车
export const addShopCart = (user_id,goods_id,goods_name,thumb_url,price,buy_count,is_pay)=>ajax(BASE_URL + '/api/add_shop_cart',{
  user_id,goods_id,goods_name,thumb_url,price,buy_count,is_pay},'POST');

//2.13 查询购物车数据
export const queryShopCart = ()=>ajax(BASE_URL + '/api/query_shop_cart');
