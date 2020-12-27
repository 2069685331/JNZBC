// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var pagenum=event.data.pagenum//页码
  var pagesize=event.data.pagesize//页长度

  console.log(pagenum)
  console.log(pagesize)
  console.log(event)

  //limit内是限制条数
  //sort里面实现对发送时间降序排序（从大到小），实现显示最新数据
  const oristatus=await db.collection("posts").aggregate().match({content:{$regex:'.*'+event.value+'.*',$option:'i'}}).sort({sendTime:-1}).limit(pagesize).skip(pagesize*pagenum)
  
  const $=db.command.aggregate
  //结合user表处理动态
  let oristatus2=await oristatus.lookup({
    from:"user",
    localField:"userId",
    foreignField:"userId",
    as:"posts" //联合查询用户表
  }).replaceRoot({
    newRoot: $.mergeObjects([$.arrayElemAt(['$posts', 0]), '$$ROOT'])
  })//将用户表输出到根结点
  .addFields({
    userName:'$userName',
    avatar:'$avatar'
  })
  .project({
    userName:1,
    avatar:1,
    content:1,
    imgArr:1,
    likenum:1,
    commentnum:1,
    cid:1,
    userId:1,
    //设置为字符串
    sendTime:$.dateToString({
      date:'$sendTime',
      //格式2020/11/10 12:20:30
      format:'%G/%m/%d %H:%M:%S',
      timezone:'Asia/Shanghai'
    })
  })
  
  
  //结合user表处理动态
  let status=await oristatus2.lookup({
    from:"likes",
    localField:"_id",
    foreignField:"postId",
    as:"posts" //联合查询用户表
  }).replaceRoot({
    newRoot: $.mergeObjects([$.arrayElemAt(['$posts', 0]), '$$ROOT'])
  })//将用户表输出到根结点
  .addFields({
    collected:$.eq(['$userId',wxContext.OPENID])//是否为点赞者
  })
  .project({
    userName:1,
    avatar:1,
    content:1,
    imgArr:1,
    likenum:1,
    commentnum:1,
    collected:1,
    userId:1,
    cid:1,
    //设置为字符串
    sendTime:1
  }).end()
  
    return await {status};
}