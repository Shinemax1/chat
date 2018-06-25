import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {getMsgList} from '../../redux/chat.redux'
import {Redirect} from 'react-router-dom'
@withRouter
@connect(
  state=>state,
  {loadData,getMsgList}
)
class AuthRoute extends React.Component{
  componentDidMount(){
    const publicList = ['/login','/register']
    if(publicList.indexOf(this.props.location.pathname)>-1){
      return
    }
    //获取用户信息
    axios.get('/user/info').
      then(res=>{
        if(res.status==200){
          if(res.data.code == 0){
            //有登录信息
            return this.props.loadData(res.data.data)
          }else{
            this.props.history.push('/login')
          }
        }
      }).then(res=>{
        if(this.props.user.user != this.props.chat.users.name){
          console.log('ssss')
          this.props.getMsgList()
        }
      })
    //是否登录
    //现在的url地址 login是不是需要跳转

    //用户的type 身份是boss还是牛人
    //用户是否完善信息（选择头像 个人简介）
  }
  render(){
    return (
      <div>
        {this.props.user.redirectTo?<Redirect to={this.props.user.redirectTo}/>:null}
      </div>
    )
  }
}

export default AuthRoute