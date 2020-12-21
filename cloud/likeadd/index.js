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
  console.log(event)
  var postid=await event.statusid
  console.log(postid)

  //修改帖子集合的likenum字段,自增1
  db.collection("posts").where({
    _id:event.statusid,
  }).update({
    data:{
      likenum:_.inc(1)
    }
  })
  
  //增加点赞记录
  return await db.collection("likes").add({
    data:{
    postId:event.statusid,              //设置帖子id
    userId: wxContext.OPENID,     //设置点赞者id
    isA: false,
    sendTime: db.serverDate()    //入数据库时间
    },
    success:res=>{
      console.log(res);
    }
  })
}