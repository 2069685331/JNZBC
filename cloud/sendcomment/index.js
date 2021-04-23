// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  const _ = db.command;
  await db.collection('posts').where({_id:event.mycomment.statusid}).update({
    data: {
      commentnum: _.inc(1)
    },
  success: function(res) {
    console.log(res.data)
  }});
  const oristatus = await db.collection("user").where({userId:wxContext.OPENID}).get()
  var temp = oristatus.data
  const oristatus1 = await db.collection("posts").where({_id:event.mycomment.statusid}).get()
  var temp1 = oristatus.data
  return await db.collection("comments").add({
    data:{
    userId: wxContext.OPENID,     //评论者id
    commentText: event.mycomment.comment, //评论文本
    postId: event.mycomment.statusid, //评论的帖子
    commId:event.userId, //被评论者的userId
    parentId:0,
    isA:false,
    commId:temp[0].userId,
    avatar:temp[0].avatar,//头像
    isA:false,//是否已读
    replyNum:0,//回复数目
    sendTime: db.serverDate()    //评论时间
  },
  success:res=>{
    console.log(res);
  }
})
}