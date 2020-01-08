// pages/details/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    num: 1,  
    minusStatus: 'disabled',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tabIs:true,
    specIs:false,
    data:null
  },

  tabFun(e){
    console.log(e)
    if (e.currentTarget.dataset.state == 1){
      this.setData({
        tabIs:true
      })
    }else{
      this.setData({
        tabIs: false
      })
    }
  },
  goShopCar: function () {
    wx.reLaunch({
      url: "/pages/cart/index"
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    let that=this
    // console.log(id);
    wx.request({
      url: app.data.url+'wechatapplet/comdetail',
      data:{
        "AppId":app.data.AppId,
        "AppSecret":app.data.AppSecret,
        "id":id
      },
      header:{'content-type':'application/json'},
      success:function (res) {
        console.log(res.data[0])
        that.setData({
          imgUrls:res.data[0]
        })
      }
    })
  },
    /* 点击减号 */  
    bindMinus: function() {  
      var num = this.data.num;  
      // 如果大于1时，才可以减  
      if (num > 1) {  
          num --;  
      }  
      // 只有大于一件的时候，才能normal状态，否则disable状态  
      var minusStatus = num <= 1 ? 'disabled' : 'normal';  
      // 将数值与状态写回  
      this.setData({  
          num: num,  
          minusStatus: minusStatus  
      });  
  },  
  /* 点击加号 */  
  bindPlus: function() {  
      var num = this.data.num;  
      // 不作过多考虑自增1  
      num ++;  
      // 只有大于一件的时候，才能normal状态，否则disable状态  
      var minusStatus = num < 1 ? 'disabled' : 'normal';  
      // 将数值与状态写回  
      this.setData({  
          num: num,  
          minusStatus: minusStatus  
      });  
  },  
  /* 输入框事件 */  
  bindManual: function(e) {  
      var num = e.detail.value;  
      // 将数值与状态写回  
      this.setData({  
          num: num  
      });  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  specFun(){
    //  console.log(this.data.imgUrls,this.data.num)
    this.setData({
      specIs: !this.data.specIs
    })
  },
  specsFun(){
    let shop=this.data.imgUrls;
    let num=this.data.num
    wx.navigateTo({
      url: '/pages/orderDetails/index',
      data:{
        "shop":shop,
        "num":num
      }
    })
  },
  //添加购物车
  addCart(){
    let shopId=this.data.imgUrls.id
    // console.log(app.globalData.openid)
    wx.request({
      url: app.data.url+'wechatapplet/v1/addcart',
      data:{
        "AppId":app.data.AppId,
        "AppSecret":app.data.AppSecret,
        "openid":app.globalData.openid,
        "shopId":shopId
      },
      header:{"content-type":"application/json"},
      success:res=>{
        console.log(res)
      if(res.data.err==0){
        wx.showToast({
          title: res.data.errMSG,
          mask:true
        })
      }else if(res.data.err==1){
        wx.showToast({
          title: res.data.errMSG,
          icon:'none',
          mask:true
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