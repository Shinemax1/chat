import React from 'react'
import Logo from '../../component/logo/logo'
import {List,Radio,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import imoocForm from '../../component/imooc-form/imooc-form'
import {register} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {register}
)
@imoocForm
class Register extends React.Component{
  constructor(props){ 
    super(props)
    this.register = this.register.bind(this)
    //因为只是涉及到登录，没必要拿来redux
    // this.state = {
    //   type: 'genius',//或BOSS
    //   user: '',
    //   pwd: '',
    //   repeatpwd: ''
    // }
    this.handleRegister = this.handleRegister.bind(this)
  }
  register(){
     console.log(this.props)
     this.props.history.push('./register')
  }
  componentDidMount(){
    this.props.handleChange('type','genius')
  }
  handleRegister(){
    this.props.register(this.props.state)
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {/* 注册成功之后跳转 */}
        {this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo}/>:null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <WhiteSpace/>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
            <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
            <InputItem type='password' onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <RadioItem checked={this.props.state.type=='genius'} onChange={v=>this.props.handleChange('type','genius')}>牛人</RadioItem>
            <RadioItem checked={this.props.state.type=='boss'} onChange={v=>this.props.handleChange('type','boss')}>BOSS</RadioItem>
          </List>
          <WhiteSpace/>
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register