Page({
  
   /**
  * 组件的初始数据
  */
  data: {
    status :{
      userId:"1",
      sendTime:"2020/11/11/11:11",
      imgArr: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604499631080&di=d857331ea96b03c3f2440491cb60e0f4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F16%2F20170816131622_fVYmk.thumb.700_0.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604826933589&di=8e10305e8e9a85bf3618765a4a613a08&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201805%2F30%2F20180530172421_kdKcu.jpeg",
      "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3580164859,3776785180&fm=26&gp=0.jpg",
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=485066500,410625334&fm=26&gp=0.jpg"
], //上传的结果图片集合
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
      showUrl: { //图片的拼接路径
        type: String,
        value: ''
      }
    }
  },

  
  


  /**
   * 方法列表
   */

    uploadDetailImage: function (e) { //这里是选取图片的方法
      var that = this;
      var pics = [];
      var imgArr = that.data.status.imgArr;
      console.log(imgArr.length);
      console.log(that.data.properties.count.value);
      if (imgArr.length >= that.data.properties.count) {
        wx.showToast({
          title: '最多选择' + that.data.properties.count + '张！',
        })
        return;
      }
      wx.chooseImage({
        count: that.data.properties.count.value, // 最多可以选择的图片张数，默认4
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          var imgs = res.tempFilePaths;
          for (var i = 0; i < imgs.length; i++) {
            imgArr.push(imgs[i])
          }
          that.setData({
            ['status.imgArr']:imgArr
          });
          console.log(that.data.status.imgArr)
          /*that.uploadimg({
            url: "http://www.test.com//test-api/wechat/applet/api/uploadUserAvatar", //这里是你图片上传的接口
            path: imgArr, //这里是选取的图片的地址数组
          });8*/
        },
      })

    },
    //多张图片上传
    uploadimg: function (data) {
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
    },
  // 删除图片
  deleteImgage: function (e) {
    var imgArr = this.data.status.imgArr;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    imgArr.splice(index, 1);
    this.setData({
     ['status.imgArr']: imgArr
    });
    console.log(this.data.status.imgArr);
    console.log(imgArr);
    console.log("shanchuchenggong");
   },

  ready: function () {
  },
})