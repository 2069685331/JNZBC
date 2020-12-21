// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    messageList:[
      {
        url:'../officemessage/officemessage',
        icon:'../../icon/message_page/notification.png',
        title:"官方通知",
        isUnread:true,
        unreadNum:1,
      },
      {
        url:'../followmessage/followmessage',
        icon:'../../icon/message_page/follow.png',
        title:"关注",
        isUnread:false,
        unreadNum:1,
      },
      {
        url:'../commentmessage/commentmessage',
        icon:'../../icon/message_page/comment.png',
        title:"评论",
        isUnread:false,
        unreadNum:1,
      },
      {
        url:'../likemessage/likemessage',
        icon:'../../icon/message_page/like.png',
        title:"赞",
        isUnread:false,
        unreadNum:1,
      },
      
    ]
  },
  //从全局变量获取userId
  setUserId:function(){
    var userId = getApp().globalData.userInfo.userId
    this.setData({
      userId:userId
    })
  },
  setIsUnread:function(){
    //这里需要向后端请求该主页的用户信息及haveFollowed信息
    wx.cloud.callFunction({
      name:"messageinfo",
      data:{
      },
      success:res=>{
        console.log(res);
        var isUnread=res.result.data
        this.setData({
          //把messageList里面的isUnread项都与isUnread数组里面的值一对一对应地修改
          'messageList[0].isUnread':isUnread[0],
          'messageList[1].isUnread':isUnread[1],
          'messageList[2].isUnread':isUnread[2],
          'messageList[3].isUnread':isUnread[3],

          'messageList[0].unreadNum':isUnread[0],
          'messageList[1].unreadNum':isUnread[1],
          'messageList[2].unreadNum':isUnread[2],
          'messageList[3].unreadNum':isUnread[3]

        })
        
      }
    })
    /*
    wx.request({
      url: '请求地址',
      data: {
        "key": "isUnread",  //请求的新officeMsg
        "userId": that.data.userId,  //主页用户id
      },
      method: "POST",
      success: function (res) {
        var isUnread = res.data.isUnread; //从此次请求返回的数据中获取isUnread数组
        that.setData({
          //把messageList里面的isUnread项都与isUnread数组里面的值一对一对应地修改
          'messageList[0].isUnread':isUnread[0],
          'messageList[1].isUnread':isUnread[1],
          'messageList[2].isUnread':isUnread[2],
          'messageList[3].isUnread':isUnread[3]
          

        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
    */
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从全局变量获取userId
    //this.setUserId();
    //向服务器请求isUnread查看是否有未读通知
    this.setIsUnread();
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
    this.setIsUnread();
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