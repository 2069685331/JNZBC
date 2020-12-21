// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //获取对应id的post
  const de = await db.collection('comments').where({parentId:event.statusid.commentId}).get()
  console.log(event.statusid.commentId)
  console.log(de)
  //相关post返回的格式
  var temp = await de.data;
  console.log(temp)
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
  return {temp};
}