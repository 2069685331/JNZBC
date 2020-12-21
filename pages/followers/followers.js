// pages/followers/followers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followers:[
      // {
      //   userId:"1",
      //   userName:'Leonardo',
      //   avatar:"/dongtai/user1.jpg",
      //   motto:"暨南针不戳！"
      // },
    ]
  },

  getfollow:function(){
    wx.cloud.callFunction({
      name:"getfollow",
      data:{
        listType:1 //获取关注我的用户
      }
    }).then(result=>{
      console.log(result)
      this.setData({
        //将原status数据与新请求的数据拼接在一起
        follows: result.result.list, //设置targetInfo
      });
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfollow()
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