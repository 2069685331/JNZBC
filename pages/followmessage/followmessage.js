// pages/annoucement/annoucement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followMsg:[
      {
        //关注通知Id
        followMsgtId:'01',
        //关注我的用户的用户id
        userId:'01',
        //关注我的用户的用户名
        userName:'用户1',
        //关注我的用户的头像
        avatar:"/dongtai/user1.jpg",
        //评论时间
        followTime:'2020/11/11 11:11:11',
      },
      {
        //关注通知Id
        followMsgtId:'02',
        //关注我的用户的用户id
        userId:'02',
        //关注我的用户的用户名
        userName:'XXX',
        //关注我的用户的头像
        avatar:"/dongtai/user1.jpg",
        //评论时间
        followTime:'2020/11/11 11:11:11',
      },
      {
        //关注通知Id
        followMsgtId:'03',
        //关注我的用户的用户id
        userId:'03',
        //关注我的用户的用户名
        userName:'XXX',
        //关注我的用户的头像
        avatar:"/dongtai/user1.jpg",
        //评论时间
        followTime:'2020/11/11 11:11:11',
      },
      {
        //关注通知Id
        followMsgtId:'04',
        //关注我的用户的用户id
        userId:'04',
        //关注我的用户的用户名
        userName:'XXX',
        //关注我的用户的头像
        avatar:"/dongtai/user1.jpg",
        //评论时间
        followTime:'2020/11/11 11:11:11',
      },
      
    ],
  },

  getfollowMsg:function(userId){
    //这里需要向后端请求数据
    var that = this;
    wx.request({
      url: '请求地址',
      data: {
        "key": "followMsg",  //请求的新followMsg
        "userId": userId,  //用户id
        "pageNum": that.data.pagenum, //从数据里获取当前页数
        "pageSize": 10, //每页显示条数
      },
      method: "POST",
      success: function (res) {
        var arr1 = that.data.followMsg; //从data获取当前datalist数组
        var arr2 = res.data; //从此次请求返回的数据中获取新数组
        arr1 = arr1.concat(arr2); //合并数组
        that.setData({
          followMsg: arr1 //合并后更新datalist
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
    var userId = options;
    //options为传入的userId，使用userId向服务器请求关注通知followMsg
    getfollowMsg(userId);
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