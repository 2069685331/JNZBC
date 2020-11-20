//Page Object
//导入用来发送请求的方法（路径一定要补全）
import{request} from "../../request/index.js"
Page({
  data: {
    status:[]

  },

//向端口请求动态送给端口的数据
  QueryParams:{
    query:"",//链接
    cid:"",//分类号
    pagenum:1,//页码
    pagesize:10//页长度
  },

//总页数
totalPages:1,

//options(Object)
onLoad: function(options) {
  this.QueryParams.cid=options.cid;
  this.getStatusList();
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





onReady: function() {
  
},
onShow: function() {
  
},
onHide: function() {

},
onUnload: function() {

},
onShareAppMessage: function() {

},
onPageScroll: function() {

},
//item(index,pagePath,text)
onTabItemTap:function(item) {

}
});