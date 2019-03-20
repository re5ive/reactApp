import {
    GET_ACTIVITIES_SUCCESS,
    PUSH_FLIGHT_ACTIVITIES,
    ACTIVITIES_PUSH_SUBSCRIBED,
    GET_TEMPLATES_SUCCESS,
    GET_TEMPLATE_ACTIVITIES_SUCCESS,
    GET_ACTIVITIES_HISTORY_SUCCESS,
    GANTT_CHART_RESET_ACTIVITIES,
    GANTT_CHART_SET_MODE,
    GANTT_CHART_SET_SELECTED_ACTIVITY,
    UPDATE_ACTIVITY_DURATION_AND_LAGS_SUCCESS,
    SET_SELECTED_ACTIVITY_HISTORY,
    FLIGHT_GRID_SET_SELECTED_FLIGHT
} from '../../common/actionTypes'

import { getOneLink as getAssociatedLinks } from '../../../utility/'
import {last} from 'lodash'
const getActiveLinks = (mode, selectedActivity, links) => {
    let activeLinks = links
    if (mode && selectedActivity && mode === 'arrow') {
        activeLinks = getAssociatedLinks(selectedActivity, links, true)
    } else if (mode && selectedActivity && mode === 'edit') {
        activeLinks = getAssociatedLinks(selectedActivity, links, false)
    }
    return activeLinks
}

const initialState = {
    mode: 'normal',
    activities: null,
    links: null,
    activeLinks: null,
    selectedActivity: null,
    exceptionTemplates: null,
    selectedTemplate: null,
    activitiesHistory: null,
    selectedActivityHistory: null,
    pushSubscribed: true
}

export default function (state = initialState, action) {

    let activeLinks = null
    switch (action.type) {
        case GET_ACTIVITIES_SUCCESS:
            if (action.flightActivities) {
                return {...state, activities: action.flightActivities.activities, links: action.flightActivities.links,
                    activeLinks: action.flightActivities.links}
            } else {
             return {...state}
            }
        case PUSH_FLIGHT_ACTIVITIES:
            if (state.pushSubscribed) {
                activeLinks = getAssociatedLinks(state.mode, state.selectedActivity, action.flightActivities.links)
                return {...state, activities: action.flightActivities.activities, links: action.flightActivities.links,
                    activeLinks}
            }
            return {...state}
        case ACTIVITIES_PUSH_SUBSCRIBED:
            return {...state, pushSubscribed: action.status}
        case GANTT_CHART_SET_MODE:
            let {selectedActivity, mode} = state
            selectedActivity = action.data.selectedActivity
            if (action.data.mode) {
                mode = action.data.mode
            }
            activeLinks = state.links ? getActiveLinks(mode, selectedActivity, state.links) : state.links
            return {...state, mode, selectedActivity, activeLinks}
        case UPDATE_ACTIVITY_DURATION_AND_LAGS_SUCCESS:
            return {...state, mode: 'normal'}
        case GANTT_CHART_SET_SELECTED_ACTIVITY:
            return {...state, selectedActivity: action.selectedActivity}
        case GET_TEMPLATES_SUCCESS:
            return {...state, exceptionTemplates: action.templates}
        case GET_TEMPLATE_ACTIVITIES_SUCCESS:
            return {...state, selectedTemplate: action.templateActivities}
        case GET_ACTIVITIES_HISTORY_SUCCESS:
            return {...state, activitiesHistory: action.activitiesHistory, selectedActivityHistory: last(action.activitiesHistory)}
        case SET_SELECTED_ACTIVITY_HISTORY:
            return {...state, selectedActivityHistory: action.selectedActivityHistory}
        case GANTT_CHART_RESET_ACTIVITIES:
            return initialState
        case FLIGHT_GRID_SET_SELECTED_FLIGHT:
            return {...state, mode: 'normal'}
        default:
            return {...state}
    }
}
