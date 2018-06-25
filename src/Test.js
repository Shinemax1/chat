import React from 'react';

class Test extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props)
        return <h2>测试组件{this.props.match.params.location}</h2>
    }
}

export default Test;