import { ActivityMaster } from '../../../models/'
import {
    GET_ACTIVITY_MASTER_STARTED, ADD_ACTIVITY_MASTER, SAVE_ACTIVITY_MASTER_SUCCESS,
    GET_EXCEPTION_TYPES_SUCCESS, GET_ACTION_TYPES_SUCCESS, CANCEL_ACTIVITY_MASTER, SAVE_ACTIVITY_MASTER_FAILED,
    GET_EVENT_STATUS_TYPES_SUCCESS, SELECTED_ACTIVITY_MASTER, GET_EXCEPTION_TEMPLATE_TYPES_SUCCESS, MAKE_EDITABLE,
    GET_ORDER_TYPES_SUCCESS, COPY_ACTIVITY_MASTER, CLOSE_EVENT_MANAGER, GET_ALL_ACTIVITY_MASTERS_STARTED
} from '../../common/actionTypes'

const initialState = {
    isNew: false,
    isCopy: false,
    isSelected: false,
    selectedActivity: null,
    copiedActivity: null,
    exceptionTypes: [],
    readOnly: true,
    actionTypes: [],
    eventStatusTypes: [],
    exceptionTemplateTypes: [],
    orderTypes: [],
    saveFinished: false
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_ACTIVITY_MASTER_STARTED:
            return { ...state, readOnly: true, isSelected: false, selectedActivity: null, isNew: false, isCopy: false }
        case GET_ALL_ACTIVITY_MASTERS_STARTED:
            return { ...state, readOnly: true, isSelected: false }
        case SAVE_ACTIVITY_MASTER_SUCCESS:
            return { ...state, readOnly: true, selectedActivity: action.activityMaster, isSelected: true, isNew: false, isCopy: false, saveFinished: true }
        case MAKE_EDITABLE:
            return { ...state, readOnly: false };
        case SELECTED_ACTIVITY_MASTER:
            return {...state, isSelected: true, selectedActivity: action.activityMaster, readOnly: true}
        case SAVE_ACTIVITY_MASTER_FAILED:
            return { ...state, isSelected: true, selectedActivity: action.activityMaster }
        case ADD_ACTIVITY_MASTER:
            return { ...state,readOnly: false, selectedActivity: new ActivityMaster({}), isSelected: true, isNew: true, isCopy: false }
        case COPY_ACTIVITY_MASTER:
            return { ...state, readOnly: false, isCopy: true, isNew: true, isSelected: true, copiedActivity: action.activityMaster, selectedActivity: new ActivityMaster({}) }
        case GET_EXCEPTION_TYPES_SUCCESS:
            return { ...state, exceptionTypes: action.exceptionTypes }
        case GET_ACTION_TYPES_SUCCESS:
            return { ...state, actionTypes: action.actionTypes }
        case GET_EVENT_STATUS_TYPES_SUCCESS:
            return { ...state, eventStatusTypes: action.eventStatusTypes }
        case CANCEL_ACTIVITY_MASTER:
            return { ...state, isNew: false, isSelected: true, isCopy: null, readOnly: true }
        case CLOSE_EVENT_MANAGER:
            return { ...state, isNew: false, isSelected: false, isCopy: null, readOnly: true, selectedActivity: null }
        case GET_EXCEPTION_TEMPLATE_TYPES_SUCCESS:
            return { ...state, exceptionTemplateTypes: action.templateTypes }
        case GET_ORDER_TYPES_SUCCESS:
            return { ...state, orderTypes: action.orderTypes }
        default:
            return state
    }
}

