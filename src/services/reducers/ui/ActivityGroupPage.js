import {
    GET_ACTIVITY_GROUP_STARTED,
    GET_ACTIVITY_GROUP_SUCCESS,
    ADD_ACTIVITY_GROUP,
    COPY_ACTIVITY_GROUP,
    CANCEL_ACTIVITY_GROUP,
    MAKE_ACTIVITY_GROUP_EDITABLE,
    DEPARTMENT_SELECTED_MODULE,
    DELETE_ACTIVITY_GROUP_SUCCESS,
    SAVE_ACTIVITY_GROUP_SUCCESS
} from '../../common/actionTypes'
const initialState = {
    selectedActivityGroup: null,
    isNew: false,
    isCopy: false,
    selectedDepartment: null,
    isSelected: false,
    readOnly: true
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_ACTIVITY_GROUP_STARTED:
            return { ...state, isSelected: false, selectedActivityGroup: null, isNew: false }
        case GET_ACTIVITY_GROUP_SUCCESS:
           // let SelectedActivityGroup = action.activityGroup
            return { ...state, isNew: false, isSelected: true, selectedActivityGroup : action.activityGroup, readOnly: true }
        case SAVE_ACTIVITY_GROUP_SUCCESS:
            return { ...state, isNew: false, isSelected: true, selectedActivityGroup: action.activityGroup, readOnly: true  }
        case ADD_ACTIVITY_GROUP:
            return { ...state, isNew: true, isSelected: true, selectedActivityGroup: action.activityGroup, readOnly: false  }
        case DELETE_ACTIVITY_GROUP_SUCCESS:
            return { ...state, isSelected: false, selectedActivityGroup: null, readOnly: true }
        case DEPARTMENT_SELECTED_MODULE:
            return {...state, selectedDepartment: action.selectedDepartment}
            case CANCEL_ACTIVITY_GROUP:
            return { ...state,  isSelected: false, isCopy: false, isNew: false, selectedActivityGroup: null , readOnly: true }
        case MAKE_ACTIVITY_GROUP_EDITABLE:
            return { ...state, readOnly: false }
        case COPY_ACTIVITY_GROUP:
            return { ...state, isCopy: true, isNew: true, isSelected: true, readOnly: false, selectedActivityGroup: action.activityGroup }
        default:
            return state
    }
}