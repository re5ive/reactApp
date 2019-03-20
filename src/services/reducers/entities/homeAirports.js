import {
    GET_HOME_AIRPORTS_STARTED,
    GET_HOME_AIRPORTS_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_HOME_AIRPORTS_STARTED:
            return {...state, isFetching: true}
        case GET_HOME_AIRPORTS_SUCCESS:
            return { ...state, isFetching: false, data: action.homeAirports }
        default:
            return state
    }
}