import {
    GET_ACTIVITIES_STARTED,
    GET_ACTIVITIES_SUCCESS,
    GET_ACTIVITIES_FAILED,
    ACTIVITIES_PUSH_SUBSCRIBED,
    GET_ACTIVITIES_RESET,
    PUSH_FLIGHT_ACTIVITIES
} from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    data: null,
    isFetching: false,
    pushSubscribed: false,
    error: false,
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_ACTIVITIES_STARTED:
            return {...state, isFetching: true}
        case GET_ACTIVITIES_SUCCESS:
            return { ...state, isFetching: false, data: action.flightActivities }
        case PUSH_FLIGHT_ACTIVITIES:
            if (state.pushSubscribed) {
                return {...state, data: action.flightActivities }
            }
            return {...state}
        case ACTIVITIES_PUSH_SUBSCRIBED:
            return {...state, pushSubscribed: action.status}
        case GET_ACTIVITIES_FAILED:
            return {...state, isFetching: false, error: true}
        case GET_ACTIVITIES_RESET:
            return {...initialState}
        default:
            return state

    }
}