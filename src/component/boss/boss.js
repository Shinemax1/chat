import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
@connect(
  state=>state.chatuser,
  {getUserList}
)
class Boss extends React.Component{
  constructor(props){
    super(props)
    //console.log(10)
  }
  componentDidMount() {
    this.props.getUserList('genius')
    //console.log(5)    
  }
  // componentWillMount() {
  //   console.log(6)
  // }
  // componentWillUpdate() {
  //   console.log(7)
  // }
  // componentDidUpdate() {
  //   console.log(8)
  // }
  render(){
    //console.log(9)
    return (
      <UserCard userlist={this.props.userlist}></UserCard>
    )
  }
}

export default Boss