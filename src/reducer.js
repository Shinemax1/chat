//合并所有reducer并且返回
import {combineReducers} from 'redux';
// import {counter} from './index.redux';
// import {auth} from './Auth.redux';
import {user} from './redux/user.redux';
import {chatuser} from './redux/chatuser.redux';
import {chat} from './redux/chat.redux';

export default combineReducers({user,chatuser,chat})