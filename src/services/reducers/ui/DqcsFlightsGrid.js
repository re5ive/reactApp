import {
    FDM_FLIGHT_GRID_TAB_CHANGED,
    FDM_FLIGHT_GRID_SET_SELECTED_FLIGHT,
    FDM_FLIGHT_GRID_TYPE_CHANGED,
    PUSH_FDM_FLIGHT_SCHEDULE,
    FDM_FLIGHT_GRID_RANGE_SELECTION_CHANGED,
    GET_FDM_FLIGHT_RULE_STARTED,
    GET_FDM_FLIGHT_RULE_SUCCESS,
    HTTP_ERROR_UI,
    GET_FDM_FLIGHT_SCHEDULES_SUCCESS,
    FDM_PROFILE_RULE_SELECTED,
    FDM_PROFILE_TAB_SELECTED,
    RULE_OVERRULE_SUCCESS,
    RULE_OVERRULE_FAILED,
    EPIC_ACTION_CALLED
} from '../../common/actionTypes'

import {isEqual} from 'lodash'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    activeTab: 'D',
    activeRangeSelection: 'N', /* Date Range - D, Time Range - T, No Time Range - N */
    selectedFlight: null,
    selectedType: 'Failed',
    flightCall: false,
    flightRule: null,
    isError: false,
    flightRuleRequestStarted: false,
    readOnly: true,
    serverErrorDqcs: '',
    selectedProfileRule: null,
    selectedRuleTab: 'a',
    confirmationStatus: '',
    button: 'no',
    overruleError: '',
    flightTypes: [
        {name: 'All', value: 'All'},
        {name: 'Passed', value: 'Passed'},
        {name: 'Failed', value: 'Failed'},
        { name: 'Overruled', value: 'Confirmed' },
        { name: 'Warning', value: 'Warning' }
    ],
    tabs: [
        {name: 'Arrival', value: 'A'},
        {name: 'Departure', value: 'D'},
    ]
}

const compareBoth = (selectedRule, rule) => {
    return isEqual(selectedRule, rule)
}

export default function (state = initialState, action = {}) {
    const { selectedFlight } = state
    let {selectedProfileRule} = state
    const { flightRule } = state
    switch (action.type) {
        case FDM_FLIGHT_GRID_TAB_CHANGED:
            return { ...state, flightCall: true, readOnly: true, activeTab: action.activeTab, selectedProfileRule: null, flightRule: null, confirmationStatus: '', overruleError: ''}
        case FDM_FLIGHT_GRID_TYPE_CHANGED:
            return { ...state, flightCall: true, selectedType: action.selectedType, selectedProfileRule: null, flightRule: null, confirmationStatus: '', overruleError: ''}
        case FDM_FLIGHT_GRID_SET_SELECTED_FLIGHT:
            return { ...state, flightCall: true, selectedFlight: action.flightSchedule, selectedProfileRule: action.flightSchedule ? selectedProfileRule : null, flightRule: action.flightSchedule ? flightRule : null, confirmationStatus: '', overruleError: ''}
        case PUSH_FDM_FLIGHT_SCHEDULE:
            return { ...state, selectedRuleTab: state.selectedRuleTab, confirmationStatus: '', overruleError: '' }
        //    const { flightSchedule } = action
        //    if (selectedFlight && selectedFlight.arrivalFlightRefNo === flightSchedule.arrivalFlightRefNo
        //        && selectedFlight.departureFlightRefNo === flightSchedule.departureFlightRefNo) {
        //        return {...state, readOnly: true, selectedFlight: action.flightSchedule, selectedProfileRule: null, flightRule: null}
        //    }
        //    return state
        case FDM_FLIGHT_GRID_RANGE_SELECTION_CHANGED:
            return { ...state, activeRangeSelection: action.activeRangeSelection, selectedProfileRule: null, flightRule: null, confirmationStatus: '', overruleError: '' }
        case GET_FDM_FLIGHT_SCHEDULES_SUCCESS:
            const { flightSchedules } = action
            let _flight = selectedFlight
            if (flightSchedules && selectedFlight) {
                _flight = flightSchedules.find(flight => selectedFlight.arrivalFlightRefNo === flight.arrivalFlightRefNo
                    && selectedFlight.departureFlightRefNo === flight.departureFlightRefNo)
            }
            return { ...state, selectedFlight: _flight, selectedProfileRule, flightRule: null, confirmationStatus: '', overruleError: '' }
        case GET_FDM_FLIGHT_RULE_STARTED:
            return { ...state, selectedFlight: selectedFlight, flightRuleRequestStarted: true, selectedProfileRule, confirmationStatus: '', overruleError: '', flightRule }
        case GET_FDM_FLIGHT_RULE_SUCCESS:
            const flightCall = state.flightCall
                , _selected = action.noUpdate ? (selectedProfileRule ? action.flightRule.getFirstProfileRuleById(selectedProfileRule.ruleId): action.flightRule.getFirstProfileRule()) : action.flightRule.getFirstProfileRule()
            if(!flightCall) {
                selectedProfileRule = selectedProfileRule === null || (selectedProfileRule.flightId !== action.flightRule.flightId) ?
                    _selected :
                    (compareBoth(_selected, selectedProfileRule)
                        ? selectedProfileRule :  _selected)
            }else{
                selectedProfileRule = _selected
            }
            return { ...state, flightRuleRequestStarted: false, flightRule: action.flightRule, selectedProfileRule, confirmationStatus: '', overruleError: '' }
        case FDM_PROFILE_RULE_SELECTED:
            return { ...state, selectedProfileRule: action.selectedRule, confirmationStatus: '', overruleError: '' }
        case FDM_PROFILE_TAB_SELECTED:
            return { ...state, selectedRuleTab: action.selectedRuleTab, confirmationStatus: '', overruleError: ''}
        case HTTP_ERROR_UI:
            return { ...state, serverErrorDqcs: action.errorMessage, isError: true, confirmationStatus: '', overruleError: '' }
        case RULE_OVERRULE_SUCCESS: {
            let selectedProfileRule = state.selectedProfileRule
            selectedProfileRule.ruleStatus = action.data.ruleStatus
            return { ...state, confirmationStatus: action.data.ruleStatus, selectedProfileRule: selectedProfileRule, overruleError:'' }
        }
        case RULE_OVERRULE_FAILED:
            return { ...state, confirmationStatus: '',overruleError: action.error}

        case EPIC_ACTION_CALLED:
            return {...state, button:action.data}
        default:
            return state
    }
}
