const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    weatherInfo:'',
    admin:true,
    slideHerButtons:[
      {
        text:'聊天',
        src:''
      },
      {
        text:'电话',
        src:'18701882658'
      }
    ],
    slideHisButtons:[
      {
        text:'聊天',
        src:''
      },
      {
        text:'电话',
        src:'13817372369'
      }
    ],
    renderInfo:{},
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRenderInfo(options)
    this.getWeather()
  },
  // 获取民宿信息
  getRenderInfo(options){
    const db = wx.cloud.database()
    db.collection('renderinfo').where({
      id:options.id
    }).get({
      success: res => {
        this.setData({
          renderInfo:res.data[0]
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  // 获取天气预报
  getWeather(){
    const _self= this
    // 调用https://weather.three5.xyz
    wx.request({
      url: 'https://weather.three5.xyz', 
      success (res) {
        const detail = res.data.data.data.predict.detail
        const today = res.data.data.data.real.weather
        const day = (date)=>"星期" + "日一二三四五六".charAt(new Date(date).getDay())
        let list = []
        if(Array.isArray(detail)){
          list = detail.map(item=>{
            return {
              info:item.day.weather.info,
              temperature:`${item.night.weather.temperature}~${item.day.weather.temperature}`,
              day:day(item.date)
            }
          })
          list.shift()
        }
        const final ={
          air:res.data.data.data.air.text,
          today:{
            info:today.info,
            temperature:today.temperature,
            day: "今天是星期" + "日一二三四五六".charAt(new Date().getDay())
          },
          detail:list
        }
        _self.setData({weatherInfo:final})
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  slideButtonTap:function(e){
    wx.navigateTo({
      url: '../im/room/room',
    })
  },
  phoneCall:function(e){
    try{
      if(Number(e.currentTarget.dataset.info.phone)){
        wx.makePhoneCall({
          phoneNumber:e.currentTarget.dataset.info.phone
        })
      }
    }catch(e){
    }
  }
})
