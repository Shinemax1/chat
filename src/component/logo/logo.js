import React from 'react'
import './logo.css'
class Logo extends React.Component{

  render(){
    return (
      <div className='logo-container'>
        <img src={require('./job.png')} alt="" width='100%'/>
      </div>
    )
  }
}

export default Logo