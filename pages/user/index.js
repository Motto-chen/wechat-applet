// pages/user/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},    
    hasUserInfo: false, 
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {      
             this.setData({        
             userInfo: app.globalData.userInfo,        
             hasUserInfo: true
           })
         } else if (this.data.canIUse) {      
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
           // 所以此处加入 callback 以防止这种情况
           app.userInfoReadyCallback = res => {        
        this.setData({          
          userInfo: res.userInfo,          
          hasUserInfo: true
             })
           }
         } else {      // 在没有 open-type=getUserInfo 版本的兼容处理
           wx.getUserInfo({        
              success: res => {
                app.globalData.userInfo = res.userInfo          
                  this.setData({ 
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
             }
           })
         }
  },
  getUserInfo: function (e) {    
    //    console.log(e)
    if(e.detail.userInfo !==undefined){
         app.globalData.userInfo = e.detail.userInfo    
         this.setData({      
             userInfo: e.detail.userInfo,      
             hasUserInfo: true
         })
      wx.login({
        success: res => {
          console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
           if(res.code){
             wx.request({
               url: app.data.url+"wechatapplet/v1/openid",
               data:{
                 "AppId":app.data.AppId,
                 "AppSecret":app.data.AppSecret,
                 'js_code':res.code
               },
               method:"GET",
               header:{'content-type':'application/json'},
               success:res=>{
                 console.log(res)
                 app.globalData.openid=res.data.openid;
                 //提交用户信息保存
                wx.request({
                   url: app.data.url+'wechatapplet/v1/save_openid',
                   data:{
                     "AppId":app.data.AppId,
                     "AppSecret":app.data.AppSecret,
                     "openid":app.globalData.openid,
                     "nickName":app.globalData.userInfo.nickName,
                     "gender":app.globalData.userInfo.gender,
                     "language":app.globalData.userInfo.language,
                     "city":app.globalData.userInfo.city,
                     "province":app.globalData.userInfo.province,
                     "country":app.globalData.userInfo.country,
                     "avatarUrl":app.globalData.userInfo.avatarUrl
                   },
                   header:{'content-type':'application/json'},
                   success:function(res){
                     console.log(res);
                   },
                 })
               },
             })
           }
         },
       })
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})