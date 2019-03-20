import {
    GET_AIRPORTS_SOURCES_STARTED,
    GET_AIRPORTS_SOURCES_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_AIRPORTS_SOURCES_STARTED:
            return {...state, isFetching: true}
        case GET_AIRPORTS_SOURCES_SUCCESS:
            return { ...state, isFetching: false, data: action.sources }
        default:
            return state
    }
}