// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //获取对应id的post
  const de = await db.collection('comments').aggregate().match({
    parentId:event.commentId
  }).sort({
    sendTime:-1
  })
  console.log(de.end())
  //相关post返回的格式
 

  const $=db.command.aggregate
  //结合user表处理动态,处理时间
  let temp=await de.lookup({
    from:"user",
    localField:"myUserId",
    foreignField:"userId",
    as:"comments" //联合查询用户表
  }).replaceRoot({
    newRoot: $.mergeObjects([$.arrayElemAt(['$comments', 0]), '$$ROOT'])
  })//将用户表输出到根结点
  .addFields({
    userName:'$userName',
    avatar:'$avatar',
    userId:'$myUserId'
  })
  .project({
    _id:1,
    userId: 1,     //评论者id
    reply: 1, //评论文本
    postId: 1, //评论的帖子
    parentId: 1,
    isA:1,//是否已读
    userName:1,
    avatar:1,
    //设置为字符串
    sendTime:$.dateToString({
      date:'$sendTime',
      //格式2020/11/10 12:20:30
      format:'%G/%m/%d %H:%M:%S',
      timezone:'Asia/Shanghai'
    })
  }).end()

  console.log(temp)
  return {temp};
  /*
  for(let i in temp){
    //处理时间
    var newdate=await temp[i].sendTime
    console.log(newdate)
    //格式2020/11/10 12:20:30
    temp[i].sendTime=newdate.getFullYear() + '/' + (newdate.getMonth() + 1) + '/' + newdate.getDate() + ' ' + newdate.getHours() + ':' + (newdate.getMinutes() < 10 ? '0' + newdate.getMinutes() : newdate.getMinutes() ) + ':' + ( newdate.getSeconds() < 10 ? '0' + newdate.getSeconds() : newdate.getSeconds() )
    const udate = await db.collection('user').where({userId:temp[i].myUserId}).get();
    var temp2 =await udate.data[0];
    console.log(temp2)
    var avatar1 = await temp2.avatar;
    var userName1 = await temp2.userName;
    temp[i].avatar=avatar1;
    temp[i].userName = userName1;
    console.log(temp[i])
  }
  */
  
}