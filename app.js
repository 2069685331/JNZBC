//app.js
App({
    //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
    onLaunch: function(options) {
        wx.cloud.init({
            env:'jinan-vh0xu',
            traceUser:true
        })
    },
    onShow: function(options) {

    },
    onHide: function() {

    },
    onError: function(msg) {

    },
    //options(path,query,isEntryPage)
    onPageNotFound: function(options) {

    },
});
  