/**
 *  @fileOverview v2 Write what's going on in the file here.
 *  @file         Toolbox Created at 7/10/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacBookPro
 */
import {
	MESSAGE_TOOLBOX_PARSING_PERMISSIONS_SUCCESS,
	MESSAGE_TOOLBOX_GET_SELECTED_MESSAGE_FAILED,
	MESSAGE_TOOLBOX_MAIN_TABS_SUCCESS,
	MESSAGE_TOOLBOX_GET_MESSAGE_STARTED,
	MESSAGE_TOOLBOX_FORM_TABS_SUCCESS,
	MESSAGE_TOOLBOX_SET_SELECTED_MESSAGE,
	MESSAGE_TOOLBOX_PERMISSIONS_SUCCESS,
	MESSAGE_TOOLBOX_EDIT_TOGGLE,
	MESSAGE_TOOLBOX_FORM_CHANGED,
	MESSAGE_TOOLBOX_SET_PARSING_OBJECT_TREE_LEAF_PATH,
	MESSAGE_TOOLBOX_TRIGGER_MESSAGE_SELECT,
	MESSAGE_TOOLBOX_TOGGLE_PARSING_OBJECT_LEAF_DIALOG,
	MESSAGE_TOOLBOX_TRIGGER_VARIABLE_SELECT,
	MESSAGE_TOOLBOX_SET_SELECTED_VARIABLE,
	MESSAGE_TOOLBOX_SET_VARIABLE_VALIDITY,
	MESSAGE_TOOLBOX_SET_SELECTED_VERSION,
	MESSAGE_TOOLBOX_INIT_ACTION_DIALOG,
	MESSAGE_EDIT_RESET_FORM,
	MESSAGE_TOOLBOX_SET_CLEAN_MESSAGE,
	MESSAGE_TOOLBOX_SCRIPT_COMPILE_SUCCESS,
	MESSAGE_TOOLBOX_SCRIPT_COMPILE_ERROR,
	MESSAGE_TOOLBOX_TRIGGER_SCRIPT_COMPILE,
	MESSAGE_TOOLBOX_SCRIPT_COMPILE_ERROR_DISCARD,
	MESSAGE_TOOLBOX_GET_TEST_SUCCESS,
	MESSAGE_TOOLBOX_GET_TEST_STARTED,
	MESSAGE_TOOLBOX_GET_TEST_FAILED,
	MESSAGE_TOOLBOX_TEST_ACTION_CLOSE,
	MESSAGE_TOOLBOX_MESSAGE_MUTATION_STARTED,
	MESSAGE_TOOLBOX_MESSAGE_MUTATION_ENDED,
	MESSAGE_TOOLBOX_ADD_NEW_MESSAGE
} from '../../../common/actionTypes'

const initialState = {
	formTabs: [],
	tabs: [],
	selectedMessage: null,
	selectedMessageCached: null,
	cleanedMessage: null,
	selectedRow: null,
	selectedForm: null,
	permissions: [],
	parsingTabPermissions: [],
	leafPath: [],
	actionDialog: false,
	dialogCallAction: () => { console.log('Call') },
	dialogMessage: '',
	variableValidity: null,
	selectedLeaf: null,
	selectedLeafParent: null,
	selectedVariableCached: null,
	selectedVariable: null,
	cachedTree: [],
	selectedVersion: null,
	readOnly: true,
	compiled: false,
	compileError: null,
	errorDialog: false,
	scripTestOn: false,
	scriptToTest: null,
	showTestResultDialog: false,
	testResult: null,
	requestPending: false,
	formDialog: false,
	rawMessage: null,
	fetchStarted: false,
}

export default (state = initialState, action) => {
	switch (action.type){
		case MESSAGE_TOOLBOX_MESSAGE_MUTATION_STARTED:
			return {...state, requestPending: true}
		case MESSAGE_TOOLBOX_MESSAGE_MUTATION_ENDED:
			return {...state, requestPending: false}
		//case MESSAGE_TOOLBOX_INIT_STARTED:
			//return {...initialState}
		case MESSAGE_TOOLBOX_MAIN_TABS_SUCCESS:
			return {...state, tabs: action.tabs}
		case MESSAGE_TOOLBOX_FORM_TABS_SUCCESS:
			return {...state, selectedRow: null, selectedMessageCached: null, cleanedMessage: null, selectedMessage: null, selectedVariableCached:null, selectedVersion:null, readOnly:true, formTabs: action.formTabs, selectedForm: state.selectedForm ? state.selectedForm : action.selectedForm }
		case MESSAGE_TOOLBOX_PERMISSIONS_SUCCESS:
			return {...state, permissions: action.permissions}
		case MESSAGE_TOOLBOX_PARSING_PERMISSIONS_SUCCESS:
			return {...state, parsingTabPermissions: action.permissions}
		case MESSAGE_TOOLBOX_TRIGGER_MESSAGE_SELECT:
			return {...state, selectedRow: action.selectedMessage, fetchStarted: true}
		case MESSAGE_TOOLBOX_SET_SELECTED_MESSAGE:
			return action.updateCache ? {...state,
				fetchStarted: false,
				rawMessage: action.rawMessage,
				selectedMessage: action.selectedMessage,
				selectedMessageCached: action.selectedMessage
			} : {...state, selectedMessage: action.selectedMessage}
		case MESSAGE_TOOLBOX_EDIT_TOGGLE:
			return {...state, readOnly: action.readOnly}
		case MESSAGE_TOOLBOX_FORM_CHANGED:
			return {...state, selectedForm: action.selectedForm}
		case MESSAGE_TOOLBOX_SET_PARSING_OBJECT_TREE_LEAF_PATH:
			return { ...state, selectedLeafParent: action.parent, leafPath: action.leafPath, selectedLeaf: action.selectedLeaf, cachedTree: action.cachedTree}
		case MESSAGE_TOOLBOX_TOGGLE_PARSING_OBJECT_LEAF_DIALOG:
			return {...state, formDialog: action.leafDialog}
		case MESSAGE_TOOLBOX_TRIGGER_VARIABLE_SELECT:
			return {...state, selectedVariableCached: action.selectedVariable}
		case MESSAGE_TOOLBOX_SET_SELECTED_VARIABLE:
			return {...state, selectedVariable: action.selectedVariable}
		case MESSAGE_TOOLBOX_SET_VARIABLE_VALIDITY:
			return {...state, variableValidity: action.variableValidity}
		case MESSAGE_TOOLBOX_SET_SELECTED_VERSION:
			return {...state, selectedVersion: action.version}
		case MESSAGE_TOOLBOX_INIT_ACTION_DIALOG:
			return {...state, actionDialog: action.actionDialog, dialogMessage: action.dialogMessage, dialogCallAction: action.dialogCallAction }
		case MESSAGE_EDIT_RESET_FORM:
			return {...state, selectedMessage: state.selectedMessageCached}
		case MESSAGE_TOOLBOX_SET_CLEAN_MESSAGE:
			return {...state, cleanedMessage: action.cleanedMessage}
		case MESSAGE_TOOLBOX_TRIGGER_SCRIPT_COMPILE:
			return {...state, scriptToTest: action.scriptToTest ,scripTestOn: true, compiled: !state.compiled}
		case MESSAGE_TOOLBOX_SCRIPT_COMPILE_SUCCESS:
			return {...state, compiled: action.compiled, compileError: null, scripTestOn: false}
		case MESSAGE_TOOLBOX_SCRIPT_COMPILE_ERROR:
			return {...state, compiled: false, scripTestOn: false, compileError: action.compileError, errorDialog: !state.formDialog}
		case MESSAGE_TOOLBOX_SCRIPT_COMPILE_ERROR_DISCARD:
			return {...state, errorDialog: false, compileError: null}
		case MESSAGE_TOOLBOX_GET_TEST_STARTED:
			return {...state, testResult: null, showTestResultDialog: false, requestPending: true}
		case MESSAGE_TOOLBOX_GET_TEST_FAILED:
			return {...state, testResult: null, showTestResultDialog: false, requestPending: false}
		case MESSAGE_TOOLBOX_GET_TEST_SUCCESS:
			return {...state, testResult: action.testResult, showTestResultDialog:action.showTestResultDialog, requestPending: false}
		case MESSAGE_TOOLBOX_TEST_ACTION_CLOSE:
			return {...state, showTestResultDialog: false}
		case MESSAGE_TOOLBOX_ADD_NEW_MESSAGE:
			return {...state, requestPending: false}
		case MESSAGE_TOOLBOX_GET_MESSAGE_STARTED:
			return {...state, requestPending: true}
		case MESSAGE_TOOLBOX_GET_SELECTED_MESSAGE_FAILED:
			return {...state, fetchStarted: false, requestPending: false}
		default:
			return {...state}
	}
}
