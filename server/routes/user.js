const express = require('express')
const Router = express.Router()
//加密
const utils = require('utility')
const model = require('../model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
//不想传pwd和__v
const _filter = {'pwd':0,'__v':0}
// Chat.remove({},function(e,d){})
Router.get('/ss',function(req,res){
  return 'jjjj'
})
//查询信息列表
Router.get('/list',function(req,res){
  const {type} = req.query
  console.log('aa')
  User.find({type},function(e,d){
    return res.json({code:0,data:d})
  })
})
//完善个人信息
Router.post('/update',function(req,res){
  const userid = req.cookies.userid
  if(!userid){
    return res.json({code:1,msg:'cookie已过期，请重新登录'})
  }
  const body = req.body
  User.findByIdAndUpdate(userid,body,function(e,d){
    const data = Object.assign({},{
      user:d.user,
      type:d.type
    },body)
    return res.json({code:0,data})
  })
})
//登录
Router.post('/login',function(req,res){
  console.log(req.body)
  let {user,pwd} = req.body
  User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
    if(!doc){
      return res.json({code:1,msg:'用户名或密码错误'})
    }
    //设置cookie
    res.cookie('userid',doc._id)
    return res.json({code:0,data:doc})
  })
})
//注册
Router.post('/register',function(req,res){
  console.log(req.body)
  let {user,pwd,type} = req.body
  User.findOne({user},function(err,doc){
    if(doc){
      return res.json({code:1,msg:'用户名重复'})
    }
    const userModel = new User({user,type,pwd:md5Pwd(pwd)})
    userModel.save(function(e,d){
      if(e){
        return res.json({code:1,msg:'后端出错了'})
      }
      const {user, type, _id}=d
      res.cookie('userid',_id)
      return res.json({code:0,data:{user,type,_id}})
    })
    // create不会产生_id需要save方法
    // User.create({user,pwd:md5Pwd(pwd),type},function(e,d){
    //   if(e){
    //     return res.json({code:1,msg:'后端出错了'})
    //   }else{
    //     return res.json({code:0})
    //   }
    // })
  })
})
//查看个人信息（是否登陆）
Router.get('/info',function(req,res){
  const {userid} = req.cookies
  if(!userid){
    return res.json({code:1})
  }
  User.findOne({_id:userid},_filter,function(e,d){
    if(e){
      return res.json({code:1,msg:'服务器出错了'})
    }
    if(d){
      return res.json({code:0,data:d})
    }
  })
})
//查询聊天信息(是否要user)
Router.get('/getmsglist',function(req,res){
  const user = req.cookies.userid
  User.find({_id:user},function(e,userd){
    let users = {}
    userd.forEach(v=>{
      users = {name:v.user,avatar:v.avatar}
    })
    Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
      if(!err){
        return res.json({code:0,msgs:doc,users:users})
      }
    })
  })
})
//修改未读消息
Router.post('/readmsg',function(req,res){
  const userid = req.cookies.userid
  const {from} = req.body
  Chat.update(
    {from,to:userid},
    {'$set':{read:true}},
    //修改所有
    {'multi':true},
    function(e,d){
      if(!e){
        return res.json({code:0,num:d.nModified})
      }else{
        return res.json({code:1,msg:'修改失败'})
      }
    }
  )
})


//终极加密
function md5Pwd(pwd){
  const salt = 'shinemax_is_good_9527@&*%$#@!'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router