// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  const _ = db.command;
  db.collection('posts').where({_id:event.mycomment.statusid}).update({
    data: {
      commentnum: _.inc(1)
    },
  success: function(res) {
    console.log(res.data)
  }});
  const oristatus = await db.collection("user").where({userId:wxContext.OPENID}).get()
  var temp = oristatus.data
  return await db.collection("comments").add({
    data:{
    userId: wxContext.OPENID,     //评论者id
    commentText: event.mycomment.comment, //评论文本
    postId: event.mycomment.statusid, //评论的帖子
    parentId:0,
    avatar:temp[0].avatar,//头像
    isA:false,//是否已读
    userName:temp[0].userName,//名字
    replyNum:0,//回复数目
    sendTime: db.serverDate()    //评论时间
  },
  success:res=>{
    console.log(res);
  }
})
}