// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
//返回消息页面数组
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const announceNum =await db.collection("announce").where({
    isA:false
  }).count();
  const followNum =await db.collection("interets").where({
    isA:false,  //没通知过
    userId:wxContext.OPENID //新增关注数量
    }).count();
  const commentNum =await db.collection("comments").where({
      isA:false,  //没通知过
      commentId:wxContext.OPENID //新增评论数量
  }).count();
  const likesNum =await db.collection("likes").where({
    isA:false,  //没通知过
    Id:wxContext.OPENID //新增关注数量
  }).count();
}