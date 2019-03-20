import {
    GET_MOBILE_STARTED,
    GET_MOBILES_SUCCESS,
    GET_MOBILES_FAILED,
    //SAVE_PROFILE_SUCCESS,
    SAVE_MOBILE_FAILED,
    UPDATE_MOBILE_SUCCESS,
    DELETE_MOBILE_SUCCESS} from '../../common/actionTypes'

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
        case GET_MOBILE_STARTED:
           // return {...state, isFetching: true, error: false, data: []}
            return {...state, isFetching: true, error: false}
        case GET_MOBILES_SUCCESS:
            return {...state, isFetching: false, dataLoaded: true, data: action.topics}
        case GET_MOBILES_FAILED:
            return {...state, isFetching: false, error: true}
        case UPDATE_MOBILE_SUCCESS:
            return {...state, isFetching: false, readOnly: true, data: action.topics}
        case SAVE_MOBILE_FAILED:
            return {...state, error: true, readOnly: true}
        case DELETE_MOBILE_SUCCESS:
            const topicId = action.topicId
            let _topics = []
            if (state.data) {
                _topics = state.data.filter(pfl => pfl.id !== topicId)
            }
            return {...state, isFetching: false, data: _topics,readOnly: true}
        default:
            return state
    }
}