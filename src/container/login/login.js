import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import imoocForm from '../../component/imooc-form/imooc-form'
// function WrapperHello(Comp){
//   class WrapComp extends Comp{
//     //反向继承
//     componentDidMount(){
//       console.log('高阶组件添加生命周期')
//     }
//     render(){
//       return <Comp></Comp>
//     }
//   }
//   //属性代理
//   // class WrapComp extends React.Component{
//   //   render(){
//   //       return  (
//   //         <div>
//   //           <p>这是HOC高阶组件特有的元素</p>
//   //           <Comp name='text' {...this.props}/>
//   //         </div>
//   //       )
//   //   }
//   // }
//   return WrapComp
// }
//@WrapperHello
@connect(
  state=>state.user,
  {login}
)
@imoocForm
class Login extends React.Component{
  constructor(props){
    super(props)
    console.log(this.props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register(){
     console.log(this.props)
     //只有路由组件才会有的方法
     this.props.history.push('./register')
  }
  handleLogin(){
    this.props.login(this.props.state)
  }
  render(){
    return (
      <div>
        {this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo}/>:null}        
        {/* <Logo></Logo> */}
        <img src={require('../../component/logo/job.png')} alt="" width='100%'/>        
        <WingBlank>
          <List>
            <WhiteSpace/>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}            
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
            <InputItem onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button tyep='primary' onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login