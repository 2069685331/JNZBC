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
  //向端口请求用户首页信息，送给端口的数据
  LoginParams:{
    listType:1,//请求他人主页数据
    userId:""
  },
//初始化关注按钮文字
initFollowBtn:function(){
  console.log(this.data.haveFollowed)
  this.data.haveFollowed ? this.setData({
    followText: '已关注',
    btnColor: 'background-color:#0F6A7B;'
  }) : this.setData({
    followText: '关注',
    btnColor: 'background-color:#1596AF;'
  })
},

//关注处理函数
handleFollow:function(){
  var userId=this.data.targetInfo['userId']
  console.log(userId)
  //已关注为1，就变成0；未关注为0，就变成1
  this.data.haveFollowed = this.data.haveFollowed? 0 :1
  //前端处理
  this.data.haveFollowed ? this.setData({
    followText: '已关注',
    btnColor: 'background-color:#0F6A7B;'
    //向服务传输关注发起者的id(数据库中为followId）：this.userId，被关注者的id（数据库中为userId）：this.targetInfo.userId
  }) : this.setData({
    followText: '关注',
    btnColor: 'background-color:#1596AF;'
    //向服务传输关注取消发起者的id(数据库中为followId）：this.userId，被关注者的id（数据库中为userId）：this.targetInfo.userId
  })
  //后端处理
  if(this.data.haveFollowed ==0)
  {
    //取消关注
    wx.cloud.callFunction({
      name:"followcancel",
      data:{userId}
    }).then(result=>{
      console.log(result)
    })
  }
  else if(this.data.haveFollowed ==1)
  {
    //点击关注
    wx.cloud.callFunction({
      name:"followadd",
      data:{userId}
    }).then(result=>{
      console.log(result)
    })
  }
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
    this.QueryParams.userId=e.userId
    this.LoginParams.userId=e.userId
  },

  //从全局变量获取userId
  setUserId:function(){
    var userId = getApp().globalData.userInfo.userId
    this.setData({
      userId:userId
    })
  },

  //向后端请求该主页的用户信息及haveFollowed信息
  getuserInfo:function(){
    wx.cloud.callFunction({
      name:"login",
      data:this.LoginParams
    }).then(result=>{
      console.log(result)
      this.setData({
        //将原status数据与新请求的数据拼接在一起
        targetInfo: result.result.data.userinfo, //设置targetInfo
        haveFollowed: result.result.data.haveFollowed //设置haveFollowed
      });
      console.log(this.data.haveFollowed)
      this.initFollowBtn();  //初始化关注按钮
    })
    /*
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
    */
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setUserId();  //从全局变量获取UserId并写入 //后端备注：这个不太好，建议后端直接读取，前端传入参数
    this.setTargetId(options); //从url传入的参数中设置targetInfo中userId的值
    this.getuserInfo();  //向后端请求该主页的用户信息及haveFollowed信息
    console.log(this.data.haveFollowed)
    this.initImageSize();  //图片宽度处理
    console.log(this.data.haveFollowed)
    this.getStatusList();
    
  },
//获取动态列表数据
getStatusList:function(){
  wx.cloud.callFunction({
    name:"getpost",
    data:this.QueryParams
  }).then(result=>{
    console.log(result)
    const total=result.result.list.length;
    console.log(total)
    this.totalPages=Math.floor(total/this.QueryParams.pagesize);
    console.log(this.totalPages)
    this.setData({
      //将原status数据与新请求的数据拼接在一起
      status:[...this.data.status,...result.result.list]
    });
  })
},
//下拉刷新事件
onPullDownRefresh: function(){
  //重置status数组
  this.setData({
    status:[]
  });
  //重置页码
  this.QueryParams.pagenum=0;
  //重新发送请求
  this.getStatusList();
  //完成请求，关闭下拉刷新界面
  wx.stopPullDownRefresh();
},
//页面触底事件
onReachBottom: function() {
  if(this.totalPages==0)
  {
    wx.showToast({
      title: '没有更多消息啦',
      image:'/icon/reachbottom.png'
    });
  }
  else if(this.totalPages == 1)
  {
    //请求页码+1
    this.QueryParams.pagenum++
    console.log(this.QueryParams.pagenum)
    //请求页面
    this.getStatusList();
    console.log("还有下一页");
  }
}
})