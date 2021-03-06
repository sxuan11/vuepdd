var express = require('express');
var router = express.Router();
const conn = require('./../db/db');
var svgCaptcha = require('svg-captcha');
const  sms_util = require("./../util/sms_util");
var md5 = require('blueimp-md5');

let users ={};//保存用户信息
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

const recommendArr = require('./../data/recommend').data;

/**
 * 将获得的json数据插入到数据库中
 */
router.get('/recommend/api', function(req, res, next) {
  //定义一个临时数组
  let temp_arr_all=[];
  //去遍历上面的数据
  for (let i=0;i<recommendArr.length;i++){
    //取出数据
    let oldItem = recommendArr[i];
    // console.log(oldItem);
    //取出对应的字段
    let temp_arr = [];
    temp_arr.push(oldItem.goods_id);
    temp_arr.push(oldItem.goods_name);
    temp_arr.push(oldItem.short_name);
    temp_arr.push(oldItem.thumb_url);
    temp_arr.push(oldItem.hd_thumb_url);
    temp_arr.push(oldItem.image_url);
    temp_arr.push(oldItem.price);
    temp_arr.push(oldItem.normal_price);
    temp_arr.push(oldItem.market_price);
    temp_arr.push(oldItem.sales_tip);
    temp_arr.push(oldItem.hd_url);
    //合并到大数组
    temp_arr_all.push(temp_arr);
  }
  //插入到数据库中
  let sqlStr = "INSERT INTO pdd_recommend(`goods_id`,`goods_name`,`short_name`, `thumb_url`, `hd_thumb_url`, `image_url`, `price`, `normal_price`, `market_price`, `sales_tip`, `hd_url`) VALUES ?";
  // 1.2 执行语句
  conn.query(sqlStr, [temp_arr_all], (error, results, fields) => {

    if (error) {
      console.log('插入失败');
    } else {
      console.log('插入成功');
    }
    // console.log(results);
  });
});

/**
 * 获取首页轮播图
 */
router.get('/api/homecasual', (req, res)=>{
  /* let sqlStr = 'select * from homecasual';
   conn.query(sqlStr, (err, results) => {
       if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
       res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
   })*/
/*
  const data = require('../data/homecasual');
  res.json({success_code: 200, message: data});
  */
//数据库查询语句
/*  let sqlStr = 'SELECT * FROM pdd_homecasual';
  connection.query(sqlStr,(error, results, fields)=>{
    if (error) {
      res.json({err_code:0, message:'请求失败'});
    }else{
      res.json({success_code:200, message:results});
    }
  });*/

  let sqlStr = 'SELECT * FROM pdd_homecasual';
  // 1.2 执行语句
  conn.query(sqlStr, (error, results, fields) => {

    if (error) {
      res.json({err_code: 0, message: '请求数据失败'});
    } else {
      res.json({success_code: 200, message: results});
    }
    // console.log(results);
  });
});

/**
 * 获取首页导航
 */
router.get('/api/homenav', (req, res)=>{
  /*
  let sqlStr = 'select * from homenav';
   conn.query(sqlStr, (err, results) => {
       if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
       res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
   })
   */
  const data = require('../data/homenav');
  res.json({success_code: 200, message: data});

  let sqlStr=''
});

/**
 * 获取首页商品列表
 */
router.get('/api/homeshoplist', (req, res)=>{
  /*
 let sqlStr = 'select * from homeshoplist';
  conn.query(sqlStr, (err, results) => {
      if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
      res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
  })
  */
  setTimeout(function () {
    const data = require('../data/shopList');
    res.json({success_code: 200, message: data})
  }, 1000);
});

/**
 * 获取推荐商品列表
 * 当前的页面，20
 */
router.get('/api/recommendshoplist', (req, res)=>{
/*  setTimeout(function () {
    const data = require('../data/recommend');
    res.json({success_code: 200, message: data})
  }, 10);*/
  // 先获取参数
  let pageNo = req.query.page||1;
  let pageSize = req.query.count || 20;
  //数据库查询语句
  let sqlStr = 'SELECT * FROM pdd_recommend LIMIT '+ (pageNo-1)*pageSize+','+pageSize;
  //执行对应的sql语句
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: '请求数据失败'});
    } else {
      setTimeout(()=>{
        res.json({success_code: 200, message: results});
      },200);

    }
  });
});

/**
 * 获取推荐商品列表拼单用户
 */
router.get('/api/recommenduser', (req, res)=>{
  setTimeout(function () {
    const data = require('../data/recommend_users');
    res.json({success_code: 200, message: data})
  }, 10);
});

/**
 * 获取搜索分类列表
 */
router.get('/api/searchgoods', (req, res)=>{
  setTimeout(function () {
    const data = require('../data/search');
    res.json({success_code: 200, message: data})
  }, 10);
});

/**
 * 获取商品数据
 */
router.get('/api/getqalist', (req, res) => {
  const course = req.query.course;
  const limit = req.query.limit || 20;
  const keyword = req.query.keyword || '';

  let sqlStr = 'select * from qa where course= "' + course + '" LIMIT ' + limit;
  if (keyword !== '') {
    sqlStr = 'select * from qa where course= "' + course + '" AND qname LIKE "%' + keyword + '%" LIMIT ' + limit;
  }

  connection.query(sqlStr, (err, results) => {
    if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0});
    res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
  })
});

/**
 * 一次性图形验证码
 */
router.get('/api/captcha',(req, res)=>{
  //生成随机验证码
  let captcha = svgCaptcha.create({
    color: true,
    background: '#f6f6f6',
    size: 4,
    noise: 4,
    ignoreChars: '0o1i',
  });
  console.log(captcha);
  //保存到session
  req.session.captcha = captcha.text.toLocaleLowerCase();
  // console.log(req.session.captcha);
  //返回给客户端
  res.type('svg');
  res.send(captcha.data);
});

/**
 * 手机验证码的短信
 */
router.get('/api/send_code',(req, res)=>{
  //获取网页的手机号码
  let phone = req.query.phone;

  //产生随机验证码
  let code = sms_util.randomCode(6);
  console.log(code);

/*  sms_util.sendCode(phone, code, function (success) {
    // console.log(success);
    if(success){
      users[phone]=code;
      res.json({success_code:200,message:'验证码获取成功'})
    }else{
      res.json({err_code: 0, message: '验证码获取失败'});
    }
  })*/


  //成功
  users[phone]=code;
  res.json({success_code:200,message:code});

  //失败
/*  res.json({err_code: 0, message: '验证码获取失败'});*/

});

/**
 * 手机验证码登录
 */
router.post('/api/login_code',(req, res)=>{
    //获取数据
    const  name  = req.body.name;
    const  phone = req.body.phone;
    const  code  = req.body.code;
    //验证当前验证码是否正确
    if(users[phone]!== code){
      res.json({err_code: 0, message: '验证码错误'});
    }
    //进入数据库查询用户手机
    delete  users[phone];
    let sqlStr = "SELECT * FROM pdd_user_info WHERE user_phone = '" + phone + "' LIMIT 1";
    conn.query(sqlStr, (error, results, fields) => {

      if (error) {
        res.json({err_code: 0, message: '当前手机已经存在'});
      } else {
        results = JSON.parse(JSON.stringify(results));
        if (results[0]){
          req.session.userId = results[0].id;
          //返回数据给客户端
          res.json({success_code: 200,  message: results[0]});
        }else{//新用户,把网页的数据插入到数据库
          const addSql = "INSERT INTO pdd_user_info (user_name,user_phone) VALUES (?,?)";
          const addSqlParams = [phone,phone];
          conn.query(addSql,addSqlParams,(error, results, fields) => {
            /*if (error) {
              res.json({err_code:0,message:''})
            } else {
              res.json({success_code:200,message:''})
            }*/
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            if (!error) {
              req.session.userId = results.insertId;
              let sqlStr = "SELECT * FROM pdd_user_info WHERE id ='"+ results.insertId +"' LIMIT 1";
              conn.query(sqlStr,(error, results, fields) => {
                if (error) {
                  res.json({err_code:0,message:'请求数据失败'})
                } else {
                  results = JSON.parse(JSON.stringify(results));
                  res.json(
                      {success_code: 200,
                       message: results[0]
                      });
                }
              });
              }
          });
        }
      }
    });


});


/**
 * 账号密码登录
 */
router.post('/api/login_pwd',(req, res)=>{
  //获取数据
  const  user_name  = req.body.name;
  const  user_pwd   = md5(req.body.pwd);
  const  captcha    = req.body.captcha.toLowerCase();

  console.log(captcha,req.session.captcha,req.session);
  //验证当前图形验证码是否正确
  if (captcha!==req.session.captcha) {
    res.json({err_code: 0, message: '验证码错误'});
  }
  delete req.session.captcha;

  let sqlStr = "SELECT * FROM pdd_user_info WHERE user_name ='"+ user_name +"' LIMIT 1";
  conn.query(sqlStr, (error, results, fields) => {

    if (error) {
      res.json({err_code: 0, message: '当前账号不正确'});
    } else {
      results = JSON.parse(JSON.stringify(results));
      if (results[0]){//用户已经存在
        //验证和数据库的密码是否正确
        if (results[0].user_pwd!==user_pwd) {
          res.json({err_code: 0, message: '密码错误'});
        }else {
          res.json({
            success_code: 200,
            message: {
              id:results[0].id,
              user_name:results[0].user_name,
              user_phone:results[0].user_phone
            },info:''});

        }
       /* req.session.userId = results[0].id;
        //返回数据给客户端
        res.json({success_code: 200, message: {id:results[0].id,user_name:results[0].user_name,user_phone:results[0].user_phone}});
   */   }else{//新用户,把网页的数据插入到数据库
        const addSql = "INSERT INTO pdd_user_info (user_name,user_pwd) VALUES (?,?);";
        const addSqlParams = [phone,phone];
        conn.query(addSql,addSqlParams,(error, results, fields) => {
          /*if (error) {
            res.json({err_code:0,message:''})
          } else {
            res.json({success_code:200,message:''})
          }*/
          results = JSON.parse(JSON.stringify(results));
          console.log(results);
          if (!error) {
            req.session.userId = results.insertId;
            let sqlStr = "SELECT * FROM pdd_user_info WHERE id ='"+ results.insertId +"' LIMIT 1"
            conn.query(sqlStr,(error, results, fields) => {
              if (error) {
                res.json({err_code:0,message:'请求数据失败'})
              } else {
                results = JSON.parse(JSON.stringify(results));
                res.json(
                    {success_code: 200,
                      message: {id:results[0].id,user_name:results[0].user_name,user_phone:results[0].user_phone}
                    });
              }
            });
          }
        });
      }
    }
  });
});

/**
 *根据session中的用户id来获取当前的用户信息
 */
router.get('/api/user_info', (req, res)=>{
  let userId = req.session.userId;
  //数据库查询语句
  let sqlStr = "SELECT * FROM pdd_user_info WHERE id ='"+ userId +"' LIMIT 1";
  //执行对应的sql语句
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: '请求数据失败'});
    } else {
      results= JSON.parse(JSON.stringify(results));
      console.log(results);
      if (!results[0]){
        delete req.session.userId;
        res.json({err_code: 1, message: '请先登录'});
      }else {
          //返回给客户端
        res.json({
          success_code:200,
          message:results[0]
        })
      }
    }
  });
});

/**
 * 退出登录
 */
router.get('/api/logout', (req, res)=>{
    //清除对应的session的userId
    delete  req.session.userId;
    //返回提示
    res.json({success_code: 200, message: '退出登录成功'});
});

/**
 * 修改用户的信息
 */
router.post('/api/change_user_info',(req, res)=>{
  // 1. 获取数据
  const id = req.body.user_id;
  const user_name = req.body.user_name || '';
  const user_sex = req.body.user_sex || '';
  const user_address = req.body.user_address || '';
  const user_birthday = req.body.user_birthday || '';
  const user_sign = req.body.user_sign || '';

  // 2. 验证
  if (!id) {
    res.json({err_code: 0, message: '修改用户信息失败!'});
  }

  // 3. 更新数据
  let sqlStr = "UPDATE pdd_user_info SET user_name = ?,user_sex = ?,user_address = ?, user_birthday = ?, user_sign = ? WHERE id = " + id;
  let strParams = [user_name, user_sex, user_address, user_birthday, user_sign];
  console.log(user_name);
  conn.query(sqlStr, strParams, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: '修改失败!'});
    } else {
      res.json({success_code: 200, message: '修改用户信息成功!'});
    }
  });
});

/**
 *加入购物车
 */
router.post('/api/add_shop_cart',(req, res)=>{
  //验证当前的用户
  let user_id = req.body.user_id;
  console.log(user_id,req.session.userId)
  if (!user_id || user_id !== req.session.userId) {
    console.log(user_id,req.session.userId)
    res.json({err_code:0,message:'当前用户非法'});
    return;
  }

  //拿取客户端传送的数据
  let goods_id = req.body.goods_id;
  let goods_name = req.body.goods_name;
  let thumb_url = req.body.thumb_url;
  let price = req.body.price;
  let buy_count = 1;
  let is_pay = 0;                        //0代表未支付，1代表已支付


  //查询数据
  let SQL_str ="SELECT * FROM pdd_cart WHERE goods_id = '"+ goods_id+"'";

  conn.query(SQL_str, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: 'error!'});
    } else {
      results = JSON.parse(JSON.stringify(results));
      if (results[0]) {//商品存在，增加buy_count
        let buy_count=results[0].buy_count + 1;
        let SQL_str = "UPDATE pdd_cart SET buy_count ="+ buy_count +" WHERE goods_id = '"+ goods_id+"'";
        conn.query(SQL_str, (error, results, fields) => {
          if (error) {
            res.json({err_code: 0, message: '加入购物车失败!'});
          } else {
            res.json({success_code: 200, message: '加入购物车成功!'});
          }
        });
      }else{//商品不存在，添加数据
        let add_SQL = "INSERT INTO pdd_cart (goods_id,goods_name,thumb_url,price,buy_count,is_pay) VALUES (?,?,?,?,?,?);"
        let sql_params = [goods_id,goods_name,thumb_url,price,buy_count,is_pay];
        conn.query(add_SQL, sql_params, (error, results, fields) => {
          if (error) {
            res.json({err_code: 0, message: '添加失败!'});
          } else {
            res.json({success_code: 200, message: '成功加入购物车!'});
          }
        });
      }
    }
  });
});

/**
 * 查询当前购物车的商品
 */
router.get('/api/query_shop_cart',(req, res)=>{
  //验证当前的用户
  let userId = req.session.userId;
  if (!req.session.userId) {
    res.json({err_code:0,message:'请先登录'})
    return;
  }

  //数据库查询语句
  let sqlStr = "SELECT * FROM pdd_cart";
  //执行对应的sql语句
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: '请求数据失败'});
    } else {
      results= JSON.parse(JSON.stringify(results));
      res.json({
          success_code:200,
          message:results
      });
    }
  });
});
