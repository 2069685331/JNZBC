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
  var status=[]
  db.collection("posts").limit(pagesize).skip(pagesize*pagenum).get().then(res=>{
    console.log(res)
    // this.status=res
    })
  console.log(status)
  //遍历item，修改时间和counted
  for(let i in status){
  //处理时间
  var newdate=status[i].sendTime
  status[i].sendTime=JSON.parse(newdate)
  //处理counted
  var counted;  //返回值0或者1
  //查询点赞记录，如果存在帖子id和请求者id一致的记录，说明用户点赞
  counted=db.collection("likes").where({
    userId:wx.context.OPENID, //请求者的id
    postId:res[i]._id   //帖子id
    }).count();
  status[i]['counted']=counted;
  }
  return await status;
}