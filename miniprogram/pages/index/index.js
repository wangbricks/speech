//index.js
const app = getApp()

Page({
  data: {
    // minsu tanwei
    activeButton:'minsu',
    posterList: [{
        url: 'cloud://dev-8gjgj4o3b962267e.6465-dev-8gjgj4o3b962267e-1305839904/images/cm1.jpeg'
      },
      {
        url: 'cloud://dev-8gjgj4o3b962267e.6465-dev-8gjgj4o3b962267e-1305839904/images/cm2.jpeg'
      },
      {
        url: 'cloud://dev-8gjgj4o3b962267e.6465-dev-8gjgj4o3b962267e-1305839904/images/cm3.jpeg'
      },
      {
        url: 'cloud://dev-8gjgj4o3b962267e.6465-dev-8gjgj4o3b962267e-1305839904/images/cm4.jpeg'
      }
    ],
    holidayHouseList: [],
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
  },
  // 搜索民宿
  handleMinsu(){
    this.setData({
      activeButton:'minsu'
    })
    this.getRenderlist('民宿')
  },
  // 搜索摊位
  handletanwei(){
    this.setData({
      activeButton:'tanwei'
    })
    this.getRenderlist('摊位')  
  },
  // 获取民宿列表
  getRenderlist(type) {
    const db = wx.cloud.database()
    db.collection('rendercollection').where({
      type
    }).get({
      success: res => {
        console.log('res 数据库',res)
        this.setData({
          holidayHouseList:res.data
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
  onLoad: function () {

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
    if (this.getRenderlist) {
      this.getRenderlist('民宿')
    }
  },

  navigateTo(params) {
    const dataset = params.currentTarget.dataset;
    wx.navigateTo({
      url: `../holidayInfo/index?id=${dataset.info.id}`
    })
  },
  adminRoot() {
    wx.navigateTo({
      url: '../originIndex/index'
    })
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
})