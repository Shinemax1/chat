import 'babel-polyfill'
import express from 'express'
import React from 'react'
import {renderToString,renderToStaticMarkup,renderToNodeStream} from 'react-dom/server'

//引入css文件和js文件
import staticPath from '../build/asset-manifest.json'

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {StaticRouter} from 'react-router-dom'
import {
  createStore,
  applyMiddleware,
  //组合函数用的
  compose
} from 'redux';
//解决服务端渲染的图片问题 必须放在App之前
import csshook from 'css-modules-require-hook/preset'
//解决图片问题，需要require
import assethook from 'asset-require-hook'
assethook({
  extensions:['png'],
  limit: 10000
})
import App from '../src/App'
import reducers from '../src/reducer';


// import staticPath from './asset-manifest.json'



// const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path')



//新建app
const app = express()




// var webpack = require('webpack')
// var webpackDevMiddleware = require('webpack-dev-middleware')
// var webpackHotMiddleware = require('webpack-hot-middleware')
// var config = require('../config/webpack.config.dev')
// var compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath,
//   reload: true,
//   stats: { colors: true }
// }))
// app.use(webpackHotMiddleware(compiler,{
//   log: console.log
// }))



//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection',function(socket){
  socket.on('sendmsg',function(data){
    let {from,to,msg} = data
    let chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},function(e,d){
      io.emit('recvmsg',Object.assign({},d._doc))
    })
    // console.log(data)
    // //广播给全局
    // io.emit('recvmsg',data)
  })
})

// class App extends React.Component{
//   render(){
//     return(
//       <div>hhs</div>
//     )
//   }
// }
// //服务端渲染将jsx渲染成html
// console.log(renderToString(<App></App>))

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use(function(req,res,next){
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
    return next()
  }
  const store = createStore(reducers,compose(
    applyMiddleware(thunk)
  ))
  const obj = {
    '/msg':'聊天消息列表',
    '/me':'个人中心列表'
  }
  let context = {}
  res.write(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <meta name="description" content="${obj[req.url]}"/>
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
      <link rel="stylesheet" href="/${staticPath['main.css']}">
      <title>React App</title>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">`)
  const root = (<Provider store={store}>
                    <StaticRouter
                      location={req.url}
                      context={context}
                      >
                        <App></App>
                    </StaticRouter>
                </Provider>)
  const markupStream = renderToNodeStream(root)
  markupStream.pipe(res,{end:false})
  markupStream.on('end',()=>{
    res.write(`</div>
    <script src="/${staticPath['main.js']}"></script>
  </body>
</html>`)
    res.end()
  })
// const root = (<Provider store={store}>
//                   <StaticRouter
//                     location={req.url}
                    
//                     >
//                       <App></App>
//                   </StaticRouter>
//               </Provider>)
//   const markup = renderToString(root)
//   const pageHtml = `<!DOCTYPE html>
//   <html lang="en">
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//       <meta name="theme-color" content="#000000">
      
//       <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
//       <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
//       <link rel="stylesheet" href="/${staticPath['main.css']}">
//       <title>React App</title>
//     </head>
//     <body>
//       <noscript>
//         You need to enable JavaScript to run this app.
//       </noscript>
//       <div id="root">${markup}</div>
//       <script src="/${staticPath['main.js']}"></script>
//     </body>
//   </html>`
  // console.log(path.resolve('build/index.html'))
  // return res.sendFile(path.resolve('build/index.html'))
  // return res.send(pageHtml)
})
app.use('/',express.static(path.resolve('build')))

// app.get('/', function (req, res) {

// })

// app.get('/data', function (req, res) {
//     //{}是查询所有的
//     User.findOne({
//         user: 'imooc'
//     }, function (err, doc) {
//         res.json(doc)
//     })
// })

server.listen(8888, function () {
    console.log(__dirname)
  
    console.log('开启成功')
})