// pages/userindex/userindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveFollowed:true,  //该用户是否已关注（从服务器获取）
    userId:"1",//当前用户的信息（由参数设置）
    targetInfo:[],
    // targetInfo:{  //该主页的用户信息（从服务器获取）
    //   userId:"2",
    //   avatar:"/dongtai/user1.jpg",  //头像
    //   userName:'Leonardo',  //用户名
    //   motto:"暨南针不戳！",  //简介
    //   followNum:'13',  //我关注的数量
    //   followerNum:'15',  //关注我的数量
    //   statusNum:'5',  //动态数量
    //   },
    status:[],
    imagesSize:0,
    followText:"",
    btnColor:""
  },
  //向端口请求动态送给端口的数据(相关页面请求以及触底加页与下拉刷新都可以参照category.js)
  QueryParams:{
    listType:3,//请求他人主页数据
    //cid:"",//注意，此处没有分区号，因为首页可以看到任何类型的分区内容
    pagenum:0,//页码
    pagesize:10,//页长度
    userId:""
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
  //删除动态(未实现)(tip:删除后要重新request改变js里面的数据重新渲染，否则用户看到的页面不会改变，应该任何执行删除操作的都需要重新request)
deleteStatus:function(e){
  console.log(e.currentTarget.dataset)
  wx.showModal({
    title: '提示',
    content: '确定删除这条动态吗',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定',e)
        wx.cloud.callFunction({ 
          name:'deletepost', 
          data:{ 
            statusId:e.currentTarget.dataset.statusid,
          }, 
          success:res=>{ 
            console.log(res); 
          } 
        }) 
        //删除要发送什么还没实现
      } else if (res.cancel) {
        console.log('用户点击取消')
        //取消直接return就行
        return;
      }
    }
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
    this.QueryParams.userId=e.userId
    this.LoginParams.userId=e.userId
  },

  //从全局变量获取userId
  setUserId:function(){
    var userId = getApp().globalData.userInfo.userId
    this.setData({
      Id:userId
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
        userId:result.result.data.requestId, //设置访问页面者的id
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
    //this.setUserId();  //从全局变量获取UserId并写入 
    this.setTargetId(options); //从url传入的参数中设置targetInfo中userId的值
    this.getuserInfo();  //向后端请求该主页的用户信息及haveFollowed信息
    console.log(this.data.haveFollowed)
    this.initImageSize();  //图片宽度处理
    console.log(this.data.haveFollowed)
    this.getStatusList();
    
  },
//获取动态列表数据
getStatusList:function(){
  var that=this
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
    that.handleImgarr()
    this.handleAvatar()
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
//将云储存链接转换成本地链接
handleImgarr()
{
  var status=this.data.status
  var that=this
  for(var i=0;i<status.length;i++){
       var imgArr=status[i].imgArr
       for(var j=0;j<status[i].imgArr.length;j++){
         var tmp=i
         var tmp2=j
         wx.cloud.downloadFile({
          fileID: imgArr[j],
          success: res => {
            // get temp file path
            console.log(res.tempFilePath)
            that.setData({
              [`status[${tmp}].imgArr[${j}]`]:res.tempFilePath
            })
            console.log(that.data.status[tmp].imgArr[j])
          }
        })
       }
    }
},
//将云储存链接转换成本地链接
handleAvatar:function()
{
  var status=this.data.status
  var avatar=this.data.targetInfo.avatar
  var that=this
        //下载图片
        wx.cloud.downloadFile({
          fileID: avatar,
          success: res => {
            // get temp file path
            console.log(res.tempFilePath)
            for (var i = 0; i < status.length; i++) {
            that.setData({
              [`status[${i}].avatar`]:res.tempFilePath
            })
            }
            that.setData({
              ['targetInfo.avatar']:res.tempFilePath
            })
            console.log(that.data.status)
          },
          fail: err => {
            // handle error
          }
        })    
      
   

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
},
// 更改点赞状态
onCollectionTap: function(event) {
  // 获取当前点击下标
  var index = event.currentTarget.dataset.index;
  console.log(event);
  // data中获取列表
  var message = this.data.status;
  for (let i in message) { //遍历列表数据
    if (i == index) { //根据下标找到目标
      var collectStatus = false
      if (message[i].collected == false) { 
        //前端：界面修改
        //如果是没点赞+1
        collectStatus = true
        message[i].collected = true
        message[i].likenum = parseInt(message[i].likenum) + 1
        console.log('like');
        console.log(message[i])
        //后端：上传数据postid,调用云函数like点赞
        wx.cloud.callFunction({
          name:"likeadd",
          data:{
            statusid:message[i]._id,
            userId:message[i].userId
          },
          success:res=>{
            console.log(res);
          }
        })

      } else {
        //前端：修改界面
        collectStatus = false
        message[i].collected = false
        message[i].likenum = parseInt(message[i].likenum) - 1
        console.log('quitlike');
        
        console.log(message[i]);

        //后端：上传数据postid,调用云函数lickcancel取消点赞
        wx.cloud.callFunction({
        name:"likecancel",
        data:{
          statusid:message[i]._id
        },
        success:res=>{
          console.log(res);
        }
      })
    }
  }

     
  }
  this.setData({
    status: message
  })
},
})