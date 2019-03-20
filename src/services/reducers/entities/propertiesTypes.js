import {
    GET_PROPTYPES_STARTED,
    GET_PROPTYPES_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_PROPTYPES_STARTED:
            return {...state, isFetching: true}
        case GET_PROPTYPES_SUCCESS:
            return { ...state, isFetching: false, data: action.propsTypes }
        default:
            return state
    }
}