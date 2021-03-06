import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import Redirect from 'react-router-dom/Redirect';
@connect(
  state=>state.user,
  {update}
)
class BossInfo extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title:'',
      company:'',
      money:'',
      desc:'',

    }
    this.selectAvatar = this.selectAvatar.bind(this)
  }
  onChange(key,val){
    this.setState({
      [key]:val
    })
  }
  selectAvatar(imgname){
    this.setState({
      avatar: imgname
    })
  }
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
        <AvatarSelector
          selectAvatar={this.selectAvatar}
        />
        <InputItem onChange={(v)=>this.onChange('title',v)}>招聘职位</InputItem>
        <InputItem onChange={(v)=>this.onChange('company',v)}>公司名称</InputItem>
        <InputItem onChange={(v)=>this.onChange('money',v)}>职位薪资</InputItem>
        <TextareaItem onChange={(v)=>this.onChange('desc',v)} rows={3} autoHeight title="职位简介"></TextareaItem>
        <Button type="primary" onClick={()=>{
          this.props.update(this.state,path)
        }}>保存</Button>
      </div>
    )
  }
}

export default BossInfo