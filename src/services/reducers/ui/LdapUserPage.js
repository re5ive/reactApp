import {
    GET_LDAP_USER_SUCCESS,
    MAKE_LDAP_USER_EDITABLE,
    SAVE_LDAP_USER_SUCCESS,
    CANCEL_LDAP_USER,
    GET_LDAP_USERS_STARTED,
    SET_SELECTED_LDAP_USER
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
    isSelected: false,
    disableRowClick: false,
    deleted: false,
    saveFinished:false,
    clonedLdapUserObject: {}
}, action) {

    switch (action.type) {
        case GET_LDAP_USER_SUCCESS:
            return {...state, disableRowClick: false, isNew: false,readOnly: true, isSelected: true, selectedUser: action.user,clonedLdapUserObject:action.clonedLdapUserObject}
        case MAKE_LDAP_USER_EDITABLE:
            return { ...state, disableRowClick: true, readOnly: false }
        case SAVE_LDAP_USER_SUCCESS:
            return { ...state, disableRowClick: false, saveFinished: true, readOnly: true, selectedUser: action.user,clonedLdapUserObject:action.clonedLdapUserObject }
        case CANCEL_LDAP_USER:
            return { ...state, disableRowClick: false, readOnly: true }
        case GET_LDAP_USERS_STARTED:
            return { ...state, disableRowClick: false, readOnly: true , selectedUser: null,isSelected: false }
        case SET_SELECTED_LDAP_USER:
            return {...state, disableRowClick: false, isSelected: true, readOnly: true, selectedUser: action.user}
        default:
            return state;
    }
}