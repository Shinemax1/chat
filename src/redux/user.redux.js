import axios from 'axios'
import {getRedirectPath} from '../util'
const AUTH_SUCCESS= 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT= 'LOGOUT'
const initState = {
  redirectTo:'',
  msg:'',
  user:'',
  type:''
}
//reducer
export function user(state=initState, action){
  switch(action.type){
    case AUTH_SUCCESS:
      return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
    case LOAD_DATA:
      return {...state,redirectTo:getRedirectPath(action.payload),...action.payload}
    case LOGOUT:
      return {...initState,redirectTo:'/login'}
    case ERROR_MSG:
      return {...state,msg:action.msg}
    default:
      return state
  }
}

export function logoutSubmit(){
  return {type: LOGOUT}
}

export function login({user,pwd}){
  if(!user||!pwd){
    return errorMsg('用户名密码必须输入')
  }else{
    return dispatch=>{
      axios.post('/user/login',{user,pwd})
        .then(res=>{
          if(res.status==200&&res.data.code===0){
            dispatch(authSuccess(res.data.data))
          }else{
            dispatch(errorMsg(res.data.msg))
          }
        })
    }
  }
}

export function register({user,pwd,type,repeatpwd}){
  if(!user||!pwd||!type){
    return errorMsg('用户名密码必须输入')
  }else if(pwd!==repeatpwd){
    return errorMsg('密码和确认密码不同')
  }
  return dispatch=>{
    axios.post('/user/register',{user,pwd,type})
      .then(res=>{
        if(res.status==200&&res.data.code===0){
          dispatch(authSuccess(res.data.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function update(data,type){
  console.log(type)
  let {title,money,desc,company,avatar} = data
  if(!title||!money||!desc||!company||!avatar){
    if(type=='/geniusinfo'){
      if(!title||!desc){
        return errorMsg('请牛人输入完整')
      }
    }else{
      return errorMsg('请BOSS输入完整')
    }
  } 
  return dispatch=>{
    axios.post('/user/update',data)
      .then(res=>{
        if(res.status==200&&res.data.code===0){
          dispatch(authSuccess(res.data.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function loadData(data){
  return {type:LOAD_DATA,payload:data}
}

function authSuccess(data){
  return {type:AUTH_SUCCESS,payload:data}
}

function errorMsg(msg){
  return {msg,type:ERROR_MSG}
}



