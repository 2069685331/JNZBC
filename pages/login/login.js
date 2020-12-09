// pages/login/login.js
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  handleGetUserInfo(e){
    // console.log(e);

    const {userInfo}=e.detail;
    wx.setStorageSync("userinfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
      
  }
})