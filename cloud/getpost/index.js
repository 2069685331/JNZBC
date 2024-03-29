// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var pagenum=await event.pagenum//页码
  var pagesize=await event.pagesize//页长度

  console.log(event.listType)
  
  let oristatus=null
  switch(event.listType){
    case 0:   //获取首页帖子
      oristatus=await db.collection("posts").aggregate().sort({
        sendTime:-1
      }).skip(pagesize*pagenum).limit(pagesize)
      
      break;
    case 1: //获取分区帖子
    oristatus=await db.collection("posts").aggregate().match({
      cid:event.cid
    }).sort({
      sendTime:-1
    }).skip(pagesize*pagenum).limit(pagesize)

    break;
    case 2://获取我的主页帖子
    console.log('获取我的主页帖子')
    console.log(pagenum)
    oristatus=await db.collection("posts").aggregate().match({
      userId:wxContext.OPENID
    }).sort({
      sendTime:-1
    }).skip(pagesize*pagenum).limit(pagesize)

    break;
    case 3://获取他人主页帖子
    oristatus=await db.collection("posts").aggregate().match({
      userId:event.userId
    }).sort({
      sendTime:-1
    }).skip(pagesize*pagenum).limit(pagesize)
    
    break;
    case 4://获取statusid的帖子
    oristatus=await db.collection("posts").aggregate().match({
      _id:event.statusid
    })
    break;
  }
  


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
    avatar:'$avatar',
    likedId:"$userId"
  })
  .project({
    _id:1,
    userName:1,
    avatar:1,
    content:1,
    imgArr:1,
    likenum:1,
    likedId:1,
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
  let status=await oristatus2.project({
    userId:0,
  }).lookup({
    from:"likes",
    localField:"_id",
    foreignField:"postId",
    as:"posts" //联合查询用户表
  }).replaceRoot({
    newRoot: $.mergeObjects([$.arrayElemAt(['$posts', 0]), '$$ROOT'])
  })//将用户表输出到根结点
  .addFields({
    collected:$.eq(['$userId',wxContext.OPENID]),//是否为点赞者
    userId:"$likedId"
  })
  .project({
    _id:1,
    userName:1,
    avatar:1,
    content:1,
    imgArr:1,
    likenum:1,
    collected:1,
    commentnum:1,
    cid:1,
    userId:1,
    //设置为字符串
    sendTime:1
  }).end()

  
  
  console.log(status)
  return await status;


}