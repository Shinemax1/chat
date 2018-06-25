import React from 'react'
import {WingBlank,Card,WhiteSpace} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
@withRouter
class UserCard extends React.Component{
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  handleClick(v){
    let path={
      pathname:`/chat/${v._id}`,
      query: v
    }
    //因为聊天需要录入用户id
    this.props.history.push(path)
  }
  render(){
    return (
      <WingBlank>
        
        {this.props.userlist?this.props.userlist.map(v=>(
          v.avatar?(
          <div key={v._id}>
            <WhiteSpace></WhiteSpace>
            <Card key={v._id} onClick={()=>this.handleClick(v)}>
              <Card.Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              />
              <Card.Body>
                {v.type=='boss'?<div>公司:{v.company}</div>:null}              
                {v.desc.split('\n').map(v=>(
                  <div key={v}>{v}</div>
                ))}
                {v.type=='boss'?<div>薪资:{v.money}</div>:null}
              </Card.Body>
            </Card>
          </div>
          ):null
        )):null}   
      </WingBlank>
    )
  }
}

export default UserCard