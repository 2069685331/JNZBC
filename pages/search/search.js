// pages/search/search.js
import{request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断是否有输入
    hasInput:false,
    //不仅用于显示初始值
    searchValue:"搜索暨南针",
    //用于接收建议数据
    advice:[]
  },
  //用于页面防抖
   TimeId:-1,
   //获取内容相关接口及参数
   QueryParams:{
    advicequery:"https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",//搜索内容建议链接
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      //0.6s后发送请求
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
    wx.redirectTo({   //关闭当前页面，跳转到应用内的某个页面;
      url:"/pages/searchindex/searchindex?value="+value
    })
  },

  //发送请求，获取搜索建议数据
  qsearch:function(query){
  //   request({url:this.QueryParams.advicequery,data:{query}})
  //   .then(result=>{
  //         console.log(result)
  //         this.setData({
  //           advice:result.data.message
  //         })
  // })
  wx.cloud.callFunction({ 
    name:"getsearchadvice", 
    data:{query}, 
  }).then(result=>{ 
    console.log(result.result.status) 
    this.setData({ 
      //将原status数据与新请求的数据拼接在一起 
      advice:result.result.status 
    }); 
    console.log(this.data.advice) 
  }) 
  }
})