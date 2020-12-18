// pages/userindex/userindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveFollowed:true,  //该用户是否已关注（从服务器获取）
    userId:"1",//当前用户的信息（由参数设置）
    targetInfo:{  //该主页的用户信息（从服务器获取）
      userId:"2",
      avatar:"/dongtai/user1.jpg",  //头像
      userName:'Leonardo',  //用户名
      motto:"暨南针不戳！",  //简介
      followNum:'13',  //我关注的数量
      followerNum:'15',  //关注我的数量
      statusNum:'5',  //动态数量
      },
    status:[
      {
        //头像
        avatar:"/dongtai/user1.jpg",
        //用户名
        userName:'Leonardo',
        //日期
        time:'2020/11/11 11:11:11',
        //文本
        content:"The Revenant was the product of the tireless efforts of an unbelievable cast and crew. First off, to my brother in this endeavor, Mr. Tom Hardy. Tom, your talent on screen can only be surpassed by your friendship off screen… thank you for creating a transcendent cinematic experience. Thank you to everybody at Fox and New Regency…my entire team. I have to thank everyone from the very onset of my career… To my parents, none of this would be possible without you. And to my friends, I love you dearly, you know who you are.And lastly I just want to say this: Making ‘The Revenant’ was about man's relationship to the natural world. A world that we collectively felt in 2015 as the hottest year in recorded history. Our production needed to move to the southern tip of this planet just to be able to find snow. Climate change is real, it is happening right now. It is the most urgent threat facing our entire species, and we need to work collectively together and stop procrastinating. We need to support leaders around the world who do not speak for the big polluters, but who speak for all of humanity, for the indigenous people of the world, for the billions and billions of underprivileged people out there who would be most affected by this. For our children’s children, and for those people out there whose voices have been drowned out by the politics of greed. I thank you all for this amazing award tonight. Let us not take this planet for granted. I do not take tonight for granted. Thank you so very much.",
        //是否折叠文本 true:折叠 false：展开 null：短文本，不显示折叠展开按钮
        isF:true,
        //图片,，支持0~4张图片
        imgArr:[]
      },
      {
        //头像
        avatar:"/dongtai/user2.jpg",
        //用户名
        userName:'Depp',
        //日期
        time:'2020/11/11 11:11:11',
        //文本
        content:"1998",
        //是否折叠文本 true:折叠 false：展开 null：短文本，不显示折叠展开按钮
        isF:null,
        //图片
        imgArr:[
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604499631080&di=d857331ea96b03c3f2440491cb60e0f4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F16%2F20170816131622_fVYmk.thumb.700_0.jpeg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604826933589&di=8e10305e8e9a85bf3618765a4a613a08&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201805%2F30%2F20180530172421_kdKcu.jpeg",
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3580164859,3776785180&fm=26&gp=0.jpg",
          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=485066500,410625334&fm=26&gp=0.jpg"
      ]}
    ]
  },

//初始化关注按钮文字
initFollowBtn:function(e){
  let page = this;
  page.data.haveFollowed ? page.setData({
    followText: '已关注',
    btnColor: 'background-color:#0F6A7B;'
  }) : page.setData({
    followText: '关注',
    btnColor: 'background-color:#1596AF;'
  })
},

//关注处理函数
handleFollow:function(e){
  // let page = this;
  // page.setData({
  //   followStatus:!followStatus
  // })
  this.data.haveFollowed = !this.data.haveFollowed
  this.data.haveFollowed ? this.setData({
    followText: '已关注',
    btnColor: 'background-color:#0F6A7B;'
    //向服务传输关注发起者的id(数据库中为followId）：this.userId，被关注者的id（数据库中为userId）：this.targetInfo.userId
  }) : this.setData({
    followText: '关注',
    btnColor: 'background-color:#1596AF;'
    //向服务传输关注取消发起者的id(数据库中为followId）：this.userId，被关注者的id（数据库中为userId）：this.targetInfo.userId
  })
  
  wx.request({
      url: '请求地址',
      data: {
        "key": "targetId",  //请求的新officeMsg
        "userId": that.data.targetInfo.userId,  //主页用户id
        "pageNum": that.data.pagenum, //从数据里获取当前页数
        "pageSize": 10, //每页显示条数
      },
      method: "POST",
      success: function (res) {
        var targetInfo = res.data.targetInfo; //从此次请求返回的数据中获取targetInfo
        var haveFollowed = res.data.haveFollowed; //从此次请求返回的数据中获取haveFollowed
        that.setData({
          officeMsg: targetInfo, //设置targetInfo
          haveFollowed: haveFollowed //设置haveFollowed
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },

//图片预览函数
handlePreviewImg:function(e){
  console.log(e)
  var index = e.currentTarget.dataset.index;
  var item = e.currentTarget.dataset.item;
  wx.previewImage({
  current: item[index],     //当前图片地址
  urls: item,               //所有要预览的图片的地址集合
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
  }) 
  },
  
  //动态图片宽度预处理函数
  initImageSize:function(){
  const windowWidth=wx.getSystemInfoSync().windowWidth;
  const statusWidth=windowWidth-30*(windowWidth/750)*2
  const imagesSize=(statusWidth-5*(windowWidth/750))/2
  this.setData({
    imagesSize:imagesSize
  })
  },

  //从url传入的参数中设置targetInfo中userId的值
  setTargetId:function(e){
    var targetId = 'targetInfo.userId';
    this.setData({
      [targetId]:e.userId
    })
  },

  //从全局变量获取userId
  setUserId:function(){
    var userId = getApp().globalData.userInfo.userId
    this.setData({
      userId:userId
    })
  },

  //向后端请求该主页的用户信息及haveFollowed信息
  getInfo:function(){
    var that = this;
    wx.request({
      url: '请求地址',
      data: {
        "key": "targetId",  //请求的新officeMsg
        "userId": that.data.targetInfo.userId,  //主页用户id
        "pageNum": that.data.pagenum, //从数据里获取当前页数
        "pageSize": 10, //每页显示条数
      },
      method: "POST",
      success: function (res) {
        var targetInfo = res.data.targetInfo; //从此次请求返回的数据中获取targetInfo
        var haveFollowed = res.data.haveFollowed; //从此次请求返回的数据中获取haveFollowed
        that.setData({
          officeMsg: targetInfo, //设置targetInfo
          haveFollowed: haveFollowed //设置haveFollowed
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setUserId();  //从全局变量获取UserId并写入
    this.setTargetId(options); //从url传入的参数中设置targetInfo中userId的值
    this.getInfo();  //向后端请求该主页的用户信息及haveFollowed信息
    this.initImageSize();  //图片宽度处理
    this.initFollowBtn();  //初始化关注按钮
    
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