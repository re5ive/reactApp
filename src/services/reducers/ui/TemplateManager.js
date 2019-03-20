import { Template } from '../../../models/'
import { GET_TEMPLATE_STARTED, GET_TEMPLATE_SUCCESS, SAVE_TEMPLATE_SUCCESS, ADD_TEMPLATE, CANCEL_TEMPLATE,CLOSE_TEMPLATE_MANAGER,
            COPY_TEMPLATE,SELECTED_TEMPLATE, GET_EXCEPTION_TYPES_SUCCESS, MAKE_EDITABLE ,DELETE_TEMPLATE_SUCCESS, GET_TEMPLATES_STARTED} from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    isNew: false,
    isCopy: false,
    isSelected: false,
    selectedTemplate: null,
    readOnly: true,
    copiedTemplate: null,
    exceptionTypes: [],
    saveFinished: false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_TEMPLATE_STARTED:
            return { ...state, isSelected: false, selectedTemplate: null, isNew: false, isCopy: false, readOnly: true };
        case GET_TEMPLATES_STARTED:
            return { ...state, isSelected: false, readOnly: true };
        case GET_TEMPLATE_SUCCESS:
            return { ...state, selectedTemplate: action.template, isNew: false, isSelected: true, readOnly: true };
        case SAVE_TEMPLATE_SUCCESS:
            return { ...state, readOnly: true, selectedTemplate: action.template, isNew: false, isSelected: false, isCopy: false, saveFinished: true };
        case MAKE_EDITABLE:
            return { ...state, readOnly: false };
        case SELECTED_TEMPLATE:
            return { ...state, isSelected: true, selectedTemplate: action.template, readOnly: true};
        case ADD_TEMPLATE:
            return { ...state, readOnly: false, selectedTemplate: new Template({}), isNew: true, isSelected: true, isCopy: false };
        case COPY_TEMPLATE:
            return { ...state, selectedTemplate: new Template({}), isNew: true, readOnly: false, isSelected: true, isCopy: true, copiedTemplate: action.template };
        case CANCEL_TEMPLATE:
            return { ...state,  readOnly: true, isNew: false, isSelected: true, isCopy: false };
        case DELETE_TEMPLATE_SUCCESS:
            return { ...state,  readOnly: true,  isSelected: false};
        case CLOSE_TEMPLATE_MANAGER:
            return { ...state,  readOnly: true, isNew: false, isSelected: false, isCopy: false, selectedTemplate: null };
        case GET_EXCEPTION_TYPES_SUCCESS:
            return { ...state, exceptionTypes: action.exceptionTypes , readOnly: true};
        default:
            return state;
    }
}