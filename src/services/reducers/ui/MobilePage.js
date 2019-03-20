import {
     GET_MOBILE_SUCCESS , GET_MOBILES_SUCCESS ,ADD_MOBILE
    ,COPY_MOBILE , DELETE_MOBILE_SUCCESS ,SELECTED_MOBILE
    ,CANCEL_MOBILE , GET_MOBILE_STARTED ,MAKE_MOBILE_EDITABLE,CLOSE_MOBILE_PANEL ,TOGGLE_MOBILE_CATEGORIES,
    SAVE_MOBILE_SUCCESS , MOBILE_PAGE_SELECTED_MODULE, UPDATE_MOBILE_SUCCESS ,UN_SELECTED_MOBILE,GET_UNASSIGNED_USERS_SUCCESS,ASSIGN_BUTTON_PRESS
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
    selectedTopic: null,
    disableRowClick: false,
    deleted: false,
    showCategories : false
}
export default function (state = initialState, action) {

    switch (action.type) {
        case GET_MOBILE_STARTED:
            return { ...state, disableRowClick: false, selectedTopic:null, readOnly: true, isSelected: false, serviceLoaded: false ,showCategories:false}
        case GET_MOBILE_SUCCESS:
            return { ...state, disableRowClick: false, isNew: false, serviceLoaded: false,isCopy:false, isView:false, isSelected: true,readOnly: true, selectedTopic: action.topic}
        case GET_MOBILES_SUCCESS:
            return { ...state, serviceLoaded: true }
        case ADD_MOBILE:
            return { ...state, disableRowClick: true, isNew: true, isCopy: false, isView: true, isSelected: true, readOnly: false, selectedTopic: action.topic, serviceLoaded: true }
        case COPY_MOBILE:
            return { ...state, disableRowClick: true, isNew: false, isCopy: true, isView: true, isSelected: true, readOnly: false, selectedTopic: action.topic, serviceLoaded: false }
        case GET_UNASSIGNED_USERS_SUCCESS:
            return { ...state, disableRowClick: false, serviceLoaded: false}
        case UPDATE_MOBILE_SUCCESS:
            return { ...state, readOnly: true, disableRowClick: false, isSelected: true, serviceLoaded: true }
        case SELECTED_MOBILE:
            return {...state, isSelected: true,isView:false,readOnly: true, selectedTopic: action.topic, serviceLoaded: false,showCategories:false}
        case UN_SELECTED_MOBILE:
            return { ...state, isSelected: false, isView: false, readOnly: true, selectedTopic: null, serviceLoaded: false }
        case SAVE_MOBILE_SUCCESS:
            return { ...state, disableRowClick: false, serviceLoaded: true, saveFinished:true, isSelected: true, readOnly: true, isView:false}
        case ASSIGN_BUTTON_PRESS:
            return { ...state, disableRowClick: true, readOnly: false, isNew: false, isCopy: false, isView:false , serviceLoaded: false }
        case MAKE_MOBILE_EDITABLE:
            return { ...state, disableRowClick: true, readOnly: false, isNew: false, isCopy: false , serviceLoaded: false}
        case CLOSE_MOBILE_PANEL:
            return { ...state, disableRowClick: false, isNew: false, isCopy: false, readOnly: true, isSelected: false, selectedTopic: null, serviceLoaded: false}
        case CANCEL_MOBILE:
            return { ...state,disableRowClick: false, readOnly: true , serviceLoaded: false}
        case MOBILE_PAGE_SELECTED_MODULE:
            return { ...state, serviceLoaded: false}
        case DELETE_MOBILE_SUCCESS:
            return {...state,disableRowClick: false, isSelected: false,readOnly: true, selectedTopic: null,serviceLoaded: true}
        case TOGGLE_MOBILE_CATEGORIES:
            return { ...state, showCategories: action.showCategories}
        default:
            return state;
    }
}
