import {
    GET_PROVIDER_SOURCES_STARTED, GET_PROVIDER_SOURCE_STARTED, GET_PROVIDER_SOURCE_SUCCESS,SELECTED_PROVIDER_SOURCE, ADD_PROVIDER_SOURCE, CANCEL_PROVIDER_SOURCE, DELETE_PROVIDER_SOURCE_SUCCESS, SAVE_PROVIDER_SOURCE_SUCCESS,
    SAVE_PROVIDER_SOURCE_FAILED, MAKE_PROVIDER_SOURCE_EDITABLE, SHOW_EDIT_WARNING_PROVIDER_SOURCE_STARTED, SHOW_EDIT_WARNING_PROVIDER_SOURCE_SUCCESS
    , SHOW_DELETE_WARNING_PROVIDER_SOURCE_STARTED, SHOW_DELETE_WARNING_PROVIDER_SOURCE_SUCCESS,
    DONT_SHOW_EDIT_WARNING_PROVIDER_SOURCE_SUCCESS} from '../../common/actionTypes'

const initialState = {
    selectedProviderSource: null,
    isNew: false,
    readOnly: true,
    isSelected: false,
    saveFinished: false,
    openEditWarning: false,
    openDeleteWarning: false,
    saveWithoutWarning: false
}
export default function (state = initialState, action) {

    switch (action.type) {
        case GET_PROVIDER_SOURCE_STARTED:
            return { ...state, isNew: false, readOnly: true, saveFinished: false }
        case GET_PROVIDER_SOURCES_STARTED:
            return { ...state, readOnly: true, selectedProviderSource: null, isSelected: false  }
        case GET_PROVIDER_SOURCE_SUCCESS:
            return { ...state, isNew: false, isSelected: true, selectedProviderSource: action.providerSource, readOnly: true}
        case SAVE_PROVIDER_SOURCE_SUCCESS:
            return { ...state, saveWithoutWarning: false, openEditWarning: false, isNew: false, showMembersWidget: false, isSelected: true, selectedProviderSource: action.providerSource, saveFinished: true, readOnly: true, showWarning: false, openDeleteWarning: false }
        case SAVE_PROVIDER_SOURCE_FAILED:
            return { ...state, isNew: true, isSelected: true, saveFinished: false, readOnly: false }
        case SELECTED_PROVIDER_SOURCE:
            return { ...state, showMembersWidget: false, isSelected: true, selectedProviderSource: action.providerSource, readOnly: true}
        case ADD_PROVIDER_SOURCE:
            return { ...state, isNew: true, isSelected: true, readOnly: false,  selectedProviderSource: action.providerSource }
        case DELETE_PROVIDER_SOURCE_SUCCESS:
            return { ...state, isSelected: false, selectedProviderSource: null, openEditWarning: false, openDeleteWarning: false}
        case MAKE_PROVIDER_SOURCE_EDITABLE:
                    return { ...state, readOnly: false }
        case CANCEL_PROVIDER_SOURCE:
            return { ...state, isNew: false, isSelected: false, selectedProviderSource: null, readOnly: true }
        case SHOW_EDIT_WARNING_PROVIDER_SOURCE_STARTED:
            return { ...state, saveWithoutWarning: false, openEditWarning: false}
        case SHOW_EDIT_WARNING_PROVIDER_SOURCE_SUCCESS:
            return { ...state, saveWithoutWarning: false, openEditWarning: true }
        case DONT_SHOW_EDIT_WARNING_PROVIDER_SOURCE_SUCCESS:
            return { ...state, saveWithoutWarning: true, openEditWarning:false}
        case SHOW_DELETE_WARNING_PROVIDER_SOURCE_STARTED:
            return { ...state, openDeleteWarning: false }
        case SHOW_DELETE_WARNING_PROVIDER_SOURCE_SUCCESS:
            return { ...state, openDeleteWarning: true, openEditWarning: false }
        default:
            return state
    }
}
