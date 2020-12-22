// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //获取对应id的post
  const de = await db.collection('posts').doc(event.statusid.statusid).get();
  //相关post返回的格式
  var temp = await de.data;
  var newdate=await temp.sendTime;
  //格式2020/11/10 12:20:30
  temp.sendTime=newdate.getFullYear() + '/' + (newdate.getMonth() + 1) + '/' + newdate.getDate() + ' ' + newdate.getHours() + ':' + (newdate.getMinutes() < 10 ? '0' + newdate.getMinutes() : newdate.getMinutes() ) + ':' + ( newdate.getSeconds() < 10 ? '0' + newdate.getSeconds() : newdate.getSeconds() );
  const udate = await db.collection('user').where({userId:temp.userId}).get();
  var temp2 =await udate.data[0];
  console.log(temp2)
  var avatar1 = await temp2.avatar;
  var userName1 = await temp2.userName;
  temp.avatar=avatar1;
  temp.userName = userName1;
  return temp;
}