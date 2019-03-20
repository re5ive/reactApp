import {
    GET_PROFILE_SUCCESS,
    GET_PROFILES_SUCCESS,
    ADD_PROFILE,
    COPY_PROFILE,
    DELETE_PROFILE_SUCCESS,
    GET_UNASSIGNED_USERS_SUCCESS,
    SELECTED_PROFILE,
    CANCEL_PROFILE,
    GET_PROFILE_STARTED,
    MAKE_PROFILE_EDITABLE,
    ASSIGN_BUTTON_PRESS,
    CLOSE_PROFILE_PANEL,
    SAVE_PROFILE_SUCCESS,
    PROFILE_PAGE_SELECTED_MODULE, UPDATE_PROFILE_SUCCESS, UN_SELECTED_PROFILE
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
    selectedProfile: null,
    unAssignedUsers: null,
    selectedModule: null,
    disableRowClick: false,
    deleted: false,
    clonedProfileObject:{}
}
export default function (state = initialState, action) {

    switch (action.type) {
        case GET_PROFILE_STARTED:
            return { ...state, disableRowClick: false, selectedProfile:null, readOnly: true, isSelected: false, serviceLoaded: false }
        case GET_PROFILE_SUCCESS:
            return { ...state, disableRowClick: false, isNew: false, serviceLoaded: false,isCopy:false, isView:false, isSelected: true,readOnly: true, selectedProfile: action.profile, clonedProfileObject:action.clonedProfileObject}
        case GET_PROFILES_SUCCESS:
            return { ...state, serviceLoaded: true }
        case ADD_PROFILE:
            return { ...state, disableRowClick: true, isNew: true, isCopy: false, isView: true, isSelected: true, readOnly: false, selectedProfile: action.profile, serviceLoaded: true }
        case COPY_PROFILE:
            return { ...state, disableRowClick: true, isNew: false, isCopy: true, isView: true, isSelected: true, readOnly: false, selectedProfile: action.profile, serviceLoaded: false }
        case GET_UNASSIGNED_USERS_SUCCESS:
            return { ...state, disableRowClick: false, unAssignedUsers: action.users, serviceLoaded: false}
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, readOnly: true, disableRowClick: false, isSelected: true, clonedProfileObject: action.clonedProfileObject, serviceLoaded: true }
        case SELECTED_PROFILE:
            return {...state, isSelected: true,isView:false,readOnly: true, selectedProfile: action.profile, serviceLoaded: false}
        case UN_SELECTED_PROFILE:
            return { ...state, isSelected: false, isView: false, readOnly: true, selectedProfile: null, serviceLoaded: false }
        case SAVE_PROFILE_SUCCESS:
            return { ...state, disableRowClick: false, serviceLoaded: true, saveFinished:true, isSelected: true, readOnly: true, isView:false, selectedModule: null }
        case ASSIGN_BUTTON_PRESS:
            return { ...state, disableRowClick: true, readOnly: false, isNew: false, isCopy: false, isView:false , serviceLoaded: false }
        case MAKE_PROFILE_EDITABLE:
            return { ...state, disableRowClick: true, readOnly: false, isNew: false, isCopy: false , serviceLoaded: false}
        case CLOSE_PROFILE_PANEL:
            return { ...state, disableRowClick: false, isNew: false, isCopy: false, readOnly: true, isSelected: false, selectedProfile: null, serviceLoaded: false}
        case CANCEL_PROFILE:
            return { ...state,disableRowClick: false, readOnly: true , serviceLoaded: false}
        case PROFILE_PAGE_SELECTED_MODULE:
            return { ...state, selectedModule: action.selectedModule, serviceLoaded: false}
        case DELETE_PROFILE_SUCCESS:
            return {...state,disableRowClick: false, isSelected: false,readOnly: true, selectedProfile: null,serviceLoaded: true}
        default:
            return state;
    }
}
