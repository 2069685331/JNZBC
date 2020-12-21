// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection("interests").add({
    data:{
    followId:event.userId,              //设置被关注id
    userId: wxContext.OPENID,     //设置关注者id
    isA: false,
    sendTime: db.serverDate()    //入数据库时间
    },
    success:res=>{
      console.log(res);
    }
  })
}