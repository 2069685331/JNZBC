// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let oristatus=null
  switch(event.listType){
    case 0:   //获取官方通知
      oristatus=db.collection("announce").aggregate().sort({
        sendTime:-1
      })
      
      break;
    case 1: //获取关注通知
    oristatus=db.collection("interests").aggregate().match({
      followId:wxContext.OPENID
    }).sort({
      sendTime:-1
    })

    break;
    case 2://获取评论通知
    console.log('获取我的主页帖子')
    console.log(pagenum)
    oristatus=await db.collection("comments").aggregate().match({
      commId:wxContext.OPENID
    }).sort({
      sendTime:-1
    })

    break;
    case 3://获取点赞通知
    oristatus=db.collection("likes").aggregate().match({
      likeId:event.userId
    }).sort({
      sendTime:-1
    })
    
    break;
  }

  const $=db.command.aggregate
  if(listType==2)
  {//如果请求的是评论
    var oristatus2=await oristatus.lookup({
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
      statusId:'$parentId'
    })
    }
    else{
      var oristatus2=await oristatus.lookup({
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
        statusId:'$postId'
      })
  }

  var status=await oristatus2
  .project({
    userName:1,
    avatar:1,
    userId:1,
    context:1,
    statusId:1,
    //设置为字符串
    sendTime:$.dateToString({
      date:'$sendTime',
      //格式2020/11/10 12:20:30
      format:'%G/%m/%d %H:%M:%S',
      timezone:'Asia/Shanghai'
    })
  }).end()
  console.log(status)
  
  return await status
}