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
  //用于页面防抖
   TimeId:-1,
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        searchValue:options.value
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