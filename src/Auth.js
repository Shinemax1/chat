import React from 'react'
import {connect} from 'react-redux'
import {login,getUserData} from './Auth.redux'
import {Redirect} from 'react-router-dom'
import {Button} from 'antd-mobile'
import axios from 'axios'

//两个reducers 每个reducers都有一个state
// 合并reducers
@connect(
    state=>state.auth,
    {login,getUserData}
)
class Auth extends React.Component{
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         data:{}
    //     }   
    // }     
    componentDidMount(){
        this.props.getUserData();
    }
    render(){
        return (
            <div>
                <h2>我的名字是{this.props.user},年龄{this.props.age}</h2>
                {this.props.isAuth?<Redirect to='/dashboard' />:null}
                <h2>您没有权限，需要登录才能看</h2>
                <Button  onClick={this.props.login}>登录</Button>
            </div>
        )

        
    }
}

export default Auth