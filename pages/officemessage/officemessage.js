// pages/annoucement/annoucement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:"",
    officeMsg:[
      // {
      //   //通知Id
      //   officeMsgId:'01',
      //   //通知时间
      //   sendTime:'2020/11/11 11:11:11',
      //   //通知标题
      //   msgTitle:'官方通知摘要1',
      //   //通知内容
      //   msgText:'详细信息1',
      // },
      
      
    ],
  },

  getOfficeMsg:function(){
    //这里需要向后端请求数据
    wx.cloud.callFunction({
      name:"messagebox"
    }).then(result=>{
      console.log(result)
      this.setData({
        //将原status数据与新请求的数据拼接在一起
        officeMsg: result.result.list, //设置targetInfo
      });
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = options;
    ////options为传入的userId，使用userId向服务器请求官方通知followMsglikeMsg
    this.getOfficeMsg();
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