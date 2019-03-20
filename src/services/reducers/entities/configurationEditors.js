import { GET_CONFIGURATION_EDITORS_STARTED, GET_CONFIGURATION_EDITORS_SUCCESS, GET_CONFIGURATION_EDITOR_FAILED, SAVE_CONFIGURATION_EDITOR_SUCCESS, DELETE_CONFIGURATION_EDITOR_SUCCESS } from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
    dataLoaded: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_CONFIGURATION_EDITORS_STARTED:
            return { ...state, isFetching: true, data: [] }
        case GET_CONFIGURATION_EDITORS_SUCCESS:
            return {
                ...state, isFetching: false, data: action.configurationEditors, dataLoaded: true }
        case GET_CONFIGURATION_EDITOR_FAILED:
            return {...state, isFetching: false, error: true}
        case SAVE_CONFIGURATION_EDITOR_SUCCESS:
            let configurationEditors = state.data.slice(0)
            let updated = false
            configurationEditors = configurationEditors.map(configurationEditor => {
                if (configurationEditor.id === action.configurationEditor.id) {
                    updated =true
                    return action.configurationEditor
                } else {
                    return configurationEditor
                }
            })
            if (!updated) {
                configurationEditors.push(action.configurationEditor)
            }
            return { ...state, isFetching: false, data: configurationEditors }
        case DELETE_CONFIGURATION_EDITOR_SUCCESS:
            const _configurationEditors = state.data.filter(configurationEditor => configurationEditor.id !== action.classCode)
            return { ...state, isFetching: false, data: _configurationEditors, deleted: true }
        default:
            return state;
    }
}