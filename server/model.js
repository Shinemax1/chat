const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development'
//连接mongo 并且使用imooc这个表
const BASE_URL = env == 'development'?"mongodb://localhost:27017/imooc-chat":"mongodb://mongodb/imooc-chat";
// const BASE_URL = 'mongodb://localhost:27017/imooc-chat';
mongoose.connect(BASE_URL);
//监听是否连接成功
mongoose.connection.on("connected", function () {
    console.log('connect success');
});

const models = {
  user:{
    'user':{type:String, 'require':true},
    'pwd':{type:String, 'require':true},
    'type':{type:String, 'require':true},
    //头像
    'avatar':{type:String},
    //个人简介或者职位简介
    'desc':{type:String},
    //职位名
    'title':{type:String},
    //如果你是boss 还有两个字段
    'company':{type:String},
    'money':{type:String},
  },
  chat:{
    'chatid': {type:String,require:true},
    'from': {type:String,require:true},
    'to': {type:String,require:true},
    'read': {type:Boolean,default:false},
    'content': {type:String,require:true,default:''},
    'create_time': {type:Number,default:new Date().getTime()}
  }
}

for(let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel(name){
    return mongoose.model(name)
  }
}
//类似于mysql的表，mongo里有文档、字段的概念, 会自动添加一个集合，使用user的复数形式
// const User = mongoose.model('user', new mongoose.Schema({
//     user: {
//         type: String,
//         require: true
//     },
//     age: {
//         type: Number,
//         require: true
//     }
// }))
//新增数据
// User.create({
//     user:'imooc',
//     age:18
// },function(err,doc){
//     if(!err){
//         console.log(doc);
//     }else{
//         console.log(err);
//     }
// })
//删除数据
// User.remove({age:18},function(err,doc){
//     console.log(doc)
// })
//更新数据
// User.update({user:'imooc'},{$set:{age:18}},function(err,doc){
//     console.log(doc)
// })
