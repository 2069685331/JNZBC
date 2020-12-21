// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)

  //查询数据库有无该条数据
  const flag =await db.collection("user").where({
    userId:wxContext.OPENID, //请求者的id
    }).count();

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> main
  //查询是否重名
  const name =await db.collection("user").where({
      userId:event.userName, //请求者的username
      }).count();
  if(name.total == 0)
  {
    //有重名现象
    return{
      data:{nameConfict:true}
    }
  }
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> main
  console.log(flag)
  //如果无则插入，有则修改
  if(await flag.total==0)
  {
    console.log("进入端口")
    return await db.collection("user").add({
      data:{
        userId:wxContext.OPENID,
        userName:event.userName,
        avatar:event.avatar,
        motto:event.motto,
<<<<<<< HEAD
<<<<<<< HEAD
        followNum:0,
        followerNum:0,
        statusNum:0
=======
>>>>>>> main
=======
>>>>>>> main
      },
      success:res=>{
        console.log(res);
      }
    })
  }
  //有则更新
  else if(await flag.total==1)
  {
    console.log("进入端口")
    return await db.collection("user").where({
      userId:wxContext.OPENID
    }).update({
      data:{
        userName:event.userName,
        avatar:event.avatar,
        motto:event.motto
      },
      success:res=>{
        console.log(res);
      }
    })
  }
}