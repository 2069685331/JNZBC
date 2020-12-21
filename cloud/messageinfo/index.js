// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database({
})
//返回消息页面数组
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const announceNum =await db.collection('announce').where({
     isA:false
   }).count();

   console.log(announceNum)

  const followNum =await db.collection('interests').where({
    isA:false,  //没通知过
    followId:wxContext.OPENID //新增关注数量
    }).count();

  console.log(followNum.total)
  const commentNum =await db.collection('comments').where({
    isA:false,  //没通知过
    commId:wxContext.OPENID //新增评论数量
    }).count();

  console.log(commentNum.total)
  const likesNum =await db.collection('likes').where({
    isA:false,  //没通知过
    likeId:wxContext.OPENID //新增点赞数量
  }).count();

  console.log(likesNum.total)
  return await {
    data:{
      0:announceNum.total,
      1:followNum.total,
      2:commentNum.total,
      3:likesNum.total
    }
  }
}