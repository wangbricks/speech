# 民宿小程序

## 民宿列表
+ item 【编辑 数据库】[done]
  + poster
  + title
  + 特色
  + 价格
## 民宿详情
+ 图片展示
  + 房间信息 
    + 管理员可以编辑
+ 地图展示 [done] 2021/08/30
  + 周边
+ 天气展示 [done] 2021/08/30
  + 云函数
+ 房东信息 [done] 2021/08/31
  + 联系房东
  + 访问数据库每日限制：本地缓存数据 [优化]
  + 利用数据库的实时监听能力，前端onchange，渲染页面
+ 留言信息
+ 分享 [done] 2021/08/30
  + 好友
  + 朋友圈
+ 云函数



## 总结
+ 像素单位 rpx
https://www.cnblogs.com/wxapp-union/p/6118672.html
+ css3居中显示 
https://blog.csdn.net/weixin_39111384/article/details/109580852
+ 地图
https://lbs.qq.com/dev/console/quota/mine
+ 外部接口
小程序后台-开发-开发设置-服务器域名
https://mp.weixin.qq.com/wxamp/devprofile/get_profile?token=1397646602&lang=zh_CN
部署一个https接口
其它产品天气接口
https://tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=1&v=0&d=5&bd=1&k=000000&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=877&h=100&align=center

+ 微信小程序背景图
https://blog.csdn.net/xgangzai/article/details/89920892

+ 星期几
https://www.cnblogs.com/vlone/p/4602923.html

+ 微信小程序在wxml中调用自定义函数
https://www.cnblogs.com/wujiaxing/p/14255368.html

+ event current-target 属性

+ navigate 组件和事件

+ 分享
onShareAppMessage: function () {}
https://blog.csdn.net/harmsworth2016/article/details/109266335

+ 联系房东
https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/realtime.html
聊天室
https://gitee.com/Kindear/wx-cloud-im
电话
try{
  if(Number(e.currentTarget.dataset.info)){
    wx.makePhoneCall({
      phoneNumber:e.currentTarget.dataset.info
    })
  }
}catch(e){}