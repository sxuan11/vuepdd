import axios from 'axios'


export default function ajax(url='',params={},type='GET') {
  //1.定义promise对象
  let promise;
  return new Promise((resolve,reject)=>{
    //2.判断请求的方式
    if ('GET'===type){
      // 2.1拼接请求的字符串
      let paramsStr= '';
      Object.keys(params).forEach(key=>{
        paramsStr += key +'='+params[key] + '&'
      });
      //过滤最后的&
      if ( paramsStr !== ''){
        paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf('&'));
      }
      //完整路径
      url+= '?'+paramsStr;
      //发送get
      promise=axios.get(url)
    } else if ('POST'===type) {
      promise=axios.post(url,params)
    }
    //返回请求的结果,返回一个promise 的对象
    promise.then((response)=>{
      resolve(response.data)
    }).catch(err=>{
      reject(error);
    })
  })

}
