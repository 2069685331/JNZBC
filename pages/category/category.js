// pages/category/index.js
//导入用来发送请求的方法（路径一定要补全）
import{request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*轮播图数组 */
    swiperList:[],
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
   //轮播图加载函数
   request({url:this.QueryParams.swiperquery})
   .then(result=>{
     this.setData({
      swiperList:result.data.message
     })
   });
   //分区加载函数
   request({url:this.QueryParams.catequery})
   .then(result=>{
    
      this.cates=result.data.message
      //构造catelist
      let catesList=this.cates[0].children
      this.setData({
        catesList
      })
  })
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