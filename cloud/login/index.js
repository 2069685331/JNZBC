// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //查询数据库有无该条数据
  const flag =await db.collection("user").where({
    userId:wxContext.OPENID, //请求者的id
    }).count();

  //如果有则返回登陆数据，无则返回匿名用户
  if(flag.total==1)
  {
    return await db.collection("user").where({
      userId:wxContext.OPENID
      }).get();
  }
  //无则返回匿名用户信息
  else if(flag.total==0)
  {
    return {data:{
      userName:"匿名用户"
    }}
  }
}