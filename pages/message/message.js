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
      },
      {
        url:'../followmessage/followmessage',
        icon:'../../icon/message_page/follow.png',
        title:"关注",
        isUnread:false
      },
      {
        url:'../commentmessage/commentmessage',
        icon:'../../icon/message_page/comment.png',
        title:"评论",
        isUnread:false
      },
      {
        url:'../likemessage/likemessage',
        icon:'../../icon/message_page/like.png',
        title:"赞",
        isUnread:false
      },
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //向服务器请求isUnread查看是否有未读通知
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