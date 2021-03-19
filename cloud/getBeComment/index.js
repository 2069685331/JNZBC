// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //console.log(event.statusid)
  //获取对应id的post
  const de = await db.collection('comments').aggregate().match({
    commId:wxContext.OPENID
  }).sort({
    sendTime:-1
  })

  //相关post返回的格式
 
  const $=db.command.aggregate
  //结合user表处理动态,处理时间
  let temp=await de.lookup({
    from:"user",
    localField:"userId",
    foreignField:"userId",
    as:"comments" //联合查询用户表
  }).replaceRoot({
    newRoot: $.mergeObjects([$.arrayElemAt(['$comments', 0]), '$$ROOT'])
  })//将用户表输出到根结点
  .addFields({
    statusId:'$postId',
    userName:'$userName',
    avatar:'$avatar',
    comTime:$.dateToString({
      date:'$sendTime',
      //格式2020/11/10 12:20:30
      format:'%G/%m/%d %H:%M:%S',
      timezone:'Asia/Shanghai'
    })
  })
  .project({
    _id:1,
    userId:1,     //评论者id
    statusId:1,
    comTime:1,
    commentText:1, //评论文本
    userName:1,
    avatar:1,
  }).end()
  
  
  console.log(temp)

  //置为已读
  db.collection("comments").where({
    commId:wxContext.OPENID
  }).update({
    data:{
      isA:true
      }
  })
  return temp;
 
}