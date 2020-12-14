// pages/editor/editor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      imgAddr: "", //上传的结果图片集合
      nickname:"",
      motto:"",
    },
    properties: {
      count: { //最多选择图片的张数，默认9张
        type: Number,
        value: 1
       },
      uploadUrl: { //图片上传的服务器路径
        type: String,
        value: ''
      },
    }
  },

  

  //图片选取
  uploadDetailImage: function (e) { //这里是选取图片的方法
    var that = this;
    var pics = [];
    // var img = that.data.form.img;
    //判断图片集合的长度，大于等于规定长度4，不可以再添加
    // if (imgArr.length >= that.data.properties.count.value) {
    //   wx.showToast({
    //     image:'/icon/reachbottom.png',
    //     title: '最多选择' + that.data.properties.count.value + '张！',
    //   })
    //   return;
    // }
    //调用图片选择函数
    wx.chooseImage({
      // count: that.data.properties.count.value-imgAddr.length, // 最多可以选择的图片张数，默认4
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgAddr = res.tempFilePaths;
        //将获得的图片的本地连接存在form.imgAdrr中
        that.setData({
          ['form.imgAddr']:imgAddr[0]
        });
        /*that.uploadimg({
          url: "http://www.test.com//test-api/wechat/applet/api/uploadUserAvatar", //这里是你图片上传的接口
          path: imgArr, //这里是选取的图片的地址数组
        });8*/
      },
    })
   },
    //多张图片上传
    /*uploadimg: function (data) {
      wx.showLoading({
        title: '上传中...',
        mask: true,
      })
      var that = this,
        i = data.i ? data.i : 0,
        success = data.success ? data.success : 0,
        fail = data.fail ? data.fail : 0;
      wx.uploadFile({
        url: data.url,
        filePath: data.path[i],
        name: 'file',
        formData: {"userId":that.data.userId},
        success: (resp) => {
          wx.hideLoading();
          success++;
          var str = resp.data //返回的结果，可能不同项目结果不一样
        
          console.log(str);
          // var pic = JSON.parse(str);
          // var pic_name = that.data.showUrl + pic.Data;
          // var detailPics = that.data.detailPics;
          // detailPics.push(pic_name)
          // that.setData({
          //   detailPics: detailPics
          // })
        },
        fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        i++;
        if (i == data.path.length) { //当图片传完时，停止调用     
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
          var myEventDetail = {
            picsList: that.data.detailPics
          } // detail对象，提供给事件监听函数
          var myEventOption = {} // 触发事件的选项
          that.triggerEvent('myevent', myEventDetail, myEventOption)//结果返回调用的页面
        } else { //若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);//递归，回调自己
        }
      }
    });
  },*/
  // 对选取的不满意图片进行删除
  deleteImgage: function (e) {
    var imgAddr = this.data.form.imgAddr;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    // imgArr.splice(index, 1);
    this.setData({
     ['form.imgAddr']: ""
    });
   },
  
  // 获取昵称
  getNickname: function(e){
    console.log(e.detail.value)
    var nickname=e.detail.value
    this.setData({
      ['form.nickname']: nickname
    }) 
    console.log(this.data.form.nickname)
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
    wx.switchTab({
      url: '/pages/user/user'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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