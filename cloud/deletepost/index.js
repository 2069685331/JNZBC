// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('posts').where({_id:event.statusId}).remove({
    success: function(res) {
      console.log(res.data)
    }
  })
}