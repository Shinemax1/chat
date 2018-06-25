import React from 'react'
import {List,InputItem,NavBar,Icon,Grid,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'
//因为跨域了 所以需要直接连
import io from 'socket.io-client'
//const socket = io('ws://localhost:9093')
@connect(
  state=>state,
  {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {text:'',msg:[],showEmoji:false}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(){
    //注册监听全局的socket
    // socket.on('recvmsg',(data)=>{
    //   this.setState({
    //     msg:[...this.state.msg,data.text]
    //   })
    // })
    // if (!this.props.chat.chatmsg.length) {
		// 	this.props.getMsgList()
    // }
    // if(!this.props.chat.users.name){
    //   console.log('recv2')
		// 	this.props.recvMsg()      
    // }
  }
  componentWillUnmount(){
    this.props.readMsg(this.props.match.params.user)
  }
  fixCarousel(){
    //为了解决antdesign的bug，官方提供的
    setTimeout(function(){ 
      window.dispatchEvent(new Event('resize')) 
    },0)
  }
  handleSubmit(){
    // socket.emit('sendmsg',this.state)
    // this.setState({text:''})
    // console.log(this.state)
    let from = this.props.user._id
    let to = this.props.match.params.user
    let msg = this.state.text
    if(msg==''){
      Toast.info('请填写后再发送',3)
    }else{
      this.props.sendMsg({from,to,msg})
      this.setState({text:'',showEmoji:false})
    }
  }
  render(){
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
    const {user,avatar} = this.props.location.query || {}
    console.log(this.props.chat.chatmsg)
    return (
      <div id='chat-page'>
        <div className='stick-content' onClick={()=>{
              this.setState({
                showEmoji:false
              })
            }}>
          {/* <QueueAnim delay={300}> */}
            {this.props.chat.chatmsg.map(v=>(
              v.from==this.props.match.params.user||v.to==this.props.match.params.user?(
                v.from==this.props.match.params.user?(
                <List key={v._id}>
                  <List.Item thumb={require(`../img/${avatar}.png`)}>{v.content}</List.Item>
                </List>
              ):(
                <List key={v._id}>
                  <List.Item extra={<img src={require(`../img/${this.props.user.avatar}.png`)}/>} className='chat-me'>{v.content}</List.Item>
                </List>
              )):null
            ))}
          {/* </QueueAnim> */}
        </div>
        <NavBar
          className='stick-header'
          mode='dark'
          icon={<Icon type="left"/>}
          onLeftClick={()=>{
            this.props.history.goBack()
          }}
        >
          {user}
        </NavBar>
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={
                <div>
                  <span style={{marginRight:15}} onClick={()=>{
                    this.setState({
                      showEmoji:!this.state.showEmoji
                    })
                    this.fixCarousel()
                  }}>😀</span>
                  <span onMouseDown={this.handleSubmit}>发送</span>
                </div>
              }
            ></InputItem>
          </List>
          {this.state.showEmoji?<Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el=>{
              this.setState({text:this.state.text+el.text})
            }}
          ></Grid>:null}
        </div>
      </div>
    )
  }
}

export default Chat