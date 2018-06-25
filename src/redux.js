import React from 'react'
import {Button} from 'antd-mobile'
import { connect } from 'react-redux'
import {counter,addGUN,removeGUN,addGUNAsync} from './index.redux';

//装饰器方法 类比
@connect(
    // 你要state什么属性放到props里
    state=>({num:state.counter}),
    // 你要什么方法，放到props里，自动dispatch
    {addGUN,removeGUN,addGUNAsync}
)
class App extends React.Component{
    render(){
        // const store = this.props.store
        // const num = store.getState()
        // const num = this.props.num
        // const addGUN = this.props.addGUN
        // const addGUNAsync = this.props.addGUNAsync
        // const removeGUN = this.props.removeGUN
        
        return (
            <div>
                <h1>现在有机枪{this.props.num}把</h1>
                <Button type="primary" onClick={this.props.addGUN}>申请武器</Button>
                <Button type="primary" onClick={this.props.removeGUN}>上交武器</Button>
                <Button type="primary" onClick={this.props.addGUNAsync}>拖两天再给武器</Button>
            </div>
        )
    }
}
// const mapStatetoProps = (state) => {
//     return {num:state}
// }
// const actionCreators = {addGUN,removeGUN,addGUNAsync}
// App = connect(mapStatetoProps, actionCreators)(App);
export default App