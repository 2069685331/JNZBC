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
    //对别人是返回匿名信息
     userinfo= {
      userName:"匿名用户",
      avatar:""
    }
    //对自己是返回空信息
    if(event.listType==0)
    return{userinfo: {
    }}
  }
  //查询发帖总数
  let statusNum= await db.collection("posts").where({
    userId:userId
  }).count()

  console.log(statusNum)
  //查询关注总数
  let followNum=await db.collection("interests").where({
    userId:userId
  }).count()
  //查询被关注总数
  let followerNum=await db.collection("interests").where({
    followId:userId
  }).count()

  userinfo['statusNum']=await statusNum.total
  userinfo['followNum']=await followNum.total
  userinfo['followerNum']=await followerNum.total

  //如果参数为0请求的是自己主页，就此返回，不查询haveFollowed
  if(event.listType==0)
  {
    return await {data:{
      userinfo:userinfo,
      requestId:wxContext.OPENID,
    }}
  }
  
  //如果请求为他人主页，要查询是否关注
  var haveFollowed=null
  if(event.listType==1)
  {
    haveFollowed= await db.collection("interests").where({
      userId:wxContext.OPENID,
      followId:userId
    }).count()
  }

  console.log(userinfo)
  return await {data:{
    userinfo:userinfo,
    requestId:wxContext.OPENID,
    haveFollowed:haveFollowed.total
  }}

}