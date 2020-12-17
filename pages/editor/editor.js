// pages/editor/editor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      avatar: "", //上传的结果图片集合
      userName:"",
      motto:"",
    },
  },

  //图片选取
  upload () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          url: `../upload/upload?src=${src}`
        })
      }
    })
  },
  
  // 获取昵称
  getNickname: function(e){
    console.log(e.detail.value)
    var userName=e.detail.value
    this.setData({
      ['form.userName']: userName
    }) 
    console.log(this.data.form.userName)
  },
  
  // 获取个性签名
  getMotto: function(e){
    console.log(e.detail.value)
    var motto=e.detail.value
    this.setData({
      ['form.motto']: motto
    }) 
    console.log(this.data.form.motto)
  },

  //提交表单
  submitForm: function(e){
    console.log(this.data.form)  //此内容为要提交的表单内容

    //调用后端接口editor
    wx.cloud.callFunction({
      name:"editor",
      data:this.data.form
    }).then(result=>{
      console.log(result)
    })

    wx.switchTab({
      url: '/pages/user/user'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { avatar } = options
    if (avatar) {
      this.setData({
        ['form.avatar']: avatar
      })
    }
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