// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  
  //增加帖子记录
  return await db.collection("posts").add({
    data:{
    userId: wxContext.OPENID,     //设置点赞者id
    isA: false,
    imgArr:event.status.imgArr,
    content:event.status.content,
    likenum:0,
    commentnum:0,
    cid:event.status.cid,
    sendTime: db.serverDate()    //入数据库时间
  },
  success:res=>{
    console.log(res);
  }
})
}