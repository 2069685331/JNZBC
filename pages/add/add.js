// pages/add/add.js
Page({
  
    /**
   * 初始数据
   */
   data: {
     status :{
       userId:"1",//用户id
       content:"",//动态文本
       imgArr: [], //上传的结果图片集合
       cid:"0",//分区号
      //  sendTime:"" //上传时间
     },
    
     properties: {
       count: { //最多选择图片的张数，默认9张
         type: Number,
         value: 4
        },
       uploadUrl: { //图片上传的服务器路径
         type: String,
         value: ''
       },
     },
     //分区选择（array后期从数据库获取）
     array: [{cate:'校园生活',cid:"0"},
      {cate:"表白墙",cid:"1"},
      {cate:"寻物/寻失主",cid:"2"},
      {cate:"好物/资源分享",cid:"3"},
      {cate:"提问/解答",cid:"4"},
      {cate:"组局",cid:"5"},
      {cate:"闲置转让",cid:"6"}
    ],
     index:0,
  
    },
  //分区cid值改变
  Change:function(e){
    var index=e.detail.value
    var cid=this.data.array[index].cid
    this.setData({
      index:index,
      ['status.cid']:cid

    })
  },
  //图片选取
  uploadDetailImage: function (e) { //这里是选取图片的方法
    var that = this;
    var pics = [];
    var imgArr = that.data.status.imgArr;
    //判断图片集合的长度，大于等于规定长度4，不可以再添加
    if (imgArr.length >= that.data.properties.count.value) {
      wx.showToast({
        image:'/icon/reachbottom.png',
        title: '最多选择' + that.data.properties.count.value + '张！',
      })
      return;
    }
    //调用图片选择函数
    wx.chooseImage({
      count: that.data.properties.count.value-imgArr.length, // 最多可以选择的图片张数，默认4
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgs = res.tempFilePaths;
        for (var i = 0; i < imgs.length; i++) {
          imgArr.push(imgs[i])
        }

        //将获得的图片的本地连接存在status.imgArr中
        that.setData({
          ['status.imgArr']:imgArr
        });

        /*that.uploadimg({
          url: "http://www.test.com//test-api/wechat/applet/api/uploadUserAvatar", //这里是你图片上传的接口
          path: imgArr, //这里是选取的图片的地址数组
        });8*/
        
      },
    })
   },
    //多张图片上传
    /*uploadimg: function (data) {
      wx.showLoading({
        title: '上传中...',
        mask: true,
      })
      var that = this,
        i = data.i ? data.i : 0,
        success = data.success ? data.success : 0,
        fail = data.fail ? data.fail : 0;
      wx.uploadFile({
        url: data.url,
        filePath: data.path[i],
        name: 'file',
        formData: {"userId":that.data.userId},
        success: (resp) => {
          wx.hideLoading();
          success++;
          var str = resp.data //返回的结果，可能不同项目结果不一样
        
          console.log(str);
          // var pic = JSON.parse(str);
          // var pic_name = that.data.showUrl + pic.Data;
          // var detailPics = that.data.detailPics;
          // detailPics.push(pic_name)
          // that.setData({
          //   detailPics: detailPics
          // })
        },
        fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        i++;
        if (i == data.path.length) { //当图片传完时，停止调用     
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
          var myEventDetail = {
            picsList: that.data.detailPics
          } // detail对象，提供给事件监听函数
          var myEventOption = {} // 触发事件的选项
          that.triggerEvent('myevent', myEventDetail, myEventOption)//结果返回调用的页面
        } else { //若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);//递归，回调自己
        }
      }
    });
  },*/
  // 对选取的不满意图片进行删除
  deleteImgage: function (e) {
    var imgArr = this.data.status.imgArr;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    imgArr.splice(index, 1);
    this.setData({
     ['status.imgArr']: imgArr
    });
   },
  
  //文本获取
  getText: function(e) {
    // console.log(e.detail.value)
    var content=e.detail.value
    this.setData({
      ['status.content']: content
    }) 
     console.log(this.data.status.content)
  },
  //获取用户ID（暂未实现）
  // getUserId:function(){
  //   console.log("还没有获取用户ID")
  // },
  //打包发送
  send: function(e){
    //检查文本是否为空
    if(!this.data.status.content.trim())
    {
      wx.showToast({
        title: '文本不能为空',
        image:'/icon/reachbottom.png'
      })
      return;
    }
    /*
    //将图片打包上传到图床
    var newimgs=[];     //储存转换后的链接
    var imgs = this.data.imgArr;  //获取本地链接
    for (var i = 0; i < imgArr.length; i++) {
          //转换地方还不会写
          newimg.push(imgs[i])
        }
    this.setData({
      imgArr:newimgs
    });
    */

    //检测代码用，后期可删除
    console.log("打包发送下列信息")
    console.log(this.data.status)

    //设置时间格式如同'2020/11/11 11:11:21'
    // let newdate= new Date()
    // let dateStr= newdate.getFullYear() + '/' + (newdate.getMonth() + 1) + '/' + newdate.getDate() + ' ' + newdate.getHours() + ':' + (newdate.getMinutes() < 10 ? '0' + newdate.getMinutes() : newdate.getMinutes() ) + ':' + ( newdate.getSeconds() < 10 ? '0' + newdate.getSeconds() : newdate.getSeconds() )
   
    this.setData({
      ['status.sendTime']: dateStr
    }) 

    //调用云函数
    wx.cloud.callFunction({
      name:'sendpost',
      data:{
        status:this.data.status
      },
      success:res=>{
        console.log(res);
      }
    })

    //跳转到首页
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      // //调用获取用户ID函数，获取用户ID
      // this.getUserId();
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
    
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
    
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
    
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
    
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
    
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
    
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
    
    }
})