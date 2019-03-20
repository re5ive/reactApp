import {
	GET_COMPONENT_STARTED,
	GET_COMPONENT_SUCCESS,
	ADD_COMPONENT,
	CANCEL_COMPONENT,
	SET_SELECTED_COMPONENT,
	UPDATE_SELECTED_COMPONENT,
	GET_COMPONENTS_STARTED,
	GET_COMPONENTS_SUCCESS,
	DELETE_COMPONENT_SUCCESS,
	SAVE_COMPONENT_SUCCESS,
	SAVE_COMPONENT_STARTED,
	SHOW_PROPERTIES_PANEL,
	HIDE_PROPERTIES_PANEL,
	COMPONENT_TREE_COLLAPSE_TOGGLED,
	UPDATE_COMPONENTS_TREE,
	TOGGLE_COMPONENT_EDIT_MODE,
	SET_MUTATED_COMPONENTS_LIST,
	COMPONENT_PAGE_INIT_ACTION_DIALOG,
	SET_CLEANED_ROOT_COMPONENT,
	DELETE_COMPONENT_STARTED, SET_COMPONENTS_FETCHING_END,
} from '../../common/actionTypes'

const initialState = {
	componentsTree: [],
	componentsTreeCached: [],
    selectedComponent: null,
	selectedComponentCached: null,
	selectedComponentParent: null,
    path: null,
    parentComponent: null,
    isNew: false,
    isSelected: false,
    readOnly: false,
    updated: false,
    showProperties: false,
	expandedList: [],
	mutatedComponentsList: [],
	dialogCallAction: () => {},
	dialogMessage: null,
	actionDialog: false,
	requestPending: false,
	cleanedRootComponent: null
}

export default function (state = initialState, action) {
    switch (action.type) {
	    case GET_COMPONENTS_STARTED:
	    	return {...state, componentsTree: []}
    	case GET_COMPONENTS_SUCCESS:
    		return {...state, componentsTree: action.componentsTree, componentsTreeCached: (action.componentsTree || []).slice()}
	    case UPDATE_COMPONENTS_TREE:
	    	return {...state, componentsTree: action.componentsTree}
	    case GET_COMPONENT_STARTED:
                return { ...state, isSelected: false, selectedComponent: null, isNew: false, updated: false }
	    case COMPONENT_PAGE_INIT_ACTION_DIALOG:
	    	return {...state, dialogMessage: action.dialogMessage, actionDialog: action.actionDialog, dialogCallAction: action.dialogCallAction}
	    case GET_COMPONENT_SUCCESS:
            return { ...state, requestPending: false }
	    case SAVE_COMPONENT_STARTED:
	        return {...state, requestPending: true}
        case SAVE_COMPONENT_SUCCESS:
            return { ...state, requestPending: false}
	    case DELETE_COMPONENT_STARTED:
	    	return {...state, requestPending: true}
	    case DELETE_COMPONENT_SUCCESS:
		    return {...state, requestPending: false}
	    case SET_CLEANED_ROOT_COMPONENT:
	    	return {...state, cleanedRootComponent: action.cleanedRootComponent}
        case ADD_COMPONENT:
            return { ...state, isNew: true, isSelected: true, readOnly: false, updated: false, showProperties: false }
        case SET_SELECTED_COMPONENT:
        	return {...state, selectedComponentCached: action.component, selectedComponent: action.component, selectedComponentParent: action.parent, path: action.path}
	    case UPDATE_SELECTED_COMPONENT:
		    return {...state, componentsTree: action.componentsTree, selectedComponentCached: action.component, selectedComponent: action.component, selectedComponentParent: action.parent, path: action.path}
        case CANCEL_COMPONENT:
                return { ...state, updated: false, showProperties: false, isSelected: false, isCopy: false, isNew: false, selectedComponent: null , readOnly: true, parentComponent: null }
            case TOGGLE_COMPONENT_EDIT_MODE:
                return { ...state, readOnly: action.editable}
            case SHOW_PROPERTIES_PANEL:
                return {...state, showProperties: true}
            case HIDE_PROPERTIES_PANEL:
                return {...state, showProperties: false}
            case COMPONENT_TREE_COLLAPSE_TOGGLED:
                return {...state, expandedList: action.expandedList}
	        case SET_MUTATED_COMPONENTS_LIST:
	    	    return {...state, mutatedComponentsList: action.mutatedComponentsList}
	    case SET_COMPONENTS_FETCHING_END:
	    	    return {...state, requestPending: action.state}
	        default:
	            return state
    }
}
