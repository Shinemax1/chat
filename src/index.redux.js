const ADD_GUN = '加机关枪'
const REMOVE_GUN = '减机关枪'

//reducer 数据state真正改变的地方
export function counter(state = 10, action) {
    switch (action.type) {
        case '加机关枪':
            return state + 1
        case '减机关枪':
            return state - 1
        default:
            return state
    }
}

// action creator 通知reducer改变数据的地方 需要与store的dispatch绑定并触发reducer
export function addGUN(){
    return {type:ADD_GUN}
}

export function removeGUN(){
    return {type:REMOVE_GUN}
}

export function addGUNAsync(){
    //thunk插件的作用,这里可以返回函数
    return dispatch=>{
        console.log(dispatch);
        setTimeout(()=>{
            //异步结束后，手动执行dispatch
            dispatch(addGUN())
        },2000)
    }
}