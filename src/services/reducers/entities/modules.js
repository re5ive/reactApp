import {
    GET_MODULES_STARTED,
    GET_MODULES_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_MODULES_STARTED:
            return {...state, isFetching: true}
        case GET_MODULES_SUCCESS:
            return { ...state, isFetching: false, data: action.modules }
        default:
            return state
    }
}