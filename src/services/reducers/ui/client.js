import {
	GET_CLIENT_STARTED,
	GET_CLIENT_SUCCESS,
	ADD_CLIENT,
	CANCEL_CLIENT,
	SET_SELECTED_CLIENT,
	MAKE_CLIENT_EDITABLE,
	CLIENT_SELECTED_MODULE,
	UPDATE_CLIENT_WITH_COMPONENT_STARTED,
	UPDATE_CLIENT_COMPONENT_WITH_PROPERTIES_TRIGGER,
	DELETE_CLIENT_SUCCESS,
	BUTTON_UPDATE,
	UPDATE_CLIENT_WITH_COMPONENT_TRIGGER,
	SAVE_CLIENT_SUCCESS,
	UPDATE_CLIENT_WITH_MODULE_STARTED,
	UPDATE_CLIENT_WITH_MODULE_TRIGGER,
	UPDATE_COMPONENT_SELECTION_IDS,
    UPDATE_CLIENTS_COMPONENT_TREE_DATA,
	UPDATE_CLIENTS_UNSELECTED_IDS,
	CLIENTS_COMPONENT_SELECTED,
	CLIENTS_COMPONENT_TREE_COLLAPSE_TOGGLED
} from '../../common/actionTypes'

const initialState = {
    selectedClient: null,
    selectedModule: null,
    isNew: false,
    isSelected: false,
    isCopy: false,
    smallKey: 0,
	originalComponent: null,
    disableRowClick: false,
    deleted: false,
    selectedButton: '',
    saveFinished: false,
    readOnly: true,
    selectedComponentsIDs: [],
	removedComponentsIDs: [],
	selectedComponent: null,
	treeData: [],
	expandedList: [],
	toBeRemoved: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLIENT_STARTED:
            return { ...state}
        case GET_CLIENT_SUCCESS:
            return { ...state, isNew: false,isSelected: true, selectedClient : action.client}
        case SAVE_CLIENT_SUCCESS:
            return { ...state, isNew: false,saveFinished: true,selectedButton: 'info', disableRowClick: false, isSelected: true, selectedClient: action.client, readOnly: true, selectedModule:null }
        case SET_SELECTED_CLIENT:
            return {...state, isSelected: true, selectedClient: action.client, saveFinished: false}
        case ADD_CLIENT:
            return { ...state, selectedButton: 'info', isNew: true,disableRowClick: false, isSelected: true, saveFinished: false, selectedClient: action.client, readOnly: false  }
        case CLIENT_SELECTED_MODULE:
            return {...state, selectedModule: action.selectedModule, isSelected: true, readOnly: false}
        case DELETE_CLIENT_SUCCESS:
            return { ...state, deleted: true, isSelected: false, selectedClient: null, readOnly: true, disableRowClick: false }
        case CANCEL_CLIENT:
            return { ...state,  disableRowClick: false, isSelected: false, isCopy: false, isNew: false, selectedClient: null , readOnly: true }
        case UPDATE_CLIENT_WITH_COMPONENT_TRIGGER:
            return {...state, comp: action.data}
        case UPDATE_CLIENT_WITH_COMPONENT_STARTED:
            return {...state, selectedClient: action.selectedClient, smallKey: Date.now()}
       case UPDATE_CLIENT_COMPONENT_WITH_PROPERTIES_TRIGGER:
           return {...state, selectedClient: action.selectedClient, smallKey: Date.now()}
        case UPDATE_CLIENT_WITH_MODULE_TRIGGER:
            return {...state, module: action.data}
        case UPDATE_CLIENT_WITH_MODULE_STARTED:
            return {...state, selectedClient: action.selectedClient, smallKey: Date.now()}
        case BUTTON_UPDATE:
            return { ...state, selectedButton: action.buttonName }
        case MAKE_CLIENT_EDITABLE:
            return { ...state, readOnly: false, disableRowClick: true }
        case UPDATE_COMPONENT_SELECTION_IDS:
            return {...state, selectedComponentsIDs: action.selectedComponentsIDs, removedComponentsIDs: action.removedComponentsIDs}
        case UPDATE_CLIENTS_COMPONENT_TREE_DATA:
            return {...state, treeData: action.treeData}
	    case UPDATE_CLIENTS_UNSELECTED_IDS:
	    	return {...state, toBeRemoved: action.toBeRemoved}
	    case CLIENTS_COMPONENT_SELECTED:
	        return {...state, selectedComponent: action.selectedComponent, path: action.path, originalComponent: action.originalComponent}
	    case CLIENTS_COMPONENT_TREE_COLLAPSE_TOGGLED:
	    	return {...state, expandedList: action.expandedList}
        default:
            return state
    }
}
