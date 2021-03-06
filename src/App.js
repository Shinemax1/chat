import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
// import 'antd-mobile/dist/antd-mobile.css'
class App extends React.Component{

  render(){
    return (
      <div>
        {/* 此组件是用来每次跳转都会访问一遍是否登录 */}
        <AuthRoute/>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>            
          <Route path='/geniusinfo' component={GeniusInfo}></Route>            
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    )
  }
}

// class Cxf extends React.Component{
//   constructor(props){
//     super(props)
//     console.log(props);
//   }
//   render(){
//     return (
//       <h2>{this.props.name} sjq</h2>
//     )
//   }
// }

export default App;
