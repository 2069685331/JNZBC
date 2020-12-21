// pages/annoucement/annoucement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followMsg:[
      // {
      //   //关注通知Id
      //   followMsgtId:'01',
      //   //关注我的用户的用户id
      //   userId:'01',
      //   //关注我的用户的用户名
      //   userName:'用户1',
      //   //关注我的用户的头像
      //   avatar:"/dongtai/user1.jpg",
      //   //评论时间
      //   followTime:'2020/11/11 11:11:11',
      // },
      
    ],
  },

  getfollow:function(){
    wx.cloud.callFunction({
      name:"getfollow",
      data:{
        listType:2 //获取关注我的用户,并置isA为true
      }
    }).then(result=>{
      console.log(result)
      this.setData({
        //将原status数据与新请求的数据拼接在一起
        followMsg: result.result.list, //设置targetInfo
      });
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = options;
    //options为传入的userId，使用userId向服务器请求关注通知followMsg
    this.getfollow();
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