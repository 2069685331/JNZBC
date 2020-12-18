// pages/userindex/userindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveFollowed:true,  //该用户是否已关注（从服务器获取）
    userId:"1",//当前用户的信息（由参数设置）
    // targetInfo:{  //该主页的用户信息（从服务器获取）
    //   userId:"2",
    //   avatar:"/dongtai/user1.jpg",  //头像
    //   userName:'Leonardo',  //用户名
    //   motto:"暨南针不戳！",  //简介
    //   followNum:'13',  //我关注的数量
    //   followerNum:'15',  //关注我的数量
    //   statusNum:'5',  //动态数量
    //   },
    status:[]
  },
  //向端口请求动态送给端口的数据(相关页面请求以及触底加页与下拉刷新都可以参照category.js)
  QueryParams:{
    listType:2,//请求我的主页数据
    //cid:"",//注意，此处没有分区号，因为首页可以看到任何类型的分区内容
    pagenum:0,//页码
    pagesize:10//页长度
  },

//初始化关注按钮文字
initFollowBtn:function(e){
  let page = this;
  page.data.haveFollowed ? page.setData({
    followText: '已关注',
    btnColor: 'background-color:#0F6A7B;'
  }) : page.setData({
    followText: '关注',
    btnColor: 'background-color:#1596AF;'
  })
},

//关注处理函数
handleFollow:function(e){
  // let page = this;
  // page.setData({
  //   followStatus:!followStatus
  // })
  this.data.haveFollowed = !this.data.haveFollowed
  this.data.haveFollowed ? this.setData({
    followText: '已关注',
    btnColor: 'background-color:#0F6A7B;'
    //向服务传输关注发起者的id(数据库中为followId）：this.userId，被关注者的id（数据库中为userId）：this.targetInfo.userId
  }) : this.setData({
    followText: '关注',
    btnColor: 'background-color:#1596AF;'
    //向服务传输关注取消发起者的id(数据库中为followId）：this.userId，被关注者的id（数据库中为userId）：this.targetInfo.userId
  })
  
  wx.request({
      url: '请求地址',
      data: {
        "key": "targetId",  //请求的新officeMsg
        "userId": that.data.targetInfo.userId,  //主页用户id
        "pageNum": that.data.pagenum, //从数据里获取当前页数
        "pageSize": 10, //每页显示条数
      },
      method: "POST",
      success: function (res) {
        var targetInfo = res.data.targetInfo; //从此次请求返回的数据中获取targetInfo
        var haveFollowed = res.data.haveFollowed; //从此次请求返回的数据中获取haveFollowed
        that.setData({
          officeMsg: targetInfo, //设置targetInfo
          haveFollowed: haveFollowed //设置haveFollowed
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },

//图片预览函数
handlePreviewImg:function(e){
  console.log(e)
  var index = e.currentTarget.dataset.index;
  var item = e.currentTarget.dataset.item;
  wx.previewImage({
  current: item[index],     //当前图片地址
  urls: item,               //所有要预览的图片的地址集合
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
  }) 
  },
  
  //动态图片宽度预处理函数
  initImageSize:function(){
  const windowWidth=wx.getSystemInfoSync().windowWidth;
  const statusWidth=windowWidth-30*(windowWidth/750)*2
  const imagesSize=(statusWidth-5*(windowWidth/750))/2
  this.setData({
    imagesSize:imagesSize
  })
  },

  //从url传入的参数中设置targetInfo中userId的值
  setTargetId:function(e){
    var targetId = 'targetInfo.userId';
    this.setData({
      [targetId]:e.userId
    })
  },

  //从全局变量获取userId
  setUserId:function(){
    var userId = getApp().globalData.userInfo.userId
    this.setData({
      userId:userId
    })
  },

  //向后端请求该主页的用户信息及haveFollowed信息
  getInfo:function(){
    var that = this;
    wx.request({
      url: '请求地址',
      data: {
        "key": "targetId",  //请求的新officeMsg
        "userId": that.data.targetInfo.userId,  //主页用户id
        "pageNum": that.data.pagenum, //从数据里获取当前页数
        "pageSize": 10, //每页显示条数
      },
      method: "POST",
      success: function (res) {
        var targetInfo = res.data.targetInfo; //从此次请求返回的数据中获取targetInfo
        var haveFollowed = res.data.haveFollowed; //从此次请求返回的数据中获取haveFollowed
        that.setData({
          officeMsg: targetInfo, //设置targetInfo
          haveFollowed: haveFollowed //设置haveFollowed
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setUserId();  //从全局变量获取UserId并写入
    this.setTargetId(options); //从url传入的参数中设置targetInfo中userId的值
    this.getInfo();  //向后端请求该主页的用户信息及haveFollowed信息
    this.initImageSize();  //图片宽度处理
    this.initFollowBtn();  //初始化关注按钮
    wx.cloud.callFunction({
      name:"getpost",
      data:this.QueryParams
    }).then(result=>{
      console.log(result)
      this.setData({
        //将原status数据与新请求的数据拼接在一起
        status:result.result.status
      });
    })
    //调用login接口获取数据
    wx.cloud.callFunction({
      name:"login",
    }).then(result=>{
      console.log(result)
      this.setData({
        //将原status数据与新请求的数据拼接在一起
        status:result
      });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})