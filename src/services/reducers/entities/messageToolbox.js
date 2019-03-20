/**
 *  @fileOverview v2 Write what's going on in the file here.
 *  @file         messageToolbox Created at 7/10/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import {
    GET_TOOLBOX_DEPLOYS_STARTED,
    GET_TOOLBOX_DEPLOYS_SUCCESS,
    GET_TOOLBOX_DEPLOYS_FAILED,
    SAVE_TOOLBOX_DEPLOY_SUCCESS,
    DELETE_TOOLBOX_DEPLOY_SUCCESS,
    PUSH_TOOLBOX_DEPLOY,
    MESSAGE_TOOLBOX_GET_ALL_MESSAGES_STARTED,
	MESSAGE_TOOLBOX_GET_ALL_MESSAGES_SUCCESS,
    MESSAGE_TOOLBOX_ADD_NEW_MESSAGE,
    START_TOOLBOX_DEPLOYS_SUCCESS,
   // START_TOOLBOX_DEPLOYS_STARTED,
    STOP_TOOLBOX_DEPLOYS_SUCCESS,
  //  STOP_TOOLBOX_DEPLOYS_STARTED,
} from '../../common/actionTypes'

const initialState = {
    data: [],
    messages: [],
    isFetching: false,
    error: false,
    dataLoaded: false,
    toolboxDeploy: null
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case MESSAGE_TOOLBOX_GET_ALL_MESSAGES_STARTED:
			return {...state, messages: []};
		case MESSAGE_TOOLBOX_GET_ALL_MESSAGES_SUCCESS:
			return {...state, messages: action.messages.slice()}
        case MESSAGE_TOOLBOX_ADD_NEW_MESSAGE:
	        return {...state, messages: action.messages}
        case GET_TOOLBOX_DEPLOYS_STARTED:
            return { ...state, isFetching: true, data: [] }
        case GET_TOOLBOX_DEPLOYS_SUCCESS:
            return {
                ...state, isFetching: false, data: action.toolboxDeploys, dataLoaded: true
            }
        case GET_TOOLBOX_DEPLOYS_FAILED:
            return { ...state, isFetching: false, error: true }
        case SAVE_TOOLBOX_DEPLOY_SUCCESS:
            let toolboxDeploys = state.data.slice(0)
            let updated = false
            toolboxDeploys = toolboxDeploys.map(toolboxDeploy => {
                if (toolboxDeploy.id === action.toolboxDeploy.id) {
                    updated = true
                    return action.toolboxDeploy
                } else {
                    return toolboxDeploy
                }
            })
            if (!updated) {
                toolboxDeploys.push(action.toolboxDeploy)
            }
            return { ...state, isFetching: false, data: toolboxDeploys, dataLoaded: true }
        case DELETE_TOOLBOX_DEPLOY_SUCCESS:
            const _toolboxDeploys = state.data.filter(toolboxDeploy => toolboxDeploy.id !== action.id)
            return { ...state, isFetching: false, data: _toolboxDeploys, deleted: true, dataLoaded: true }
        case PUSH_TOOLBOX_DEPLOY:
            let tDeploys = state.data.slice(0)
            let modified = false
            tDeploys = tDeploys.map(tDeploy => {
                if (tDeploy.id === action.tDeploy.id) {
                    modified =true
                    return action.tDeploy
                } else {
                    return tDeploy
                }
            })
            if (!modified) {
                tDeploys.push(action.tDeploy)
            }
            return { ...state, isFetching: false, data: tDeploys, dataLoaded: true }
        case START_TOOLBOX_DEPLOYS_SUCCESS:
            let allDeploys = state.data.slice(0)
            allDeploys = allDeploys.map(tDeploy => {
                if (tDeploy.id === action.toolboxDeloy.id) {
                    return action.toolboxDeloy
                } else {
                    return tDeploy
                }
            })
            return { ...state, isFetching: false, data: allDeploys, dataLoaded: true }
        case STOP_TOOLBOX_DEPLOYS_SUCCESS:
            let allDeployItems = state.data.slice(0)
            allDeployItems = allDeployItems.map(tDeploy => {
                if (tDeploy.id === action.toolboxDeloy.id) {
                    return action.toolboxDeloy
                } else {
                    return tDeploy
                }
            })
            return { ...state, isFetching: false, data: allDeployItems, dataLoaded: true }
        default:
            return state;
    }
}
