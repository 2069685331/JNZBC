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
  //sort里面实现对发送时间降序排序（从大到小），实现显示最新数据,模糊匹配
  const oristatus=await db.collection("user").aggregate().match({userName:{$regex:'.*'+event.value+'.*',$option:'i'}}).sort({sendTime:-1}).limit(pagesize).skip(pagesize*pagenum).end()
  
  console.log(oristatus)
  //用于处理动态
  var status=await oristatus.list
  console.log(status)
  return await {status};
}