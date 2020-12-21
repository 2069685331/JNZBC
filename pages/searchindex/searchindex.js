// pages/search/search.js
import{request} from "../../request/index.js"
const db=wx.cloud.database();
Page({
  
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
  /**
   * 页面的初始数据
   */
  data: {
    //确定多图时图片宽度
    imagesSize:0,
    //存储搜索的动态结果
    status:[
      {
        //用户id
        userId:"01",
        //动态id
        statusid:"1",
        //头像
        avatar:"/dongtai/user1.jpg",
        //用户名
        userName:'Leonardo',
        //日期
        time:'2020/11/11 11:11:11',
        //文本
        content:"The Revenant was the product of the tireless efforts of an unbelievable cast and crew. First off, to my brother in this endeavor, Mr. Tom Hardy. Tom, your talent on screen can only be surpassed by your friendship off screen… thank you for creating a transcendent cinematic experience. Thank you to everybody at Fox and New Regency…my entire team. I have to thank everyone from the very onset of my career… To my parents, none of this would be possible without you. And to my friends, I love you dearly, you know who you are.And lastly I just want to say this: Making ‘The Revenant’ was about man's relationship to the natural world. A world that we collectively felt in 2015 as the hottest year in recorded history. Our production needed to move to the southern tip of this planet just to be able to find snow. Climate change is real, it is happening right now. It is the most urgent threat facing our entire species, and we need to work collectively together and stop procrastinating. We need to support leaders around the world who do not speak for the big polluters, but who speak for all of humanity, for the indigenous people of the world, for the billions and billions of underprivileged people out there who would be most affected by this. For our children’s children, and for those people out there whose voices have been drowned out by the politics of greed. I thank you all for this amazing award tonight. Let us not take this planet for granted. I do not take tonight for granted. Thank you so very much.",
        //图片
        imgArr:[],
        //评论
        commentnum:76,
        //点赞数
        likenum:53,
        //本用户是否点赞过
        collected:0
      },
      {
        //用户id
        userId:"01",
        //动态id
        statusid:"1",
        //头像
        avatar:"/dongtai/user2.jpg",
        //用户名
        userName:'Depp',
        //日期
        time:'2020/11/11 11:11:11',
        //文本
        content:"1998",
        //图片
        imgArr:[
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604499631080&di=d857331ea96b03c3f2440491cb60e0f4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F16%2F20170816131622_fVYmk.thumb.700_0.jpeg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604826933589&di=8e10305e8e9a85bf3618765a4a613a08&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201805%2F30%2F20180530172421_kdKcu.jpeg",
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3580164859,3776785180&fm=26&gp=0.jpg",
          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=485066500,410625334&fm=26&gp=0.jpg"],
         //评论
        commentnum:76,
        //点赞数
        likenum:53,  
         //本用户是否点赞过
        collected:0
        },
       
      ],
      users:[
        {
          userName:'Leonardo',
          avatar:"/dongtai/user1.jpg",
          motto:"暨南针不戳！"
        },
        {
          userName:'Depp',
          avatar:"/dongtai/user2.jpg",
          motto:"暨南针不错！"
        }
      ],
    //存储搜多到的用户结果
    //判断是否有输入
    hasInput:false,
    //不仅用于显示初始值
    searchValue:"搜索暨南针",
    //用于接收建议数据
    advice:[],
    //用于动态结果与用户结果页面的切换
    tabs:[
      {
        id:0,
        name:"动态",
        isActive:true

      },
      {
        id:1,
        name:"用户",
        isActive:false
      }
    ],
    isStatus:true
  },
  //向端口请求动态送给端口的数据(相关页面请求以及触底加页与下拉刷新都可以参照category.js)
  QueryParams:{
    statusquery:"",//获取动态的链接
    usersquery:"",//获取用户的链接
    //cid:"",//注意，此处没有分区号，因为首页可以看到任何类型的分区内容
    pagenum:1,//页码
    pagesize:10//页长度
  },

  //总页数
  totalPages:1,

  //用于页面防抖
   TimeId:-1,
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  this.initImageSize();
  this.setData({
    searchValue:options.value
  })
  //调用页面初始化数据获取函数
  //建议改写getStatusList函数实现getStatus，这个存动态进status中
  this.getStatus();
  //建议参照getStatusList函数实现getUsers，这个存用户进users中
  this.getUsers();
},
//请求status结果,存进this.data.status（未实现）
getStatus:function(){

},
//请求users结果，存进this.data.users(未实现)
getUsers:function(){

},
// 更改点赞状态(未实现)
onCollectionTap: function(event) {  

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
  this.QueryParams.pagenum=1;
  //重新发送请求
  this.getStatusList();
  //完成请求，关闭下拉刷新界面
  wx.stopPullDownRefresh();
},
//获取动态列表数据
getStatusList:function(){
  request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.QueryParams})
  .then(result=>{
    const total=result.data.message.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      //将原status数据与新请求的数据拼接在一起
      status:[...this.data.status,...result.data.message.goods]
    });
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
  
  //输入框的值改变，就会触发的时间
  handleInput:function(e){
    //获取输入框的值
    const {value}=e.detail;
    this.setData({
      searchValue:value
    });
    //检查合法性
    if(!value.trim()){
      this.setData({
        hasInput:false
      })
      //不合法
      return;
    }
    //合法
    else{
      this.setData({
        hasInput:true
      })
      //重置时间计数器
      clearTimeout(this.TimeId);
      //1s后发送请求
      this.TimeId=setTimeout(()=>{
        //获取相关数据
        this.qsearch(value);
      },600)
    }

  },

  //为Input绑定回车事件
  handleConfirm:function(e){
    console.log(e);
    //获取回车时的value值
    const {value}=e.detail;
    if(!value.trim()){
      //不合法
      return;
    }
    wx.redirectTo({   //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）后续可以使用wx.navigateBack 可以返回;
      url:"/pages/searchindex/searchindex?value="+value
    })
  },

  //发送请求，获取搜索建议数据
  qsearch:function(query){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",data:{query}})
    .then(result=>{
          console.log(result)
          this.setData({
            advice:result.data.message
          })
  })
  },

  //点击切换tab分页
  clickTab:function(e){
    const {index}=e.currentTarget.dataset
    let tabs=this.data.tabs
    //修改激活按钮
    tabs.forEach((v,i) => {
      i==index?v.isActive=true:v.isActive=false
    });
    this.setData({
      tabs
    })


    //页面切换
    if(index==0)
    {
      this.setData({
        isStatus:true
      });
    }
    else
    {
      this.setData({
        isStatus:false
      });
    }

  }

})