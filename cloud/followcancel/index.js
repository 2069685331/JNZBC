// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection("interests").where({
    followId:event.userId,
    userId:wxContext.OPENID
  }).remove({
    success: function(res) {
      console.log(res.data)
    }
  })
}