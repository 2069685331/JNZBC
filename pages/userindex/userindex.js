// pages/userindex/userindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:{  //该主页的用户信息（从服务器获取）
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
//文本折叠函数
textFold: function(e) {
  console.log(e)
  const index=e.currentTarget.dataset.index
  console.log(index)
  const item=e.currentTarget.dataset.item
  var isF=item.isF
  this.setData({
    [`status[${index}].isF`]:!item.isF
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initImageSize();
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