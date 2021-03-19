// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  console.log(event.listType)
  const $=db.command.aggregate
  let oristatus=null
  switch(event.listType){
    case 0 :   //获取我关注的用户
      oristatus=db.collection("interests").aggregate().match({
        userId:wxContext.OPENID
      }).sort({
        sendTime:-1
      }).lookup({
        from:"user",
        localField:"followId",
        foreignField:"userId",
        as:"posts" //联合查询用户表
      }).replaceRoot({
        newRoot: $.mergeObjects([$.arrayElemAt(['$posts', 0]), '$$ROOT'])
      })//将用户表输出到根结点
      .addFields({
        userName:'$userName',
        avatar:'$avatar',
        motto:"$motto"
      })
      .project({
        userName:1,
        avatar:1,
        motto:1
      })
      
    break;
    case 1: //获取关注我的用户
    console.log("进入接口")
    oristatus=db.collection("interests").aggregate().match({
      followId:wxContext.OPENID
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
      motto:"$motto"
    })
    .project({
      userName:1,
      userId:1,
      avatar:1,
      motto:1,
      //设置为字符串
      sendTime:$.dateToString({
      date:'$sendTime',
      //格式2020/11/10 12:20:30
      format:'%G/%m/%d %H:%M:%S',
      timezone:'Asia/Shanghai'
    })
    })
    break;
    case 2: //获取关注我的用户
    console.log("进入接口")
    oristatus=db.collection("interests").aggregate().match({
      followId:wxContext.OPENID
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
      motto:"$motto"
    })
    .project({
      userName:1,
      userId:1,
      avatar:1,
      motto:1,
      //设置为字符串
      sendTime:$.dateToString({
      date:'$sendTime',
      //格式2020/11/10 12:20:30
      format:'%G/%m/%d %H:%M:%S',
      timezone:'Asia/Shanghai'
    })
    })
    break;
  }

  var status = await oristatus.end()

  //置为已读
  if(event.listType==2)
  {
    db.collection("interests").where({
      followId:wxContext.OPENID,
      isA:false
    }).update({
      data:{
        isA:true
        }
    })
  }
  return status
}