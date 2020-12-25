// pages/category/index.js
//导入用来发送请求的方法（路径一定要补全）
import{request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*轮播图数组 */
    swiperList:[
  {image_src:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=362709193,2074951448&fm=26&gp=0.jpg"},
  {image_src:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201208%2F18%2F20120818153004_MjAKF.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611290001&t=1f05acf18cef6b485c8992f40b189c09"},
{image_src:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=558090378,2420497563&fm=26&gp=0.jpg"}],
    /*分区数组 */
    catesList:[]
    

  },
  QueryParams:{
    swiperquery:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",//轮播图片链接
    catequery:"https://api-hmugo-web.itheima.net/api/public/v1/categories",//分区图片+分区信息链接
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // wx.request({
   //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
   //   data: {},
   //   header: {'content-type':'application/json'},
   //   method: 'GET',
   //   dataType: 'json',
   //   responseType: 'text',
   //   success: (result)=>{
   //     this.setData({
   //       swiperList:result.data.message
   //     })
   //   },
   //   fail: ()=>{},
   //   complete: ()=>{}
   // }); 
   // request
   // 
   // wx.request({
   //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
   //   data: {},
   //   header: {'content-type':'application/json'},
   //   method: 'GET',
   //   dataType: 'json',
   //   responseType: 'text',
   //   success: (result)=>{
   //     this.setData({
   //       catesList:result.data.message
   //     })
   //   },
   //     
   //   fail: ()=>{},
   //   complete: ()=>{}
   // }); 
   wx.cloud.callFunction({
    name:'cate',
    data:{},
    success:res=>{
      console.log(res);
      this.setData({
        catesList:res.result.data
      })
    }
  })
   //轮播图加载函数
  // request({url:this.QueryParams.swiperquery})
   //.then(result=>{
    // this.setData({
    //  swiperList:result.data.message
    // })
   //});
   //分区加载函数
   //调用云函数
   
  //  request({url:this.QueryParams.catequery})
  //  .then(result=>{
    
  //     this.cates=result.data.message
  //     //构造catelist
  //     let catesList=this.cates[0].children
  //     this.setData({
  //       catesList
  //     })
  // })
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