// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const $=db.command.aggregate
  let status=null
  
  //获取我官方通知
  status=db.collection("announce").aggregate().sort({
        sendTime:-1
      })
      .project({
      msgText:1,
      msgTitle:1,
      sendTime:$.dateToString({
        date:'$sendTime',
        //格式2020/11/10 12:20:30
        format:'%G/%m/%d %H:%M:%S',
        timezone:'Asia/Shanghai'
      })
      }).end()
      
   
  //置为已读
  const res=await db.collection("announce").where({
      isA:false
    }).update({
      data:{
        isA:true
        }
    })

  console.log(res)
  
 
  return await status
}