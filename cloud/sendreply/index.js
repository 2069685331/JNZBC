// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command;
  
  await db.collection('posts').where({_id:event.myreply.statusid}).update({
    data: {
      commentnum: _.inc(1)
    }
    })

  await db.collection('comments').where({_id:event.myreply.commentId}).update({
    data: {
      replyNum: _.inc(1)
    },
  success: function(res) {
    console.log(res.data)
  }});
  
  return await db.collection("comments").add({
    data:{
    myUserId: wxContext.OPENID,     //评论者id
    reply: event.myreply.reply, //评论文本
    postId: event.myreply.statusid, //评论的帖子
    parentId: event.myreply.commentId,
    commId:event.myreply.userId, //被评论者的userId
    isA:false,//是否已读
    sendTime: db.serverDate()    //评论时间
  },
  success:res=>{
    console.log(res);
  }
})
}