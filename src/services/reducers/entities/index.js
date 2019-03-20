import { combineReducers } from 'redux'

import UserReducer from './users'

const entitiesReducer = combineReducers({
    users: UserReducer
})

export default entitiesReducer
