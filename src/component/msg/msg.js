import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
@connect(
  state=>state
)
class Msg extends React.Component{
  //按照聊天用户分组，根据chatid
  render(){
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = a[a.length-1].create_time
      const b_last = b[b.length-1].create_time
      return b_last - a_last
    })
    return (
      <div>
        <List>
          {chatList.map(v=>{
            const targetId = v[v.length-1].from==this.props.user._id?v[v.length-1].to:v[v.length-1].from
            //聊天另外一个人的用户信息
            const user = this.props.chatuser.userlist.length?this.props.chatuser.userlist.filter(v=>(
              targetId == v._id
            ))[0]:''
            const unreadNum = v.filter(v=>!v.read&&v.to==this.props.user._id).length
            return (
            <List.Item 
              key={v[v.length-1].chatid}
              thumb={require(`../img/${user.avatar}.png`)}
              extra={<Badge text={unreadNum} style={{marginBottom:4}}></Badge>}
              arrow='horizontal'
              onClick={()=>{
                let path={
                  pathname:`/chat/${targetId}`,
                  query: {...v[v.length-1],...user}
                }
                //因为聊天需要录入用户id
                this.props.history.push(path)
              }}
            >
              {v[v.length-1].content}
              <List.Item.Brief>{user.user}</List.Item.Brief>  
            </List.Item>
            )
          })}
        </List>
      </div>
    )
  }
}

export default Msg