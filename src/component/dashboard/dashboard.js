import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {Switch,Route} from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
import Msg from '../msg/msg'
import QueueAnim from 'rc-queue-anim'
@connect(
  state=>state,
  {getMsgList,recvMsg}
)
class Dashboard extends React.Component{
  constructor(props){
    super(props)
    //console.log(0)
  }
  componentDidMount() {
    //console.log(1)   
    if (!this.props.chat.chatmsg.length || this.props.chat.users.name != this.props.user.user) {
			this.props.getMsgList()
    }
    if(!this.props.chat.users.name){
      console.log('recv')
			this.props.recvMsg()      
    }
  }
  // componentWillMount() {
  //   console.log(2)
  // }
  // componentWillUpdate() {
  //   console.log(3)
  // }
  // componentDidUpdate() {
  //   console.log(4)
  // }
  render(){
    //console.log(11)
    const {pathname} = this.props.location
    const user = this.props.user    
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon:'boss',
        title:'牛人列表',
        component:Boss,
        hide:user.type=='genius'
      },
      {
        path:'/genius',
        text:'boss',
        icon:'job',
        title:'BOSS列表',
        component:Genius,
        hide:user.type=='boss'
      }, 
      {
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        component:Msg
      },
      {
        path:'/me',
        text:'我',
        icon:'user',
        title:'个人中心',
        component:User
      }
    ]
    const page = navList.find(v=>v.path==pathname)
    return page?(
      <div>
        
        <NavBar className='fixed-header' mode='dard'>{page.title}</NavBar>
        <div style={{marginTop:45,marginBottom:50}}>
          <QueueAnim type='scaleX' duration={800}>
            <Route key={page.path} path={page.path} component={page.component}></Route>
            {/* <Switch>
              {navList.map(v=>(
                
              ))}
            </Switch> */}
          </QueueAnim>
        <NavLinkBar data={navList}></NavLinkBar>
          
        </div>

      </div>
    ):null
  }
}

export default Dashboard