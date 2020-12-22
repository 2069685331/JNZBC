// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //删除的记录数
  const _ = db.command;
  
  db.collection('posts').where({_id:event.statusId}).update({
    data: {
      commentnum: _.inc(-1)
    },
  success: function(res) {
    console.log(res.data)
  }});
  db.collection('comments').where({_id:event.commentId}).remove({
    success: function(res) {
      console.log(res.data)
    }
  })
  db.collection('comments').where({parentId:event.commentId}).remove({
    success: function(res) {
      console.log(res.data)
    }
  })
  
}