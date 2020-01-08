//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    comFun:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [],
    // baseUrl:"https://wx.yogalt.com/",
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list:[],
    page:1
  },
  onReady:function(){

    //商品轮播图数据
    let that =this
    wx.request({
      url: app.data.url+'wechat/homepic',
      data:{
        "AppId":app.data.AppId,
        "AppSecret":app.data.AppSecret
      },
      header:{'content-type':'application/json'},
      success:function(res) {
        // console.log(res.data),
        that.setData({
          imgUrls:res.data,
          list:res.data
        })
      }
    }),
    //商品分类数据
wx.request({
    url: app.data.url+'wechatapplet/fenlei',
    data:{
      "AppId":app.data.AppId,
      "AppSecret":app.data.AppSecret
      },
      header:{'content-type':'application/json'},
      success:function (res) {
        // console.log(res.data);
        that.setData({
          comFun:res.data
        })
      }
    })
  },
  //事件处理函数
  //添加购物车
  addCart(data) {
    // console.log(data)
    let item = data.currentTarget.dataset.item
    console.log(item)
    // console.log(this.data.imgUrls)
    
    wx.request({
      url: app.data.url+'wechatapplet/v1/addcart',
      data:{
        "AppId":app.data.AppId,
        "AppSecret":app.data.AppSecret,
        "openid":app.globalData.openid,
        "shopId":item.id
      },
      header:{'content-type':'application/json'},
      success:function(res){
        // console.log(res.data.err,res.data.errMSG)
        if(res.data.err==0){
          wx.showToast({
            title: res.data.errMSG,
            mask:true
          })
        }else if(res.data.err==1){
          wx.showToast({
            title: res.data.errMSG,
            mask:true,
            icon:'none'
          })
        }else{
          wx.showModal({
            title:'即将跳转至授权页面',
            content:res.data.errMSG,
            cancelText:"不想授权",
            confirmText:"去授权",
            success(res){
              if(res.confirm){
                wx.navigateTo({
                  url: '/pages/auth/auth',
                })
              }else if(res.cancel){
                wx.showToast({
                  title: '取消授权！',
                  icon:'success'
                })
              }
            }
          })
        }
      }
    })
      // .then(res => {
      //   console.log(res)
      //   if (res.code == 200) {
      //     wx.showToast({
      //       title: '已加入购物车',
      //       icon: 'success',
      //       duration: 500
      //     })
      //   }
      // })
  },
 /* imgsc:function(e){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://wx.yogalt.com/api/v1/admin/uploadBanner',      //此处换上你的接口地址
          filePath: tempFilePaths[0],
          name: 'inputFile',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
          },
          formData: {
            href:'www.baidu.com',           //跳转地址
            name:'大蛋糕',           //名称
            is_hide:true,       //是否显示
            effective:'2018-09-14,2019-09-14',       //有效期
          },
          success: function (res) {
            var data = res.data;
            console.log('data');
          },
          fail: function (res) {
            console.log('fail');

          },
        })
      }
    })
  },
  lower:function(e){
    console.log(e)
    this.getList()
  },*/
  /*getList: function(){
    app.http('v1/home/getHotList', { page: this.data.page})
      .then(res => {
        if (res.code == 200 && res.data.list.length > 0) {
          this.data.page++
          let list = this.data.list
          for (let i = 0; i < res.data.list.length; i++) {
            list.push(res.data.list[i])
          }
          this.setData({
            list: list,
            page: this.data.page
          })
          console.log(this.data)
        }
      })
  },*/
  onLoad: function () {
    /*
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
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
  },*/
  // changeIndicatorDots: function (e) {
  //   this.setData({
  //     indicatorDots: !this.data.indicatorDots
  //   })
  // }
  // changeAutoplay: function (e) {
  //   this.setData({
  //     autoplay: !this.data.autoplay
  //   })
  // },
  // intervalChange: function (e) {
  //   this.setData({
  //     interval: e.detail.value
  //   })
  // },
  // durationChange: function (e) {
  //   this.setData({
  //     duration: e.detail.value
  //   })
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
   }
})
