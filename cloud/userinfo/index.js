// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.listType==0) //请求自己主页的信息
  {var userId=wxContext.OPENID}
  if(event.listType==1) //请求他人主页的信息
  {var userId=event.userId}

  //查询数据库有无该条数据
  const flag =await db.collection("user").where({
    userId:userId, //请求者的id
    }).count();

  let userinfo =null
  //如果有则返回登陆数据，无则返回匿名用户
  if(flag.total==1)
  {
      userinfo =await db.collection("user").where({
      userId:userId
      }).get();
      //{username,userinfo,}扁平化数组
      userinfo= userinfo.data[0]
  }
  //无则返回匿名用户信息
  else if(flag.total==0)
  {
     userinfo= {
      userName:"匿名用户",
      avatar:""
    }
  }
  //查询发帖总数
  let statusNum= await db.collection("posts").where({
    userId:userId
  }).count().total

  console.log(statusNum)
  //查询关注总数
  let followNum=await db.collection("interests").where({
    followerId:userId
  }).count().total
  //查询被关注总数
  let followerNum=await db.collection("posts").where({
    userId:userId
  }).count().total
  
  //如果请求为他人主页，要查询是否关注
  var haveFollowed=null
  if(event.listType==1)
  {
    haveFollowed= await db.collection("interests").where({
      userId:wxContext.OPENID,
      followerId:userId
    }).count().total
  }
  userinfo['statusNum']=await statusNum
  userinfo['followNum']=await followNum
  userinfo['followerNum']=await followerNum

  console.log(userinfo)
  return await {data:{
    userinfo:userinfo,
    haveFollowed:haveFollowed
  }}
}