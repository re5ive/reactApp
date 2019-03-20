/**
 * created @ 7/12/2018 2:23 PM
 * with WebStorm
 * by Mohamed Rihan <rihan.info@gmail.com>
 * for tnexus-ui-beta-3
 */

import {
    ADVANCED_FILTER_OPEN,
    ADVANCED_FILTER_CLOSE,
    ADVANCED_FILTER_EXPRESSION,
    EXPRESSION_FILTER_OPEN,
    EXPRESSION_FILTER_CLOSE,
    ADD_COMPONENT_PROPERTY_USER_PREFERENCES,
    RESET_MESSAGE_HUB_FILTER,
    RESET_DQCS_FLIGHT_FILTER

} from "../../common/actionTypes";

const initialState = {
    filterOpen: false,
    filterExpression: { arrival: null, departure: null },
    expressionFilterOpen: false,
    preferencesUpdated: false,
    resetMsgHubFilters: false,
    resetFdmTelexFilters: false
}

export default (state = initialState, action ={}) => {
    switch (action.type) {
        case ADVANCED_FILTER_OPEN:
            return { ...state, filterOpen: true, resetFdmTelexFilters: false, resetMsgHubFilters: false}
        case ADVANCED_FILTER_CLOSE:
            return { ...state, filterOpen: false, resetFdmTelexFilters: false, resetMsgHubFilters: false }
        case ADVANCED_FILTER_EXPRESSION:
            return { ...state, filterExpression: action.filterExpression }
        case EXPRESSION_FILTER_OPEN:
            return { ...state, expressionFilterOpen: true, preferencesUpdated: true, resetFdmTelexFilters: false, resetMsgHubFilters: false}
        case EXPRESSION_FILTER_CLOSE:
            return { ...state, expressionFilterOpen: false, preferencesUpdated: true, resetMsgHubFilters: false, resetFdmTelexFilters:false }
        case ADD_COMPONENT_PROPERTY_USER_PREFERENCES:
            return { ...state, preferencesUpdated: false }
        case RESET_MESSAGE_HUB_FILTER:
            return { ...state, resetMsgHubFilters: true }
        case RESET_DQCS_FLIGHT_FILTER:
            return { ...state, resetFdmTelexFilters: true }
        default:
            return {...state}
    }
}
