import { GET_LOAD_DETAILS_START, GET_LOAD_DETAILS_SUCCESS, GET_LOAD_CONNECTION_START, GET_LOAD_CONNECTION_SUCCESS  } from "../../common/actionTypes";

const initialState = {
    Load_ConnectionData: [],
    Load_DetailsData: [],
    fullLoad: false
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_LOAD_DETAILS_START:
            return { ...state, Load_DetailsData: [], fullLoad: true }
        case GET_LOAD_DETAILS_SUCCESS:
            return { ...state, Load_DetailsData: action.Load_DetailsData, fullLoad: true }
        case GET_LOAD_CONNECTION_START:
            return { ...state, Load_ConnectionData: [], fullLoad: true }
        case GET_LOAD_CONNECTION_SUCCESS:
            return { ...state, Load_ConnectionData: action.Load_ConnectionData, fullLoad: true }
        default:
            return { ...state }
    }

}
