// pages/commentreply/commentreply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:{
        //评论Id
        commentId:'04',
        //用户名
        userName:'XXX',
        //头像
        avatar:"/dongtai/user1.jpg",
        //评论时间
        sendTime:'2020/11/11 11:11:11',
        //用户id
        userId:'04',
        //评论内容
        commentText:'这是评论',
        //回复列表
        reply:[
          {
            //回复Id（暂无作用，为以后做回复的回复预留）
            replyId:'01',
            //用户名
            userName:'AAA',
            //头像
            avatar:"/dongtai/user1.jpg",
            //回复时间
            sendTime:'2020/11/11 11:11:11',
            //用户id
            userId:'01',
            //回复内容
            replyText:'这是回复',
          },
          {
            //回复Id（暂无作用，为以后做回复的回复预留）
            replyId:'02',
            //用户名
            userName:'BBB',
            //头像
            avatar:"/dongtai/user1.jpg",
            //回复时间
            sendTime:'2020/11/11 11:11:11',
            //用户id
            userId:'02',
            //回复内容
            replyText:'这是回复',
          },
          {
            //回复Id（暂无作用，为以后做回复的回复预留）
            replyId:'03',
            //用户名
            userName:'CCC',
            //头像
            avatar:"/dongtai/user1.jpg",
            //回复时间
            sendTime:'2020/11/11 11:11:11',
            //用户id
            userId:'03',
            //回复内容
            replyText:'这是回复',
          },
          {
            //回复Id（暂无作用，为以后做回复的回复预留）
            commentId:'04',
            //用户名
            userName:'DDD',
            //头像
            avatar:"/dongtai/user1.jpg",
            //回复时间
            sendTime:'2020/11/11 11:11:11',
            //用户id
            userId:'04',
            //回复内容
            replyText:'这是回复',
          },
        ]
    },
    //本用户相关信息
    myinfo:{
      myUserId:"04"
    },
     //用于弹出回复框
    commentFoucusInput:false,
    commentIsInput:false,
  },

  //向端口请求动态送给端口的数据
  QueryParams:{
    query:"",//链接
    statusid:"",//动态ID
    commentId:"",//评论ID
  },

  //删除评论(未实现)
  deleteComment:function(){
    wx.showModal({
      title: '提示',
      content: '确定删除这条评论及该评论下所有内容吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //删除回复（未实现）
  deleteReply:function(){
    wx.showModal({
      title: '提示',
      content: '确定删除这条回复吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //获取我的信息（未实现）
  getMyInfo:function(){
  
  },
   //弹出评论回复框函数
 commentInputFocus(e) {
  console.log('回复键盘弹起')
  this.setData({
    commentIsInput: true
  })
  console.log(this.data.commentIsInput)
},
//收起评论回复框
commentInputBlur() {
  console.log('回复键盘收起')
  this.setData({
    commentIsInput: false
  })
  console.log(this.data.commentIsInput)
},
//回复按钮点击事件触发
focusCommentButn: function () {
  this.setData({
    commentFocusInput: true,
    commentIsInput: true
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.statusid=options.statusid;
    this.QueryParams.commentId=options.commentId;
    console.log(this.QueryParams.statusid);
    console.log(this.QueryParams.commentId);
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