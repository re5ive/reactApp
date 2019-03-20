import {
    GET_PROVIDER_SOURCES_STARTED,
    GET_PROVIDER_SOURCES_SUCCESS,
    GET_PROVIDER_SOURCE_FAILED,
    DELETE_PROVIDER_SOURCE_SUCCESS,
    SAVE_PROVIDER_SOURCE_SUCCESS,
    GET_PROVIDER_DATA_ELEMENTS_STARTED,
    GET_PROVIDER_DATA_ELEMENTS_SUCCESS,
    GET_ALL_PROVIDER_NAMES_STARTED,
    GET_ALL_PROVIDER_NAMES_SUCCESS

} from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
    dataLoaded: false,
    dataElements: [],
    providerNames:[]
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_PROVIDER_SOURCES_STARTED:
            return { ...state, isFetching: true, data: [] }
        case GET_PROVIDER_SOURCES_SUCCESS:
            return {
                ...state, isFetching: false, data: action.providerSources, dataLoaded: true
            }
        case GET_ALL_PROVIDER_NAMES_STARTED:
            return { ...state, providerNames: [] }
        case GET_ALL_PROVIDER_NAMES_SUCCESS:
            return { ...state, providerNames: action.providerNames }
        case GET_PROVIDER_SOURCE_FAILED:
            return { ...state, isFetching: false, error: true }
        case GET_PROVIDER_DATA_ELEMENTS_STARTED:
            return { ...state, dataElements: [] }
        case GET_PROVIDER_DATA_ELEMENTS_SUCCESS:
            return { ...state, dataElements: action.dataElements }
        case SAVE_PROVIDER_SOURCE_SUCCESS:
            let providerSources = state.data.slice(0)
            let updated = false
            providerSources = providerSources.map(providerSource => {
                if (providerSource.id === action.providerSource.id) {
                    updated =true
                    return action.providerSource
                } else {
                    return providerSource
                }
            })
            if (!updated) {
                providerSources.push(action.providerSource)
            }
            return { ...state, isFetching: false, data: providerSources }
        case DELETE_PROVIDER_SOURCE_SUCCESS:
            const _providerSources = state.data.filter(providerSource => providerSource.id !== action.id)
            return { ...state, isFetching: false, data: _providerSources, deleted: true }
        default:
            return state;
    }
}