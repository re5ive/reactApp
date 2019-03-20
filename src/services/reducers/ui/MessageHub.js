/**
 * created @ 7/12/2018 2:23 PM
 * with WebStorm
 * by Mohamed Rihan <rihan.info@gmail.com>
 * for tnexus-ui-beta-3
 */

import {
    ADVANCED_FILTER_OPEN,
    ADVANCED_FILTER_CLOSE,
    MESSAGEHUB_FILTER_SUCCESS,
    CLEAR_FILTER_COLOR,
    FILTER_FLIGHT_SUCCESS,
    EXPRESSION_FILTER_OPEN,
    EXPRESSION_FILTER_CLOSE,
    GET_TELEX_STATUS_SUCCESS,
    GET_MESSAGE_TYPES_SUCCESS,
    SELECTED_FILTERED_FLIGHT_MSG,
    SELECTED_MESSAGE_TYPES,
   // RESET_MESSAGE_HUB_FILTER,
  //  RESET_DQCS_FLIGHT_FILTER
} from "../../common/actionTypes";

const initialState = {
    filterOpen: false,
    filteredFlights: [],
    expressionFilterOpen: false,
    filterColor: false,
    selectedFlight: [],
    messageType: [],
    isSelectFlight: false,
    telexStatus: [],
    selectedMessageType: []
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ADVANCED_FILTER_OPEN:
            return { ...state, filterOpen: true }
        case GET_MESSAGE_TYPES_SUCCESS:
            return {...state, messageType: action.messageType}
        case GET_TELEX_STATUS_SUCCESS:
            return {...state, telexStatus: action.telexStatus}
        case MESSAGEHUB_FILTER_SUCCESS:
            return { ...state, filterOpen: false, filterColor: true }
        case CLEAR_FILTER_COLOR:
            return { ...state, filterOpen: false, filterColor: false }
        case FILTER_FLIGHT_SUCCESS:
            return { ...state, filteredFlights: action.filteredFlight }
        case ADVANCED_FILTER_CLOSE:
            return { ...state, filterOpen: false }
        case EXPRESSION_FILTER_OPEN:
            return { ...state, expressionFilterOpen: true }
        case EXPRESSION_FILTER_CLOSE:
            return { ...state, expressionFilterOpen: false}
        case SELECTED_FILTERED_FLIGHT_MSG:
            return {...state, selectedFlight: action.selectedFltMsg, isSelectFlight: true}
        case SELECTED_MESSAGE_TYPES:
            return { ...state, selectedMessageType: action.selectedMessageType }     
        default:
            return { ...state }
    }
}
