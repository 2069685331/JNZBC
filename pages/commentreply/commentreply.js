// pages/commentreply/commentreply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      comment:{
        //reply:[],
      },
    // comment:{
    //     //用户Id
    //     userId:'01',
    //     //动态id
    //     statusid:'01',
    //     //评论Id
    //     commentId:'04',
    //     //用户名
    //     userName:'XXX',
    //     //头像
    //     avatar:"/dongtai/user1.jpg",
    //     //评论时间
    //     sendTime:'2020/11/11 11:11:11',
    //     //用户id
    //     userId:'04',
    //     //评论内容
    //     commentText:'这是评论',
    //     //回复列表
   
    // },
    reply:[],
    // reply:[
    //   {
    //     //回复Id（暂无作用，为以后做回复的回复预留）
    //     replyId:'01',
    //     //用户名
    //     userName:'AAA',
    //     //头像
    //     avatar:"/dongtai/user1.jpg",
    //     //回复时间
    //     sendTime:'2020/11/11 11:11:11',
    //     //用户id
    //     userId:'01',
    //     //回复内容
    //     replyText:'这是回复',
    //   },
    //   {
    //     //回复Id（暂无作用，为以后做回复的回复预留）
    //     replyId:'02',
    //     //用户名
    //     userName:'BBB',
    //     //头像
    //     avatar:"/dongtai/user1.jpg",
    //     //回复时间
    //     sendTime:'2020/11/11 11:11:11',
    //     //用户id
    //     userId:'02',
    //     //回复内容
    //     replyText:'这是回复',
    //   },
    //   {
    //     //回复Id（暂无作用，为以后做回复的回复预留）
    //     replyId:'03',
    //     //用户名
    //     userName:'CCC',
    //     //头像
    //     avatar:"/dongtai/user1.jpg",
    //     //回复时间
    //     sendTime:'2020/11/11 11:11:11',
    //     //用户id
    //     userId:'03',
    //     //回复内容
    //     replyText:'这是回复',
    //   },
    //   {
    //     //回复Id（暂无作用，为以后做回复的回复预留）
    //     commentId:'04',
    //     //用户名
    //     userName:'DDD',
    //     //头像
    //     avatar:"/dongtai/user1.jpg",
    //     //回复时间
    //     sendTime:'2020/11/11 11:11:11',
    //     //用户id
    //     userId:'04',
    //     //回复内容
    //     replyText:'这是回复',
    //   },
    // ],
    //本用户相关信息
    myinfo:{
      myUserId:""
    },

    //我的回复（在sendcomment中使用）
    myreply:{
      myUserid:"",
      statusid:"",
      commentId:"",
      reply:""
    },
     //用于弹出回复框
    commentFoucusInput:false,
    commentIsInput:false,
  },

  //向端口请求动态送给端口的数据
  QueryParams:{
    query:"",//获取该条评论及其回复内容的链接
    statusid:"",//动态ID
    commentId:"",//评论ID
  },
  //数据初始化
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.statusid=options.statusid;
    this.QueryParams.commentId=options.commentId;
    // console.log(this.QueryParams.statusid);
    // console.log(this.QueryParams.commentId);
    this.getMyInfo();
    this.getCommentReply();
  },
  //获取个人信息(已实现)
  getMyInfo:function(){
    console.log('获取个人信息');
    wx.cloud.callFunction({ 
      name:'getMyInfo', 
      data:{}, 
      success:res=>{ 
        console.log(res.result.openid); 
        this.setData({
          ['myinfo.myUserId']:res.result.openid
        })
        console.log(this.myinfo)
      } 
    }) 
  },
  //获取初始化页面，利用QueryParams作为参数
  getCommentReply:function(){
    console.log('获取初始化页面');
    wx.cloud.callFunction({ 
      name: 'getcommentreply', 
      data: { 
        statusid: this.QueryParams 
      }, 
    }).then(result=>{ 
      console.log(result.result) 
      this.setData({ 
        //将原status数据与新请求的数据拼接在一起 
        comment:result.result, 
      }); 
    }) 
    wx.cloud.callFunction({ 
      name:'getcommentreplydetail', 
      data:{ 
        statusid:this.QueryParams 
      }, 
    }).then(result=>{ 
      console.log(result.result.temp); 
      this.setData({ 
        reply:[...this.data.reply,...result.result.temp] 
      }) 
      console.log(this.comment)
    }) 

  },
   //向后端发送动态评论的回复的相关信息（实现）
  sendReply:function(){
    if(!this.data.myreply.reply.trim())
    {
      wx.showToast({
        title: '回复不能为空',
        image:'/icon/reachbottom.png'
      })
      return;
    }
    wx.cloud.callFunction({ 
      name:'sendreply', 
      data:{ 
        myreply:this.data.myreply 
      }, 
      success:res=>{ 
        console.log(res); 
      } 
    }) 
    console.log(this.data.myreply);

  },
  //删除评论(已实现)
  deleteComment:function(e){
    var commentId=this.data.comment._id 
    var statusId=this.data.comment.postId
    console.log(commentId)
    wx.showModal({
      title: '提示',
      content: '确定删除这条评论及该评论下所有内容吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({ 
            name:'deleteComment', 
            data:{ 
              commentId:commentId,
              statusId:statusId  
            }, 
            success:res=>{ 
              console.log(res); 
            } 
          }) 
          //用户点击确定后，需要向后端传输数据（未实现）
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //删除回复（已实现）
  deleteReply:function(e){
    console.log(e)
    var commentId=e.currentTarget.dataset.commentid; 
    var statusId=this.data.comment._id;
    console.log(this.data)
    wx.showModal({
      title: '提示',
      content: '确定删除这条回复吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //用户点击确定后，需要向后端传输数据（未实现
          wx.cloud.callFunction({ 
            name:'deleteReply', 
            data:{ 
              commentId:commentId,
              statusId:statusId 
            }, 
            success:res=>{ 
              console.log(res); 
            } 
          }) 
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
focusCommentButn: function (e) {
  console.log(e);
  var statusid=e.currentTarget.dataset.statusid;
  var commentId=e.currentTarget.dataset.commentid;
  this.setData({
    commentFocusInput: true,
    commentIsInput: true,
    ['myreply.statusid']:statusid,
    ['myreply.commentId']:commentId
  })
},
  //获取回复内容
  getReply:function(e){
    var content=e.detail.value
    this.setData({
      ['myreply.reply']: content
    }) 
     console.log(this.data.myreply.reply)
  },
  /**
   * 生命周期函数--监听页面加载
   */

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