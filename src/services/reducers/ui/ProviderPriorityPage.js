import {
    GET_PROVIDER_PRIORITYS_STARTED, GET_PROVIDER_PRIORITY_STARTED, GET_PROVIDER_PRIORITY_SUCCESS,SELECTED_PROVIDER_PRIORITY, ADD_PROVIDER_PRIORITY, CANCEL_PROVIDER_PRIORITY, DELETE_PROVIDER_PRIORITY_SUCCESS, SAVE_PROVIDER_PRIORITY_SUCCESS,
    SAVE_PROVIDER_PRIORITY_FAILED, MAKE_PROVIDER_PRIORITY_EDITABLE,
    GET_PROVIDER_AVAILABE_SOURCES_STARTED, GET_PROVIDER_AVAILABE_SOURCES_SUCCESS} from '../../common/actionTypes'

const initialState = {
    selectedProviderPriority: null,
    isNew: false,
    readOnly: true,
    isSelected: false,
    saveFinished: false,
    availableSources: []
}
export default function (state = initialState, action) {

    switch (action.type) {
        case GET_PROVIDER_PRIORITY_STARTED:
            return { ...state, isNew: false, readOnly: true, saveFinished: false }
        case GET_PROVIDER_PRIORITYS_STARTED:
            return { ...state, readOnly: true, selectedProviderPriority: null, isSelected: false  }
        case GET_PROVIDER_PRIORITY_SUCCESS:
            return { ...state, isNew: false, isSelected: true, selectedProviderPriority: action.providerPriority, readOnly: true}
        case SAVE_PROVIDER_PRIORITY_SUCCESS:
            return { ...state, isNew: false, showMembersWidget: false, isSelected: true, selectedProviderPriority: action.providerPriority, saveFinished: true, readOnly: true }
        case SAVE_PROVIDER_PRIORITY_FAILED:
            return { ...state, isSelected: true, saveFinished: false, readOnly: false }
        case SELECTED_PROVIDER_PRIORITY:
            return { ...state, showMembersWidget: false, isSelected: true, selectedProviderPriority: action.providerPriority, readOnly: true}
        case ADD_PROVIDER_PRIORITY:
            return { ...state, isNew: true, isSelected: true, readOnly: false,  selectedProviderPriority: action.providerPriority }
        case DELETE_PROVIDER_PRIORITY_SUCCESS:
            return { ...state, isSelected: false, selectedProviderPriority: null}
        case MAKE_PROVIDER_PRIORITY_EDITABLE:
                    return { ...state, readOnly: false }
        case CANCEL_PROVIDER_PRIORITY:
            return { ...state, isNew: false, isSelected: false, selectedProviderPriority: null, readOnly: true }
        case GET_PROVIDER_AVAILABE_SOURCES_STARTED:
            return { ...state, availableSources: [] }
        case GET_PROVIDER_AVAILABE_SOURCES_SUCCESS:
            return { ...state, availableSources: action.availableSources }
        default:
            return state
    }
}
