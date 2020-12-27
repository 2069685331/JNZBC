// pages/login/login.js
Page({
  data: {
    userId:"",
    newFlag:"true",   //第一次登录为true，否则为false
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  handleGetUserInfo(e){
    console.log(e);

    const {userInfo}=e.detail;  //获取微信用户信息
    wx.setStorageSync("WXuserinfo", userInfo);
    //这里需要接收服务器发送的newFlag与userId，直接声明变量接收或写入data中
    var userId = this.data.userId
    wx.navigateTo({    //跳到资料编辑页面
      url: '../editor/editor?userId=' + userId
    });
    
    
      
  }
})