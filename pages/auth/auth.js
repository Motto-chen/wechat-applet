var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onAuth() {
    //获取用户信息
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.reLaunch({
            url: '/pages/index/index',
          })
          /*wx.login({
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
           })*/
        }else{
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      }
    })
  }
})