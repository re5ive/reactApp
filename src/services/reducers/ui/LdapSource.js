import {
    GET_LDAP_SUCCESS,
    ADD_LDAP,
    DELETE_LDAP_SUCCESS,
    SET_SELECTED_LDAP,
    CANCEL_LDAP,
    TEST_CONNECTION_SUCCESS,
    SYNC_USERS_SUCCESS,
    MAKE_LDAP_EDITABLE,
    CLOSE_LDAP,
    SAVE_LDAP_SUCCESS } from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up
const initialState = {
    isNew: false,
    isView: false,
    saveFinished:false,
    readOnly: true,
    isSelected: false,
    testedValue: false,
    selectedLdap: null,
    clonedLdapConfigObject:{}
}
//syncLdapUser
export default function (state = initialState, action) {

    switch (action.type) {
        case GET_LDAP_SUCCESS:
            // // if(action.ldap.id === state.selectedLdap && state.selectedLdap.id){
            //      action.ldap.testConnection = state.selectedLdap ? state.selectedLdap.testConnection : action.ldap.testConnection
            //      action.ldap.syncLdapUser = state.selectedLdap ? state.selectedLdap.syncLdapUser : action.ldap.syncLdapUser
            // // }
            let tseted = action.ldap !== null ? action.ldap.tested : false
            return {...state, isNew: false, testedValue:tseted, isView:false, isSelected: true,readOnly: true, saveFinished: false, selectedLdap: action.ldap,clonedLdapConfigObject:action.clonedLdapConfigObject}
        case ADD_LDAP:
            let _ldap = action.ldap
            _ldap.enableSsl = false
            _ldap.tested = false
            return {...state, isNew: true, testedValue: false, isView:true,saveFinished: false, isSelected: true,readOnly: false, selectedLdap: _ldap}
        case SET_SELECTED_LDAP:
            return {...state, isSelected: true,isView:false,saveFinished: false,readOnly: true, selectedLdap: action.ldap}
        case SAVE_LDAP_SUCCESS:
            let ldapDataOnSav = action.ldap
            ldapDataOnSav.syncLdapUser = state.selectedLdap.syncLdapUser
            ldapDataOnSav.tested = state.selectedLdap.tested
            return { ...state, readOnly: true, isNew: false, isView:false, selectedLdap: ldapDataOnSav, saveFinished: true,clonedLdapConfigObject:action.clonedLdapConfigObject }
        //return { ...state, readOnly: true, isView:false, selectedLdap: null, isSelected: false, saveFinished: true }
        case MAKE_LDAP_EDITABLE:
            return { ...state, readOnly: false }
        case SYNC_USERS_SUCCESS:
            let ldapData = state.selectedLdap
            ldapData.syncLdapUser = action.syncLdapUser
            return { ...state, readOnly: true, isView:false, saveFinished: true }
        case TEST_CONNECTION_SUCCESS:
            let tedtData = state.selectedLdap
            tedtData.tested = action.tested
            return { ...state, readOnly: false, testedValue:action.tested, isView:false, saveFinished: true }
        case CANCEL_LDAP:
            // let _isSelected = state.isNew ? false : true
            // let _selectedLdap = state.isNew ? null : action.ldap
            return { ...state, readOnly: true, isSelected: true, saveFinished: false}
        case CLOSE_LDAP:
            return { ...state, readOnly: true, isSelected: false, saveFinished: false, selectedLdap: null}
        case DELETE_LDAP_SUCCESS:
            return {...state,testedValue: false, isSelected: false,readOnly: true, selectedLdap: null, saveFinished: false,}
        default:
            return state;
    }
}