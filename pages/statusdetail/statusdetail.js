// pages/statusdetail/statusdetail.js
Page({
  data: {
    status:[
      {
        //动态id
        statusid:1,
        //头像
        avatar:"/dongtai/user1.jpg",
        //用户名
        userName:'Leonardo',
        //日期
        time:'2020/11/11 11:11:11',
        //文本
        content:"The Revenant was the product of the tireless efforts of an unbelievable cast and crew. First off, to my brother in this endeavor, Mr. Tom Hardy. Tom, your talent on screen can only be surpassed by your friendship off screen… thank you for creating a transcendent cinematic experience. Thank you to everybody at Fox and New Regency…my entire team. I have to thank everyone from the very onset of my career… To my parents, none of this would be possible without you. And to my friends, I love you dearly, you know who you are.And lastly I just want to say this: Making ‘The Revenant’ was about man's relationship to the natural world. A world that we collectively felt in 2015 as the hottest year in recorded history. Our production needed to move to the southern tip of this planet just to be able to find snow. Climate change is real, it is happening right now. It is the most urgent threat facing our entire species, and we need to work collectively together and stop procrastinating. We need to support leaders around the world who do not speak for the big polluters, but who speak for all of humanity, for the indigenous people of the world, for the billions and billions of underprivileged people out there who would be most affected by this. For our children’s children, and for those people out there whose voices have been drowned out by the politics of greed. I thank you all for this amazing award tonight. Let us not take this planet for granted. I do not take tonight for granted. Thank you so very much.",
        //图片,，支持0~4张图片
        imgArr:[],
        //评论
        commentnum:76,
        //点赞数
        likenum:54,
        //本用户是否点赞过
        collected:0
      }
  ],
  focusInput: false,
  isInput: false

  },
  QueryParams:{
    
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
      if (message[i].collected == 0) { //如果是没点赞+1
        collectStatus = true
        message[i].collected = parseInt(message[i].collected) + 1
        message[i].likenum = parseInt(message[i].likenum) + 1
        console.log('like');
      } else {
        collectStatus = false
        message[i].collected = parseInt(message[i].collected) - 1
        message[i].likenum = parseInt(message[i].likenum) - 1
        console.log('quitlike');
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
//弹出评论框函数
  inputFocus(e) {
    console.log(e, '键盘弹起')
    this.setData({
      isInput: true
    })
  },
//收起评论框
  inputBlur() {
    console.log('键盘收起')
    this.setData({
      isInput: false
    })
  },
//评论按钮点击事件触发
  focusButn: function () {
    this.setData({
      focusInput: true,
      isInput: true
    })
  },
//向后端发送评论及相关信息
sendComment:function(){

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

//options(Object)
onLoad: function(options) {
  this.initImageSize()
},
onReady: function() {
  
},
onShow: function() {
  
},
onHide: function() {

},
onUnload: function() {

},
onPullDownRefresh: function() {

},
onReachBottom: function() {

},
onShareAppMessage: function() {

},
onPageScroll: function() {

},
//item(index,pagePath,text)
onTabItemTap:function(item) {

}
});
