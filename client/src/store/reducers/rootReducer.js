import authReducer from './authReducer'
import alertReducer from './alertReducer'
import { combineReducers } from 'redux'

const RootReducer = combineReducers({
    auth:authReducer,
    alert: alertReducer,
})

export default RootReducer;