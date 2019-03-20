import { GET_TEMPLATES_STARTED, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILED } from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    templates: [],
    isFetching: false,
    error: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_TEMPLATES_STARTED:
            return {...state, isFetching: true}
        case GET_TEMPLATES_SUCCESS:
            return {...state, isFetching: false, data: action.templates};
        case GET_TEMPLATES_FAILED:
            return {...state, isFetching: false, error: true};
        default:
            return state;
    }
}




