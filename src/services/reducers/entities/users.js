import {
	GET_USERS_STARTED,
	GET_USERS_SUCCESS,
	GET_USERS_FAILED,
	//SAVE_USER_SUCCESS,
	DELETE_USER_SUCCESS, UPDATE_USER_SUCCESS
} from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    data: [],
    isFetching: false,
    error: false,
    dataLoaded: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_USERS_STARTED:
            return {...state, isFetching: true, data: []}
        case GET_USERS_SUCCESS:
            return {...state, isFetching: false, dataLoaded: true, data: action.users};
        case GET_USERS_FAILED:
            return {...state, isFetching: false, error: true};
	    case UPDATE_USER_SUCCESS:
		    return {...state, isFetching: false, data: action.users}
        case DELETE_USER_SUCCESS:
            const username = action.username
            let _users = []
            if (state.data) {
                _users = state.data.filter(usr => usr.username !== username)
            }
            return {...state, isFetching: false, data: _users}
        default:
            return state;
    }
}
