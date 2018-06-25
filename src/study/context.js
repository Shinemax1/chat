import React from 'react'
import PropTypes from 'prop-types'


class PageSon extends React.Component{
  render(){
    return (
      <div>
        <PageGrandSon/>
      </div>
    )
  }
}

class PageGrandSon extends React.Component{
  static ContextType = {
    user:PropTypes.string
  }

  render(){
    return (
      <div>
        {this.context.user}
      </div>
    )
  }
}

class Page extends React.Component{
  static chileContextType = {
    user:PropTypes.string
  }
  constructor(props){
    super(props)
    this.state = {user:'cxf'}
  }
  getChildContext(){
    return this.state
  }
  render(){
    return (
      <div>
        {this.state.user}
        <PageSon/>
      </div>
    )
  }
}