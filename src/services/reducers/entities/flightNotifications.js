import { GET_NOTIFICATIONS_STARTED, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAILED, ADD_FLIGHT_NOTIFICATION } from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    data: [],
    isFetching: false,
    error: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_NOTIFICATIONS_STARTED:
            return {...state, isFetching: true, data: []}
        case GET_NOTIFICATIONS_SUCCESS:
            return {...state, isFetching: false, data: action.notifications}
        case GET_NOTIFICATIONS_FAILED:
            return {...state, isFetching: false, error: true}
        case ADD_FLIGHT_NOTIFICATION:
            //action.flightNotification
            let data = state.data.slice(0)
            data.push(action.flightNotification)
            return {...state, data}
        default:
            return state;
    }
}