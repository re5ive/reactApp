import {
    GET_LDAP_USERS_STARTED,
    GET_LDAP_USERS_SUCCESS,
    GET_LDAP_USERS_FAILED,
    SAVE_LDAP_USER_SUCCESS,
    // DELETE_USER_SUCCESS
} from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    data: [],
    isFetching: false,
    dataLoaded: false,
    error: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_LDAP_USERS_STARTED:
            return {...state, isFetching: true, data: []}
        case GET_LDAP_USERS_SUCCESS:
            return {...state, isFetching: false,dataLoaded: true, data: action.users};
        case SAVE_LDAP_USER_SUCCESS:
            let users = state.data.slice(0)
            let updated = false
            users = users.map(user => {
                if (user.username === action.user.username) {
                    updated =true
                    return action.user
                } else {
                    return user
                }
            })
            if (!updated) {
                users.push(action.user)
            }
            return { ...state, isFetching: false, data: users }
        case GET_LDAP_USERS_FAILED:
            return {...state, isFetching: false, error: true};
        default:
            return state;
    }
}