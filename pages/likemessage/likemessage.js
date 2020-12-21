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
        sendTime:'2020/11/11 11:11:11',
        //评论内容
        commentText:'这是评论',
      }
    ],

    //触底加载向端口请求新的数据时送给端口的数据
    QueryParams:{
    listType:2,
    pagenum:1,//页码
    pagesize:10//页长度
    },
    //总页数
    totalPages:0,
  },

//向服务器请求likeMsg
getLikeMsg:function(userId){
  //这里需要向后端请求数据
  
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