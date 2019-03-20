import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    data: [],
    isConnected: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case ADD_NOTIFICATION:
            let _data = state.data.slice(0)
            _data.push(action.notification)
            return {...state, data: _data, isConnected: true}
        case CLEAR_NOTIFICATIONS:
            return initialState
        default:
            return state;
    }
}