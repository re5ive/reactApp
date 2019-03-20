import {
    GET_CONFIGURATION_EDITORS_STARTED, GET_CONFIGURATION_EDITOR_STARTED, GET_CONFIGURATION_EDITOR_SUCCESS,SELECTED_CONFIGURATION_EDITOR, ADD_CONFIGURATION_EDITOR, CANCEL_CONFIGURATION_EDITOR, DELETE_CONFIGURATION_EDITOR_SUCCESS, SAVE_CONFIGURATION_EDITOR_SUCCESS,
    SAVE_CONFIGURATION_EDITOR_FAILED, MAKE_CONFIGURATION_EDITOR_EDITABLE } from '../../common/actionTypes'

const initialState = {
    selectedConfigurationEditor: null,
    isNew: false,
    readOnly: true,
    isSelected: false,
    saveFinished: false
}
export default function (state = initialState, action) {

    switch (action.type) {
        case GET_CONFIGURATION_EDITOR_STARTED:
            return { ...state, isNew: false, readOnly: true, saveFinished: false }
        case GET_CONFIGURATION_EDITORS_STARTED:
            return { ...state, selectedConfigurationEditor: null, isSelected: false  }
        case GET_CONFIGURATION_EDITOR_SUCCESS:
            return { ...state, isNew: false, isSelected: true, selectedConfigurationEditor: action.configurationEditor, readOnly: true}
        case SAVE_CONFIGURATION_EDITOR_SUCCESS:
            return { ...state, isNew: false, showMembersWidget: false, isSelected: true, selectedConfigurationEditor: action.configurationEditor, saveFinished: true, readOnly: true }
        case SAVE_CONFIGURATION_EDITOR_FAILED:
            return { ...state, isNew: true, isSelected: true, saveFinished: false, readOnly: false }
        case SELECTED_CONFIGURATION_EDITOR:
            return { ...state, showMembersWidget: false, isSelected: true, selectedConfigurationEditor: action.configurationEditor, readOnly: true}
        case ADD_CONFIGURATION_EDITOR:
            return { ...state, isNew: true, isSelected: true, readOnly: false,  selectedConfigurationEditor: action.configurationEditor }
        case DELETE_CONFIGURATION_EDITOR_SUCCESS:
            return { ...state, isSelected: false, selectedConfigurationEditor: null}
        case MAKE_CONFIGURATION_EDITOR_EDITABLE:
                    return { ...state, readOnly: false }
        case CANCEL_CONFIGURATION_EDITOR:
            return { ...state, isNew: false, isSelected: false, selectedConfigurationEditor: null, readOnly: true }
        default:
            return state
    }
}
