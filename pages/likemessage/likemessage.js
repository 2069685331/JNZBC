// pages/likemessage/likemessage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    likeMsg:[
      {
        //点赞Id
        liketId:'01',
        //用户Id
        userId:"01",
        //用户名
        userName:'XXX',
        //头像
        avatar:"/dongtai/user1.jpg",
        //点赞的动态id
        statusId:"",
        //点赞时间
        likeTime:'2020/11/11 11:11:11',
        //评论内容
        commentText:'这是评论',
      },
      {
        //点赞Id
        liketId:'02',
        //用户Id
        userId:"02",
        //用户名
        userName:'XXX',
        //头像
        avatar:"/dongtai/user1.jpg",
        //点赞的动态id
        statusId:"",
        //点赞时间
        likeTime:'2020/11/11 11:11:11',
        //评论内容
        commentText:'这是评论',
      },
      {
       //点赞Id
        liketId:'03',
        //用户Id
        userId:"03",
        //用户名
        userName:'XXX',
        //头像
        avatar:"/dongtai/user1.jpg",
        //点赞的动态id
        statusId:"",
        //点赞时间
        likeTime:'2020/11/11 11:11:11',
        //评论内容
        commentText:'这是评论',
      },
      {
        //点赞Id
        liketId:'04',
        //用户Id
        userId:"04",
        //用户名
        userName:'XXX',
        //头像
        avatar:"/dongtai/user1.jpg",
        //点赞的动态id
        statusId:"",
        //点赞时间
        likeTime:'2020/11/11 11:11:11',
        //评论内容
        commentText:'这是评论',
      },
      {
         //点赞Id
        liketId:'05',
        //用户Id
        userId:"05",
        //用户名
        userName:'XXX',
        //头像
        avatar:"/dongtai/user1.jpg",
        //点赞的动态id
        statusId:"",
        //点赞时间
        likeTime:'2020/11/11 11:11:11',
        //评论内容
        commentText:'这是评论',
      },
    ],

    //触底加载向端口请求新的数据时送给端口的数据
    QueryParams:{
    query:"",//链接
    //cid:"",//注意，此处没有分区号，因为首页可以看到任何类型的分区内容
    pagenum:1,//页码
    pagesize:10//页长度
    },
    //总页数
    totalPages:0,
  },

//向服务器请求likeMsg
getLikeMsg:function(userId){
  //这里需要向后端请求数据
  var that = this;
  wx.request({
    url: '请求地址',
    data: {
      "key": "likeMsg",  //请求的新likeMsg
      "userId": userId,  //用户id
      "pageNum": that.data.pagenum, //从数据里获取当前页数
      "pageSize": 10, //每页显示条数
    },
    method: "POST",
    success: function (res) {
      var arr1 = that.data.likeMsg; //从data获取当前datalist数组
      var arr2 = res.data; //从此次请求返回的数据中获取新数组
      arr1 = arr1.concat(arr2); //合并数组
      that.setData({
        likeMsg: arr1 //合并后更新datalist
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
    ////options为传入的userId，使用userId向服务器请求点赞通知followMsglikeMsg
    this.getLikeMsg(userId);
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
    if(this.data.QueryParams.pagenum>=this.data.totalPages)
    {
      console.log("没有内容啦");
      wx.showToast({
        title: '没有更多内容啦',
        image:'/icon/reachbottom.png'
      });
    }
    else
    {
      //请求页码+1
      this.data.QueryParams.pagenum++
      //请求页面
      this.getLikeMsg();
      console.log("还有下一页");
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})