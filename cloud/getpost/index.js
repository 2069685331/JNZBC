// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var pagenum=event.pagenum//页码
  var pagesize=event.pagesize//页长度
  var listType=event.listType//处理数据类型
  
  let oristatus=null
  switch(listType){
    case 0:   //获取首页帖子
      oristatus=db.collection("posts").aggregate().sort({
        sendTime:-1
      }).skip(pagesize*pagenum).limit(pagesize)
    case 1: //获取分区帖子
    oristatus=db.collection("posts").aggregate().match({
      cid:event.cid
    }).sort({
      sendTime:-1
    }).skip(pagesize*pagenum).limit(pagesize)
    case 2://获取我的主页帖子
    oristatus=db.collection("posts").aggregate().match({
      userId:wxContext.OPENID
    }).sort({
      sendTime:-1
    }).skip(pagesize*pagenum).limit(pagesize)
    case 3://获取他人主页帖子
    oristatus=db.collection("posts").aggregate().match({
      userId:event.userId
    }).sort({
      sendTime:-1
    }).skip(pagesize*pagenum).limit(pagesize)
  }
  //limit内是限制条数
  //sort里面实现对发送时间降序排序（从大到小），实现显示最新数据
  //const oristatus=await db.collection("posts").aggregate().sort({sendTime:-1}).limit(pagesize).skip(pagesize*pagenum).end()
  console.log(oristatus)

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
    userId:1,
    //设置为字符串
    sendTime:$.dateToString({
      date:'$sendTime',
      //格式2020/11/10 12:20:30
      format:'%G/%m/%d %H:%M:%S',
      timezone:'Asia/Shanghai'
    })
  })
  console.log(oristatus2)
  
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
    collected:$.eq([wxContext.OPENID,'$userId'])//是否为点赞者
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
    //设置为字符串
    sendTime:1
  }).end()
  
  console.log(status)
  return await status;
}
async function handlestatus(status,listType,wxContext){
  //遍历item，修改时间和counted
  for(let i in status){
    //处理时间
    //var newdate=new Date()
    var newdate=await status[i].sendTime
    console.log(newdate)
    //格式2020/11/10 12:20:30
    status[i].sendTime=newdate.getFullYear() + '/' + (newdate.getMonth() + 1) + '/' + newdate.getDate() + ' ' + newdate.getHours() + ':' + (newdate.getMinutes() < 10 ? '0' + newdate.getMinutes() : newdate.getMinutes() ) + ':' + ( newdate.getSeconds() < 10 ? '0' + newdate.getSeconds() : newdate.getSeconds() )

    console.log(status[i])
    //根据userId 查找用户信息
    const userinfo=await getuserinfo(status[i].userId)
    console.log(userinfo)
    
    //设置userName,avatar
    status[i]['avatar']=await userinfo.avatar
    status[i]['userName']=await userinfo.userName

    //处理collected
    //查询点赞记录，如果存在帖子id和请求者id一致的记录，说明用户点赞
    const collected =await db.collection("likes").where({
     userId:wxContext.OPENID, //请求者的id
     postId:status[i]._id   //帖子id
     }).count();
     
    status[i]['collected']=collected.total;
    console.log(status[i])
  }
    console.log(status)
    //返回处理好的数据
    return await {status};
}
async function getuserinfo  (userId) {
  console.log(userId)
  //查询数据库有无该条数据
  const flag =await db.collection("user").where({
    userId:userId //请求者的id
    }).count();

  console.log(flag)
  //如果有则返回登陆数据，无则返回匿名用户
  if(flag.total==1)
  {
      const userinfo =await db.collection("user").where({
      userId:userId
      }).get();
      return userinfo.data[0]
  }
  //无则返回匿名用户信息
  else if(flag.total==0)
  {
    return {
      userName:"匿名用户",
      avatar:""
    }
  }
}