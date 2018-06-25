import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Redux from './redux';
import Test from './Test';
import Auth from './Auth';
import DashBoard from './Dashboard';
import registerServiceWorker from './registerServiceWorker';
// import {counter,addGUN,removeGUN,addGUNAsync} from './index.redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {BrowserRouter,Route,Link,Redirect,Switch} from 'react-router-dom';
import './config'

import {
    createStore,
    applyMiddleware,
    //组合函数用的
    compose
} from 'redux';
// 通过reducer建立
// 根据老的state和action 生成新的state
// function counter(state = 0, action) {
//     switch (action.type) {
//         case '加机关枪':
//             return state + 1
//         case '加机关枪':
//             return state - 1
//         default:
//             return 10
//     }
// }

//1.新建store
//const store = createStore(counter,applyMiddleware(thunk))
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    //chrom的redux调试工具如果存在就启用
    window.devToolsExtension?window.devToolsExtension():f=>f
))
//console.log(store.getState())
// const init = store.getState()
// console.log(init)
//生成监听
// function listener(){
//     const current = store.getState()
//     console.log(`现在有机关枪${current}把`)
// }
//订阅监听
//store.subscribe(listener)

// 派发事件 传递action
// store.dispatch({type:'加机关枪'})
// store.dispatch({type:'加机关枪'})
// store.dispatch({type:'减机关枪'})

// function render(){
//     ReactDOM.render(<Redux store={store} addGUN={addGUN} removeGUN={removeGUN} addGUNAsync={addGUNAsync}/>, document.getElementById('root'));
// }
// render();
//观察整个dom 一旦发生改变 重新渲染dom
//store.subscribe(render);


//React-redux
//1.Provider组件在应用最外层，传入store即可，只用一次
//2.Connect负责从外部获取组件需要的参数
//3.Connect可以用装饰器的方式来写

// function Boss(){
//   return <p>11</p>
// }

ReactDOM.hydrate(
    (<Provider store={store}>
        <BrowserRouter>
            <App></App>
            {/* <Switch>
                <Route path='/login' component={Auth}></Route>
                <Route path='/dashboard' component={DashBoard}></Route>
                <Redirect to='/dashboard'></Redirect>                                  
            </Switch> */}
            {/* <Switch>
                Switch只渲染命中的第一个Route
                exact完全匹配路由
                <Route path='/' exact component={Redux}></Route>
                <Route path='/erying' component={Erying}></Route>
                <Route path='/qibinglian' component={Qibinglian}></Route>
                <Route path='/:location' component={Test}></Route>                                    
            </Switch> */}
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)

registerServiceWorker();

