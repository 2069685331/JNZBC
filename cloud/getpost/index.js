// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var pagenum=event.pagenum//页码
  var pagesize=event.pagesize//页长度

  console.log(pagenum)
  console.log(pagesize)

  //limit内是限制条数
  //sort里面实现对发送时间降序排序（从大到小），实现显示最新数据
  const oristatus=await db.collection("posts").aggregate().sort({sendTime:-1}).limit(pagesize).skip(pagesize*pagenum).end()
  console.log(oristatus)
  //用于处理动态
  var status=await oristatus.list
  console.log(status)

  //遍历item，修改时间和counted
  for(let i in status){
    //处理时间
    //var newdate=new Date()
    var newdate=await status[i].sendTime
    console.log(newdate)
    //格式2020/11/10 12:20:30
    status[i].sendTime=newdate.getFullYear() + '/' + (newdate.getMonth() + 1) + '/' + newdate.getDate() + ' ' + newdate.getHours() + ':' + (newdate.getMinutes() < 10 ? '0' + newdate.getMinutes() : newdate.getMinutes() ) + ':' + ( newdate.getSeconds() < 10 ? '0' + newdate.getSeconds() : newdate.getSeconds() )

    console.log(status[i])

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
    return await {status};
}