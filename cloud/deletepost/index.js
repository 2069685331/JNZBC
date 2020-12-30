// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  await db.collection('likes').where({postId:event.statusId}).remove({
    success: function(res) {
      console.log(res.data)
    }
  })

  await db.collection('comments').where({parentId:event.statusId}).remove({
    success: function(res) {
      console.log(res.data)
    }
  })

  return await db.collection('posts').where({_id:event.statusId}).remove({
    success: function(res) {
      console.log(res.data)
    }
  })
}