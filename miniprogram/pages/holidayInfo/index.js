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
    background: [
      {
       url:'../../images/cm5.jpeg'
      },
      {
        url:'../../images/cm6.jpeg'
      },
      {
        url:'../../images/cm7.jpeg'
      },
      {
        url:'../../images/cm8.jpeg'
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    desc:'绿地长岛，背依世界级生态岛崇明岛。由世界500强绿地集团倾力打造。在借鉴了纽约、温哥华等滨水宜居城市和世界各大度假海岛之后，以大融合的理念打造生态自然与休闲旅游滨水度假生活于一体的全龄段旅游度假目的地，为上海乃至整个长三角，提供一方诗意栖居的自然净土与理想港湾。世界级生态岛崇明岛整岛，规划80%为绿化用地，森林覆盖率高达24%，被誉为中国的“长寿之乡”，西沙湿地、东滩、东平森林国家公园分布岛上，原滋原味自然绿色源乡。',
    markers:[{
      id:1,
      longitude:"121.4615034005432",
      latitude:"31.79314669757488",
      callout:{
        content:"民宿地址在绿地长岛",
        fontSize:16,
        padding:20
      },
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      data:options
    })
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
        console.log('final',final)
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

})
