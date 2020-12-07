// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//用于点赞数据加一
const db=cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //传入帖子id
  var postid=event.statusid

  //修改帖子集合的likenum字段,自增1
  db.collection("posts").where({
    _id:postid,
  }).update({
    data:{
      likenum:_.inc(1)
    }
  })
  
  //增加点赞记录
  return await db.collection("likes").add({
    postId:postid,              //设置帖子id
    userId: wxContext.OPENID,     //设置点赞者id
    isA: false,
    LikeTime: db.serverTime(),    //入数据库时间
  })
}