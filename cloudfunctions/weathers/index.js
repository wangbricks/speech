// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request');
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  // const weatherUrl = `http://www.nmc.cn/rest/weather?stationid=58366`
  // const weather = await new Promise((resolve,reject)=>{
  //   request(weatherUrl,function(err, httpResponse, body){
  //     if(err){
  //       reject(err)
  //     }else{
  //       const {statusCode}= httpResponse
  //       resolve({
  //         data:JSON.parse(body),
  //         statusCode
  //       })
  //     }
  //   })
  // })
  // return {
  //   weather
  // }

  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
  }
}