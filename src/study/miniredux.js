export function createStore(reducer){
  const currentState = {}
  const currentListeners = []
  function getState(){
    return currentState
  }
  function subscribe(listener){
    currentListeners.push(listener)
  }
  function dispatch(action){
    currentState=reducer(currentState,action)
    currentListeners.forEach(v=>v())
    return action
  }
  dispatch({type:'@cxf@sjq'})
  return {getState,subscribe,dispatch}
}

const bindActionCreator = (creator,dispatch)=>(...args)=>(dispatch(creator(...args)))

export function bindActionCreators(creators,dispatch){
  // const bound = {}
  // Object.keys(creators).forEach(v=>{
  //   bound[v] = bindActionCreator(creators[v],dispatch)
  // })
  // return bound
  return Object.keys(creators).reduce((ret,item)=>{
    ret[item] = bindActionCreator(creators[item],dispatch)
  },{})
}