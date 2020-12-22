//Page Object
const db=wx.cloud.database();
    //     //动态id
    //     statusid:1,
    //     //头像
    //     avatar:"/dongtai/user1.jpg",
    //     //用户名
    //     userName:'Leonardo',
    //     //日期
    //     time:'2020/11/11 11:11:21',
    //     //文本
    //     content:"The Revenant was the product of the tireless efforts of an unbelievable cast and crew. First off, to my brother in this endeavor, Mr. Tom Hardy. Tom, your talent on screen can only be surpassed by your friendship off screen… thank you for creating a transcendent cinematic experience. Thank you to everybody at Fox and New Regency…my entire team. I have to thank everyone from the very onset of my career… To my parents, none of this would be possible without you. And to my friends, I love you dearly, you know who you are.And lastly I just want to say this: Making ‘The Revenant’ was about man's relationship to the natural world. A world that we collectively felt in 2015 as the hottest year in recorded history. Our production needed to move to the southern tip of this planet just to be able to find snow. Climate change is real, it is happening right now. It is the most urgent threat facing our entire species, and we need to work collectively together and stop procrastinating. We need to support leaders around the world who do not speak for the big polluters, but who speak for all of humanity, for the indigenous people of the world, for the billions and billions of underprivileged people out there who would be most affected by this. For our children’s children, and for those people out there whose voices have been drowned out by the politics of greed. I thank you all for this amazing award tonight. Let us not take this planet for granted. I do not take tonight for granted. Thank you so very much.",
    //     //图片,，支持0~4张图片
    //     imgArr:[],
    //     //评论
    //     commentnum:76,
    //     //点赞数
    //     likenum:53,
    //     //本用户是否点赞过
    //     collected:0
//导入用来发送请求的方法（路径一定要补全）
import{request} from "../../request/index.js"
Page({
  data: {
    status:[],
    //确定多图时图片宽度
    imagesSize:0,

  },

//向端口请求动态送给端口的数据(相关页面请求以及触底加页与下拉刷新都可以参照category.js)
  QueryParams:{
    listType:0,
    //cid:"",//注意，此处没有分区号，因为首页可以看到任何类型的分区内容
    pagenum:0,//页码
    pagesize:10//页长度
  },
//总页数
totalPages:0,

//获取动态列表数据
getStatusList:function(){
  wx.cloud.callFunction({
    name:"getpost",
    data:this.QueryParams
  }).then(result=>{
    console.log(result)
    const total=result.result.status.length;
    console.log(total)
    this.totalPages=Math.floor(total/this.QueryParams.pagesize);
    console.log(this.totalPages)
    this.setData({
      //将原status数据与新请求的数据拼接在一起
      status:[...this.data.status,...result.result.status]
    });
  })
},
////////////////////////////////////////////////////////////////////////////////////////////////////////



// 更改点赞状态(未实现)
onCollectionTap: function(event) {
  // 获取当前点击下标
  var index = event.currentTarget.dataset.index;
  console.log(event);
  // data中获取列表
  var message = this.data.status;
  for (let i in message) { //遍历列表数据
    if (i == index) { //根据下标找到目标
      var collectStatus = false
      if (message[i].collected == 0) { 
        //前端：界面修改
        //如果是没点赞+1
        collectStatus = true
        message[i].collected = parseInt(message[i].collected) + 1
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
        message[i].collected = parseInt(message[i].collected) - 1
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
  //向后端返回点赞数据（还没实现）
  //////////////

  /////////////
},
//照着cateindex.js实现页面初次加载、触底、下拉刷新
onLoad: function(options) {
  this.initImageSize();
  this.getStatusList();
},
//页面触底事件
onReachBottom: function() {
  if(this.QueryParams.pagenum>=this.totalPages)
  {
    wx.showToast({
      title: '没有更多内容啦',
      image:'/icon/reachbottom.png'
    });
  }
  else
  {
    //请求页码+1
    this.QueryParams.pagenum++
    //请求页面
    this.getStatusList();
    //console.log("还有下一页");
  }
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



});
