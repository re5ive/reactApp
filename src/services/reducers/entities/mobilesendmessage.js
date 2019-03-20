import {
    GET_SENDMOBILEMESSAGE_STARTED,
    GET_SENDMOBILESMESSAGE_SUCCESS,
    GET_SENDMOBILESMESSAGE_FAILED,
    //SAVE_PROFILE_SUCCESS,
    SAVE_SENDMOBILEMESSAGE_FAILED,
    UPDATE_SENDMOBILEMESSAGE_SUCCESS,
    DELETE_SENDMOBILEMESSAGE_SUCCESS} from '../../common/actionTypes'

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
        case GET_SENDMOBILEMESSAGE_STARTED:
          //  return {...state, isFetching: true, error: false, data: []}
            return {...state, isFetching: true, error: false}
        case GET_SENDMOBILESMESSAGE_SUCCESS:
            return {...state, isFetching: false, dataLoaded: true, data: action.messages}
        case GET_SENDMOBILESMESSAGE_FAILED:
            return {...state, isFetching: false, error: true}
        case UPDATE_SENDMOBILEMESSAGE_SUCCESS:
            return {...state, isFetching: false, readOnly: true, data: action.messages}
        case SAVE_SENDMOBILEMESSAGE_FAILED:
            return {...state, error: true, readOnly: true}
        case DELETE_SENDMOBILEMESSAGE_SUCCESS:
            const messageid = action.message
            let _sendmessages = []
            if (state.data) {
                _sendmessages = state.data.filter(pfl => pfl.directId !== messageid)
            }
            return {...state, isFetching: false, data: _sendmessages,readOnly: true}
        default:
            return state
    }
}