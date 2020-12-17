// index.js
Page({
    data: {},
    // 跳详情页
    jump (event) {
        // 获取到跳转锚点id
        let detail = event.currentTarget.dataset.detail;

        wx:wx.navigateTo({
          url: '/pages/testtest/testtest?detail=' + detail,  // 通过url传到跳转页面
        })
    },
})