// pages/login/login.js
Page({
  data: {
    userId:"",
    newFlag:"true",   //第一次登录为true，否则为false
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  handleGetUserInfo(e){
    // console.log(e);

    const {userInfo}=e.detail;
    wx.setStorageSync("userinfo", userInfo);
    //这里需要接收服务器发送的newFlag与userId，直接声明变量接收或写入data中
    if(newFlag){   //第一次登录则跳到编辑资料页面
      wx.navigateTo({
        url: '../editor/editor?userId=' + userId
      });
    }
    else{   //非第一次登录：跳到上一次页面
      wx.navigateBack({
        delta: 1
      });
      
    }
    
    
      
  }
})