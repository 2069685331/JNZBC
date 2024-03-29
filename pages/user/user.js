// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},  //用户的微信信息（用户登录后会自动写入）

    userData:{  //服务器上用户的信息（从服务器获取）
      userId:"",
      userName:"TESTNAME",   //昵称
      avatar:"/dongtai/user1.jpg",  //头像
      motto:"暨南针不戳！",  //简介
      followNum:'13',  //我关注的数量
      followerNum:'15',  //关注我的数量
      statusNum:'5'  //动态数量
    },

    unloginData:{   //未登录的用户信息
      logoUrl:"/icon/logo.png",  //头像
      motto:"暨南针不戳！",  //简介
      followNum:'0',  //我关注的数量
      followerNum:'0',  //关注我的数量
      statusNum:'0'  //动态数量
    }
    
    
  },
    //向端口请求用户首页信息，送给端口的数据
    LoginParams:{
      listType:0,//请求自己主页数据
      userId:""
    },

//向后端请求该主页的用户信息及haveFollowed信息
getuserInfo:function(){
  wx.cloud.callFunction({
    name:"login",
    data:this.LoginParams
  }).then(result=>{
    console.log(result)
    this.setData({
      //将原status数据与新请求的数据拼接在一起
      WXuserinfo: result.result.data.userinfo, //设置targetInfo
    });
    getApp().globalData.userInfo=result.result.data.userinfo
    console.log(getApp().globalData.userInfo)
  }) 
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
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
    const userinfo=wx.getStorageSync("userinfo");
    this.setData({
      userinfo:userinfo
    });
    this.getuserInfo()

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