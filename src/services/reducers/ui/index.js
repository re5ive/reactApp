
import { combineReducers } from 'redux'

import UserPageReducer from './UserPage'


const uiReducer = combineReducers({
    userPage: UserPageReducer
})

export default uiReducer
