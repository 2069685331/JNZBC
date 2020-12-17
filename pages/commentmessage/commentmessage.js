// pages/annoucement/annoucement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentMsg:[
      {
        //评论Id
        commentId:'01',
        //用户名
        userName:'XXX',
        //头像
        avatar:"/dongtai/user1.jpg",
        //评论的动态id
        statusId:"",
        //评论时间
        comTime:'2020/11/11 11:11:11',
        //用户id
        userId:'01',
        //评论内容
        commentText:'这是评论',
      },
      {
        //评论Id
        commentId:'02',
        //用户名
        userName:'XXX',
        //头像
        avatar:"/dongtai/user1.jpg",
        //评论的动态
        statusId:"",
        //评论时间
        comTime:'2020/11/11 11:11:11',
        //用户id
        userId:'02',
        //评论内容
        commentText:'这是评论',
      },
      {
        //评论Id
        commentId:'03',
        //用户名
        userName:'XXX',
        //头像
        avatar:"/dongtai/user1.jpg",
        //评论的动态
        statusId:"",
        //评论时间
        comTime:'2020/11/11 11:11:11',
        //用户id
        userId:'03',
        //评论内容
        commentText:'这是评论',
      },
      {
        //评论Id
        commentId:'04',
        //用户名
        userName:'XXX',
        //头像
        avatar:"/dongtai/user1.jpg",
        //评论的动态
        statusId:"",
        //评论时间
        comTime:'2020/11/11 11:11:11',
        //用户id
        userId:'04',
        //评论内容
        commentText:'这是评论',
      },
      
    ],
  },


  getCommentMsg:function(userId){
    //这里需要向后端请求数据
    var that = this;
    wx.request({
      url: '请求地址',
      data: {
        "key": "commentMsg",  //请求的新commentMsg
        "userId": userId,  //用户id
        "pageNum": that.data.pagenum, //从数据里获取当前页数
        "pageSize": 10, //每页显示条数
      },
      method: "POST",
      success: function (res) {
        var arr1 = that.data.officeMsg; //从data获取当前datalist数组
        var arr2 = res.data; //从此次请求返回的数据中获取新数组
        arr1 = arr1.concat(arr2); //合并数组
        that.setData({
          officeMsg: arr1 //合并后更新datalist
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
    ////options为传入的userId，使用userId向服务器请求评论通知commentlikeMsg
    getCommentMsg(userId);
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