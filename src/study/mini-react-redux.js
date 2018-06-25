import React from 'react'
import PropTypes from 'prop-types'
import bindActionCreators from './miniredux'

export const connect = (mapStateToProps = state=>state,mapDispatchToProps = {})=>(WrapComponent)=>{
  return class ConnectComponent extends React.Component{
    static ContextTypes = {
      state = PropTypes.object
    }
    constructor(props,context){
      super(props,context)
      this.state = {
        props:{}
      }
    }
    componentDidMount(){
      const {store} = this.state
      //注册一个监听。每次一有变化就会启动update
      store.subscribe(this.update())      
      this.update()
    }
    update(){
      const {store} = this.state
      const stateProps = mapStateToProps(store.getState())
      //加工mapDispatchToProps，在他外面包一层dispatch
      const dispatchProps = bindActionCreators(mapDispatchToProps,store.dispatch)
      this.setState({
        props:{
          ...stateProps,
          ...this.state.props,
          ...dispatchProps
        }
      })
    }
    render(){
      return (
        //把state里的数据统统给传入的这个要加工的组件的props里
        <WrapComponent props={...this.state.props}/>
      )
    }
  }
}


export class Provider extends React.Component{
  static childContextTypes = {
    state = PropTypes.object
  }
  constructor(props,context){
    super(props,context)
    this.state = props.state
  }
  getChildContext(){
    return {state:this.state}
  }
  render(){
    return (
      this.props.children
    )
  }
}
