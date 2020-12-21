// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command;
  const oristatus = await db.collection("user").where({userId:wxContext.OPENID}).get()
  db.collection('comments').where({_id:event.myreply.commentId}).update({
    data: {
      replyNum: _.inc(1)
    },
  success: function(res) {
    console.log(res.data)
  }});
  var temp = oristatus.data
  return await db.collection("comments").add({
    data:{
    myUserId: wxContext.OPENID,     //评论者id
    reply: event.myreply.reply, //评论文本
    postId: event.myreply.statusid, //评论的帖子
    parentId: event.myreply.commentId,
    avatar:temp[0].avatar,//头像
    isA:false,//是否已读
    userName:temp[0].userName,//名字
    sendTime: db.serverDate()    //评论时间
  },
  success:res=>{
    console.log(res);
  }
})
}