import {
    GET_SENDMOBILEMESSAGE_SUCCESS , GET_SENDMOBILESMESSAGE_SUCCESS ,ADD_SENDMOBILEMESSAGE
    ,COPY_SENDMOBILEMESSAGE , DELETE_SENDMOBILEMESSAGE_SUCCESS ,SELECTED_SENDMOBILEMESSAGE
    ,CANCEL_SENDMOBILEMESSAGE , GET_SENDMOBILEMESSAGE_STARTED , DELETE_MOBILEMESSAGE_STARTED ,MAKE_SENDMOBILEMESSAGE_EDITABLE,CLOSE_SENDMOBILEMESSAGE_PANEL ,
    SAVE_SENDMOBILEMESSAGE_SUCCESS , SENDMOBILEMESSAGE_PAGE_SELECTED_MODULE, UPDATE_SENDMOBILEMESSAGE_SUCCESS ,UN_SELECTED_SENDMOBILEMESSAGE,GET_UNASSIGNED_USERS_SUCCESS,ASSIGN_BUTTON_PRESS
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
    selectedSendMessage: null,
    //   unAssignedUsers: null,
    //   selectedModule: null,
    disableRowClick: false,
    deleted: false,
    //   clonedTopicObject:{}
}
export default function (state = initialState, action) {

    switch (action.type) {
        case GET_SENDMOBILEMESSAGE_STARTED:
            return { ...state, disableRowClick: false, selectedSendMessage:null, readOnly: true, isSelected: false, serviceLoaded: false }
        case GET_SENDMOBILEMESSAGE_SUCCESS:
            return { ...state, disableRowClick: false, isNew: false, serviceLoaded: false,isCopy:false, isView:false, isSelected: true,readOnly: true, selectedSendMessage: action.message}
        case GET_SENDMOBILESMESSAGE_SUCCESS:
            return { ...state, serviceLoaded: true }
        case ADD_SENDMOBILEMESSAGE:
            return { ...state, disableRowClick: true, isNew: true, isCopy: false, isView: true, isSelected: true, readOnly: false, selectedSendMessage: action.message, serviceLoaded: true }
        case COPY_SENDMOBILEMESSAGE:
            return { ...state, disableRowClick: true, isNew: false, isCopy: true, isView: true, isSelected: true, readOnly: false, selectedSendMessage: action.message, serviceLoaded: false }
        case GET_UNASSIGNED_USERS_SUCCESS:
            return { ...state, disableRowClick: false, serviceLoaded: false}
        case UPDATE_SENDMOBILEMESSAGE_SUCCESS:
            return { ...state, readOnly: true, disableRowClick: false, isSelected: true, serviceLoaded: true }
        case SELECTED_SENDMOBILEMESSAGE:
            return {...state, isSelected: true,isView:false,readOnly: true, selectedSendMessage: action.message, serviceLoaded: false}
        case UN_SELECTED_SENDMOBILEMESSAGE:
            return { ...state, isSelected: false, isView: false, readOnly: true, selectedSendMessage: null, serviceLoaded: false }
        case SAVE_SENDMOBILEMESSAGE_SUCCESS:
            return { ...state, disableRowClick: false, serviceLoaded: true, saveFinished:true, isSelected: true, readOnly: true, isView:false}
        case ASSIGN_BUTTON_PRESS:
            return { ...state, disableRowClick: true, readOnly: false, isNew: false, isCopy: false, isView:false , serviceLoaded: false }
        case MAKE_SENDMOBILEMESSAGE_EDITABLE:
            return { ...state, disableRowClick: true, readOnly: false, isNew: false, isCopy: false , serviceLoaded: false}
        case CLOSE_SENDMOBILEMESSAGE_PANEL:
            return { ...state, disableRowClick: false, isNew: false, isCopy: false, readOnly: true, isSelected: false, selectedSendMessage: null, serviceLoaded: false}
        case CANCEL_SENDMOBILEMESSAGE:
            return { ...state,disableRowClick: false, readOnly: true , serviceLoaded: false}
        case SENDMOBILEMESSAGE_PAGE_SELECTED_MODULE:
            return { ...state, serviceLoaded: false}
        case DELETE_SENDMOBILEMESSAGE_SUCCESS:
            return {...state,disableRowClick: false, isSelected: false,readOnly: true, selectedSendMessage: null,serviceLoaded: true}
        default:
            return state;
    }
}
