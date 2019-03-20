import {
    GET_PROVIDER_PRIORITYS_STARTED,
    GET_PROVIDER_PRIORITYS_SUCCESS,
    GET_PROVIDER_PRIORITY_FAILED,
    DELETE_PROVIDER_PRIORITY_SUCCESS,
    SAVE_PROVIDER_PRIORITY_SUCCESS,
    GET_PROVIDER_DATA_ELEMENTS_STARTED,
    GET_PROVIDER_DATA_ELEMENTS_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
    dataLoaded: false,
    dataElements:[]
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_PROVIDER_PRIORITYS_STARTED:
            return { ...state, isFetching: true, data: [] }
        case GET_PROVIDER_PRIORITYS_SUCCESS:
            return {
                ...state, isFetching: false, data: action.providerPrioritys, dataLoaded: true }
        case GET_PROVIDER_PRIORITY_FAILED:
            return { ...state, isFetching: false, error: true }
        case GET_PROVIDER_DATA_ELEMENTS_STARTED:
            return { ...state, dataElements: [] }
        case GET_PROVIDER_DATA_ELEMENTS_SUCCESS:
            return { ...state, dataElements: action.dataElements }
        case SAVE_PROVIDER_PRIORITY_SUCCESS:
            let providerPrioritys = state.data.slice(0)
            let updated = false
            providerPrioritys = providerPrioritys.map(providerPriority => {
                if (providerPriority.id === action.providerPriority.id) {
                    updated =true
                    return action.providerPriority
                } else {
                    return providerPriority
                }
            })
            if (!updated) {
                providerPrioritys.push(action.providerPriority)
            }
            return { ...state, isFetching: false, data: providerPrioritys }
        case DELETE_PROVIDER_PRIORITY_SUCCESS:
            const _providerPrioritys = state.data.filter(providerPriority => providerPriority.id !== action.id)
            return { ...state, isFetching: false, data: _providerPrioritys, deleted: true }
        default:
            return state;
    }
}