Page({
  data: {
      hiddenmodalput: true,   // 控制弹窗显示隐藏
      textareaVal: '',        // textarea的文本值

  },

  isfouce: function () {
      this.setData({
          hiddenmodalput: false
      })
  },

  textarea: function (e) {
      this.setData({
          textareaVal: e.detail.dataset.value
      })
  }
})