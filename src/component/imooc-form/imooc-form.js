import React from 'react'
//高阶组件
export default function imoocForm(Comp){
  return class WrapperComp extends React.Component{
    constructor(props){
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key,value){
      console.log(this.state)
      this.setState({
        [key]:value
      })
    }
    render(){
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}/>
    }
  }
}