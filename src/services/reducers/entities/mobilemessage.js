import {
    GET_MOBILEMESSAGE_STARTED,
    GET_MOBILESMESSAGE_SUCCESS,
    GET_MOBILESMESSAGE_FAILED,
    //SAVE_PROFILE_SUCCESS,
    SAVE_MOBILEMESSAGE_FAILED,
    UPDATE_MOBILEMESSAGE_SUCCESS,
    DELETE_MOBILEMESSAGE_SUCCESS,
    GET_MOBILEMESSAGE_SEVERITY} from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    data: [],
    severity: [],
    isFetching: false,
    dataLoaded: false,
    readOnly: true,
    error: false,
    categId : 0,
    topicCode: 0
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_MOBILEMESSAGE_STARTED:
           // return {...state, isFetching: true, error: false, data: []}
            return {...state, isFetching: true, error: false}
        case GET_MOBILESMESSAGE_SUCCESS:
            return {...state, isFetching: false, dataLoaded: true, data: action.messages}
        case GET_MOBILESMESSAGE_FAILED:
            return {...state, isFetching: false, error: true}
        case UPDATE_MOBILEMESSAGE_SUCCESS:
            return {...state, isFetching: false, readOnly: true, data: action.messages}
        case SAVE_MOBILEMESSAGE_FAILED:
            return {...state, error: true, readOnly: true}
        case GET_MOBILEMESSAGE_SEVERITY:
            return {...state, severity: action.severity}
        case DELETE_MOBILEMESSAGE_SUCCESS:
            const deleteid = action.deleteid
            let _messages = []
            if (state.data) {
                _messages = state.data.filter(pfl => pfl.id !== deleteid)
            }
            return {...state, isFetching: false, data: _messages,readOnly: true}
        default:
            return state
    }
}