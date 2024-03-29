// pages/statusdetail/statusdetail.js
Page({
  data: {
    // status:
    //   {
    //     //用户id
    //     userId:'01',
    //     //动态id
    //     statusid:1,
    //     //头像
    //     avatar:"/dongtai/user1.jpg",
    //     //用户名
    //     userName:'Leonardo',
    //     //日期
    //     sendTime:'2020/11/11 11:11:11',
    //     //文本
    //     content:"The Revenant was the product of the tireless efforts of an unbelievable cast and crew. First off, to my brother in this endeavor, Mr. Tom Hardy. Tom, your talent on screen can only be surpassed by your friendship off screen… thank you for creating a transcendent cinematic experience. Thank you to everybody at Fox and New Regency…my entire team. I have to thank everyone from the very onset of my career… To my parents, none of this would be possible without you. And to my friends, I love you dearly, you know who you are.And lastly I just want to say this: Making ‘The Revenant’ was about man's relationship to the natural world. A world that we collectively felt in 2015 as the hottest year in recorded history. Our production needed to move to the southern tip of this planet just to be able to find snow. Climate change is real, it is happening right now. It is the most urgent threat facing our entire species, and we need to work collectively together and stop procrastinating. We need to support leaders around the world who do not speak for the big polluters, but who speak for all of humanity, for the indigenous people of the world, for the billions and billions of underprivileged people out there who would be most affected by this. For our children’s children, and for those people out there whose voices have been drowned out by the politics of greed. I thank you all for this amazing award tonight. Let us not take this planet for granted. I do not take tonight for granted. Thank you so very much.",
    //     //图片,，支持0~4张图片
    //     imgArr:[],
    //     //评论
    //     commentnum:76,
    //     //点赞数
    //     likenum:54,
    //     //本用户是否点赞过
    //     collected:0
    //   },
  // comments:[
  //   {
  //     //评论Id
  //     commentId:'01',
  //     //用户名
  //     userName:'XXX',
  //     //头像
  //     avatar:"/dongtai/user1.jpg",
  //     //评论时间
  //     sendTime:'2020/11/11 11:11:11',
  //     //用户id
  //     userId:'01',
  //     //评论内容
  //     commentText:'这是评论',
  //     //评论的回复数目
  //     replyNum:2
  //   },
  //   {
  //     //评论Id
  //     commentId:'02',
  //     //用户名
  //     userName:'XXX',
  //     //头像
  //     avatar:"/dongtai/user1.jpg",
  //     //评论时间
  //     sendTime:'2020/11/11 11:11:11',
  //     //用户id
  //     userId:'02',
  //     //评论内容
  //     commentText:'这是评论',
  //     //评论的回复数目
  //     replyNum:0
  //   },
  //   {
  //     //评论Id
  //     commentId:'03',
  //     //用户名
  //     userName:'XXX',
  //     //头像
  //     avatar:"/dongtai/user1.jpg",
  //     //评论时间
  //     sendTime:'2020/11/11 11:11:11',
  //     //用户id
  //     userId:'03',
  //     //评论内容
  //     commentText:'这是评论',
  //     //评论的回复数目
  //     replyNum:0
  //   },
  //   {
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
  //     //评论的回复数目
  //     replyNum:4
  //   },
    
  // ],
  //本用户相关信息（在getmyinfo中使用）
  status:{}, 
  comments:[], 
  myinfo:{
    myUserId:"01"
  },
  //我的评论（在sendreply中使用）
  mycomment:{
    myUserId:"",
    statusid:"",
    comment:""
  },
  //我的回复（在sendcomment中使用）
  myreply:{
    myUserid:"",
    statusid:"",
    commentId:"",
    reply:""
  },

  //用于弹出评论框
  focusInput: false,
  isInput: false,
  
  //用于弹出回复框
  commentFoucusInput:false,
  commentIsInput:false,
  //设置自动刷新
  ifOnShow : false,
  //设置锚点
  scrollId:"",
  windowHeight:""
  },
  QueryParams:{
    listType:4,//链接
    statusid:"",//动态id
  },
//options(Object)(未实现)
onLoad: function(options) {
  //获取上个页面传过来的参数写入QueryParams
  console.log(options)
  //如果有多张图片，提前计算图片宽度
  this.QueryParams.statusid=options.statusid; 
  this.initImageSize();
  //获取用户信息
  this.getMyInfo();

  console.log(1)
  //借助QueryParams获取页面
  this.getStatusDetail();
  //设置锚点
  console.log(this.data.scrollId)
  this.setData({
    scrollId:options.scrollId
  })
  console.log(this.data.scrollId)

},
//获取初始化页面(未实现)
getStatusDetail:function(){
  console.log('获取statusdetail页面') 
  wx.cloud.callFunction({ 
    name: 'getpost', 
    data: this.QueryParams
    , 
  }).then(result=>{ 
    console.log(result) 
    this.setData({ 
      //将原status数据与新请求的数据拼接在一起 
      status:result.result.list[0], 
    }); 
  }) 
  var statusid=this.QueryParams.statusid
  console.log(statusid)
  wx.cloud.callFunction({ 
    name:'getcomments', 
    data:{ 
      statusid:statusid,
      listType:0,
    }, 
  }).then(result=>{ 
    console.log(result.result.temp); 
    this.setData({ 
      //comments:[...this.data.comments,...result.result.temp] 
      comments:result.result.temp.list
    }) 
  }) 
},
//向后端发送动态评论及相关信息(未实现,tip:任何对后端的修改都需要重新request重新获取以便重新渲染页面)
sendComment:function(){
    if(!this.data.mycomment.comment.trim())
  {
    wx.showToast({
      title: '评论不能为空',
      image:'/icon/reachbottom.png'
    })
    return;
  }
  console.log(this.data.mycomment);
  wx.cloud.callFunction({ 
    name:'sendcomment', 
    data:{ 
      mycomment:this.data.mycomment,
      userId:this.data.status.userId
    }, 
    success:res=>{ 
      console.log(res); 
    } 
  }) 
  this.onLoad();

},
//向后端发送动态评论的回复的相关信息（未实现）
sendReply:function(){
  if(!this.data.myreply.reply.trim())
  {
    wx.showToast({
      title: '回复不能为空',
      image:'/icon/reachbottom.png'
    })
    return;
  }
  //发送回复
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
    //  this.initImageSize();
    //  this.getMyInfo();
     //this.getStatusDetail();

},
//删除评论(未实现)(tip:删除后要重新request改变js里面的数据重新渲染，否则用户看到的页面不会改变，应该任何执行删除操作的都需要重新request)
deleteComment:function(e){
  var statusid=this.QueryParams.statusid
  wx.showModal({
    title: '提示',
    content: '确定删除这条评论及该评论下所有内容吗',
    success (res) {
      if (res.confirm) {
        
        console.log('用户点击确定',e)
        wx.cloud.callFunction({ 
          name:'deleteComment', 
          data:{ 
            statusId:statusid,
            commentId:e.currentTarget.dataset.commentid
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
getMyInfo:function(){
  wx.cloud.callFunction({ 
    name:'getMyInfo', 
  }).then(result=>{ 
    console.log(result); 
    this.setData({ 
      ['myinfo.myUserId']:result.result.openid
    }) 
  }) 
},

// 更改点赞状态
onCollectionTap: function(event) {
  console.log("collectiontap is chaging")
  // 获取当前点击下标
  // var index = event.currentTarget.dataset.index;
  // console.log(event);
  // data中获取列表
  var message = this.data.status;
      if (message.collected == false) { 
        //前端：界面修改
        //如果是没点赞+1
        message.collected = true
        message.likenum = parseInt(message.likenum) + 1
        console.log('like');
        console.log(message)
        //后端：上传数据postid,调用云函数like点赞
        wx.cloud.callFunction({
          name:"likeadd",
          data:{
            statusid:message._id,
            userId:message.userId
          },
          success:res=>{
            console.log(res);
          }
        })

      } else {
        //前端：修改界面
        message.collected = false
        message.likenum = parseInt(message.likenum) - 1
        console.log('quitlike');
        
        console.log(message);

        //后端：上传数据postid,调用云函数lickcancel取消点赞
        wx.cloud.callFunction({
        name:"likecancel",
        data:{
          statusid:message._id
        },
        success:res=>{
          console.log(res);
        }
      })
    }

  this.setData({
    status: message
  })
},
//弹出动态评论框函数
  inputFocus(e) {
    console.log('评论键盘弹起')
    this.setData({
      isInput: true
    })
    console.log(this.data.isInput)
  },
//收起动态评论框
  inputBlur() {
    console.log('评论键盘收起')
    this.setData({
      isInput: false
    })
    console.log(this.data.isInput)
  },
//评论按钮点击事件触发
  focusButn: function (e) {
    console.log(e);
    var statusid=e.currentTarget.dataset.statusid;
    this.setData({
      focusInput: true,
      isInput: true,
      ['mycomment.statusid']:statusid
    })
  },
 //获取评论内容
  getComment:function(e){
    var content=e.detail.value
    this.setData({
      ['mycomment.comment']: content
    }) 
     console.log(this.data.mycomment.comment)
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
    var commId=e.currentTarget.dataset.commId
    this.setData({
      commentFocusInput: true,
      commentIsInput: true,
      ['myreply.statusid']:statusid,
      ['myreply.commentId']:commentId,
      ['myreply.commId']:commId
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
var windowHeight=wx.getSystemInfoSync().windowHeight;
this.setData({
  windowHeight:windowHeight
})
console.log(this.data.windowHeight)
const statusWidth=windowWidth-30*(windowWidth/750)*2
const imagesSize=(statusWidth-5*(windowWidth/750))/2
this.setData({
  imagesSize:imagesSize
})
},

});
