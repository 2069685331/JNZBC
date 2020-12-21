// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  
  const $=db.command.aggregate
  let status=null
  
  //获取我关注的用户
      status=db.collection("likes").aggregate().match({
        likeId:wxContext.OPENID
      }).sort({
        sendTime:-1
      }).lookup({
        from:"user",
        localField:"userId",
        foreignField:"userId",
        as:"posts" //联合查询用户表
      }).replaceRoot({
        newRoot: $.mergeObjects([$.arrayElemAt(['$posts', 0]), '$$ROOT'])
      })//将用户表输出到根结点
      .addFields({
        userName:'$userName',
        avatar:'$avatar',
        motto:"$motto",
        statusId:"$postId"
      })
      .project({
        userName:1,
        avatar:1,
        motto:1,
        statusId:1,
        //设置为字符串
      sendTime:$.dateToString({
        date:'$sendTime',
        //格式2020/11/10 12:20:30
        format:'%G/%m/%d %H:%M:%S',
        timezone:'Asia/Shanghai'
      })
      }).end()
      
   
  //置为已读
    db.collection("interests").where({
      likeId:wxContext.OPENID,
      isA:false
    }).update({
      data:{
      isA:true
      }
    })
  
  return status
}