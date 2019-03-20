import { combineReducers } from 'redux'
import {routerReducer} from './route'
import EntitiesReducer from './entities'
import UIReducer from './ui'


const appReducer = combineReducers({
    entities: EntitiesReducer,
    ui: UIReducer,
    route: routerReducer
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer
