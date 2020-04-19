//app.js
// var request = require('request.js');
App({
  data:{
     "AppId":"04309100",
     "AppSecret":"nMvCxGhDsUlGiZrBiPdReCbMcGmRmPcV",
     "openid":{},
     "userInfo":{},
     "url":"http://cc.chen521.xyz/api/"
  },
  get onReady() {
    return this._onReady
  },
  set onReady(value) {
    this._onReady = value
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs),
    // 登录
    wx.login({
      success: res => {
       //  console.log(res)
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
         if(res.code){
           wx.request({
             url: this.data.url+"wechatapplet/v1/openid",
             data:{
               "AppId":this.data.AppId,
               "AppSecret":this.data.AppSecret,
               'js_code':res.code
             },
             method:"GET",
             header:{'content-type':'application/json'},
             success:res=>{
               // console.log(res)
               this.globalData.openid=res.data.openid;
               //提交用户信息保存
              wx.request({
                 url: this.data.url+'wechatapplet/v1/save_openid',
                 data:{
                   "AppId":this.data.AppId,
                   "AppSecret":this.data.AppSecret,
                   "openid":this.globalData.openid,
                   "nickName":this.globalData.userInfo.nickName,
                   "gender":this.globalData.userInfo.gender,
                   "language":this.globalData.userInfo.language,
                   "city":this.globalData.userInfo.city,
                   "province":this.globalData.userInfo.province,
                   "country":this.globalData.userInfo.country,
                   "avatarUrl":this.globalData.userInfo.avatarUrl
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
     }),
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.reLaunch({
            url: '/pages/auth/auth',
          })
        }
      }
    })

  },
  globalData: {
    userInfo: null,
    openid:null
  }
})
