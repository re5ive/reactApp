import {
    GET_PROFILES_STARTED,
    GET_PROFILES_SUCCESS,
    GET_PROFILES_FAILED,
    //SAVE_PROFILE_SUCCESS,
    SAVE_PROFILE_FAILED,
    UPDATE_PROFILE_SUCCESS,
    DELETE_PROFILE_SUCCESS} from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    data: [],
    isFetching: false,
    dataLoaded: false,
    readOnly: true,
    error: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_PROFILES_STARTED:
            return {...state, isFetching: true, error: false, data: []}
        case GET_PROFILES_SUCCESS:
            return {...state, isFetching: false, dataLoaded: true, data: action.profiles}
        case GET_PROFILES_FAILED:
            return {...state, isFetching: false, error: true}
        case UPDATE_PROFILE_SUCCESS:
            return {...state, isFetching: false, readOnly: true, data: action.profiles}
        case SAVE_PROFILE_FAILED:
            return {...state, error: true, readOnly: true}
        case DELETE_PROFILE_SUCCESS:
            const profilename = action.profilename
            let _profiles = []
            if (state.data) {
                _profiles = state.data.filter(pfl => pfl.name !== profilename)
            }
            return {...state, isFetching: false, data: _profiles,readOnly: true}
        default:
            return state
    }
}