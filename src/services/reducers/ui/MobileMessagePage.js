import {
    GET_MOBILEMESSAGE_SUCCESS , GET_MOBILESMESSAGE_SUCCESS ,ADD_MOBILEMESSAGE
    ,COPY_MOBILEMESSAGE , DELETE_MOBILEMESSAGE_SUCCESS ,SELECTED_MOBILEMESSAGE
    ,CANCEL_MOBILEMESSAGE , GET_MOBILEMESSAGE_STARTED , DELETE_MOBILEMESSAGE_STARTED ,MAKE_MOBILEMESSAGE_EDITABLE,CLOSE_MOBILEMESSAGE_PANEL ,
    SAVE_MOBILEMESSAGE_SUCCESS , MOBILEMESSAGE_PAGE_SELECTED_MODULE, UPDATE_MOBILEMESSAGE_SUCCESS ,UN_SELECTED_MOBILEMESSAGE,GET_UNASSIGNED_USERS_SUCCESS,ASSIGN_BUTTON_PRESS
} from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up
const initialState = {
    isNew: false,
    isCopy: false,
    isView: false,
    saveFinished: false,
    serviceLoaded:false,
    readOnly: true,
    isSelected: false,
    selectedMessage: null,
    //   unAssignedUsers: null,
    //   selectedModule: null,
    disableRowClick: false,
    deleted: false,
    //   clonedTopicObject:{}
}
export default function (state = initialState, action) {

    switch (action.type) {
        case GET_MOBILEMESSAGE_STARTED:
            return { ...state, disableRowClick: false, selectedMessage:null, readOnly: true, isSelected: false, serviceLoaded: false }
        case GET_MOBILEMESSAGE_SUCCESS:
            return { ...state, disableRowClick: false, isNew: false, serviceLoaded: false,isCopy:false, isView:false, isSelected: true,readOnly: true, selectedMessage: action.message}
        case GET_MOBILESMESSAGE_SUCCESS:
            return { ...state, serviceLoaded: true }
        case ADD_MOBILEMESSAGE:
            return { ...state, disableRowClick: true, isNew: true, isCopy: false, isView: true, isSelected: true, readOnly: false, selectedMessage: action.message, serviceLoaded: true }
        case COPY_MOBILEMESSAGE:
            return { ...state, disableRowClick: true, isNew: false, isCopy: true, isView: true, isSelected: true, readOnly: false, selectedMessage: action.message, serviceLoaded: false }
        case GET_UNASSIGNED_USERS_SUCCESS:
            return { ...state, disableRowClick: false, serviceLoaded: false}
        case UPDATE_MOBILEMESSAGE_SUCCESS:
            return { ...state, readOnly: true, disableRowClick: false, isSelected: true, serviceLoaded: true }
        case SELECTED_MOBILEMESSAGE:
            return {...state, isSelected: true,isView:false,readOnly: true, selectedMessage: action.message, serviceLoaded: false}
        case UN_SELECTED_MOBILEMESSAGE:
            return { ...state, isSelected: false, isView: false, readOnly: true, selectedMessage: null, serviceLoaded: false }
        case SAVE_MOBILEMESSAGE_SUCCESS:
            return { ...state, disableRowClick: false, serviceLoaded: true, saveFinished:true, isSelected: true, readOnly: true, isView:false}
        case ASSIGN_BUTTON_PRESS:
            return { ...state, disableRowClick: true, readOnly: false, isNew: false, isCopy: false, isView:false , serviceLoaded: false }
        case MAKE_MOBILEMESSAGE_EDITABLE:
            return { ...state, disableRowClick: true, readOnly: false, isNew: false, isCopy: false , serviceLoaded: false}
        case CLOSE_MOBILEMESSAGE_PANEL:
            return { ...state, disableRowClick: false, isNew: false, isCopy: false, readOnly: true, isSelected: false, selectedMessage: null, serviceLoaded: false}
        case CANCEL_MOBILEMESSAGE:
            return { ...state,disableRowClick: false, readOnly: true , serviceLoaded: false}
        case MOBILEMESSAGE_PAGE_SELECTED_MODULE:
            return { ...state, serviceLoaded: false}
        case DELETE_MOBILEMESSAGE_SUCCESS:
            return {...state,disableRowClick: false, isSelected: false,readOnly: true, selectedMessage: null,serviceLoaded: true}
        default:
            return state;
    }
}
