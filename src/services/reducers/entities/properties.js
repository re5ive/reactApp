import {
    GET_PROPS_STARTED,
    GET_PROPS_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_PROPS_STARTED:
            return {...state, isFetching: true}
        case GET_PROPS_SUCCESS:
            return { ...state, isFetching: false, data: action.props }
        default:
            return state
    }
}