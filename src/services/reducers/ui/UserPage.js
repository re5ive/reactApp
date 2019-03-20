import {
    GET_USER_SUCCESS,
    ADD_USER,
    MAKE_USER_EDITABLE,
    CANCEL_USER,
    CLOSE_USER_PAN,
    DELETE_USER_SUCCESS,
    GET_USERS_STARTED,
   // SAVE_USER_SUCCESS,
    SET_SELECTED_USER, UPDATE_USER_SUCCESS
} from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

export default function (state = {
    selectedUser: null,
    isNew: false,
    readOnly: true,
    notEditable: true,
    isSelected: false,
    disableRowClick: false,
    saveFinished: false,
    deleted: false,
    clonedUserObject:{}
}, action) {

    switch (action.type) {
        // case GET_PROFILES_STARTED:
        //     return { ...state, disableRowClick: false, selectedProfile:null, readOnly: true, isSelected: false }
        case GET_USER_SUCCESS:
            return {...state,saveFinished: false, disableRowClick: false, notEditable: true, isNew: false,readOnly: true, isSelected: true, selectedUser: action.user,clonedUserObject:action.clonedUserObject}
        case ADD_USER:
            action.user.lastName = ''
            return { ...state, saveFinished: false, disableRowClick: false,notEditable: false, isNew: true, readOnly: false, isSelected: true, selectedUser: action.user}
        case DELETE_USER_SUCCESS:
            return {...state,saveFinished: false, deleted: true,disableRowClick: false, notEditable: true, isNew: false, readOnly: true,isSelected: false, selectedUser: null}
        case MAKE_USER_EDITABLE:
            return { ...state,saveFinished: false,  disableRowClick: true,notEditable: true, readOnly: false }
        case GET_USERS_STARTED:
            return { ...state,saveFinished: false,  disableRowClick: false, selectedUser:null, readOnly: true, isSelected: false }
        case CANCEL_USER:
            return { ...state, disableRowClick: false, notEditable: true, readOnly: true }
        case UPDATE_USER_SUCCESS:
            return { ...state, saveFinished: true,  readOnly: true,clonedUserObject:action.clonedUserObject}
        case CLOSE_USER_PAN:
            return { ...state,saveFinished: false, disableRowClick: false, notEditable: true, isNew: false, readOnly: true, isSelected: false, selectedUser: null}
        case SET_SELECTED_USER:
            return {...state,saveFinished: false, disableRowClick: false, notEditable: true, isSelected: true, readOnly: true, selectedUser: action.user}
        default:
            return state;
    }
}