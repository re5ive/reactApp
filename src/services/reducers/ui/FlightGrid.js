import { FLIGHT_GRID_TAB_CHANGED, FLIGHT_GRID_UNSET_SELECTED_FLIGHT, FLIGHT_GRID_SET_SELECTED_FLIGHT, PUSH_FLIGHTSCHEDULE,
    FLIGHT_GRID_RANGE_SELECTION_CHANGED, GET_FLIGHTSCHEDULES_SUCCESS } from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    activeTab: 'D',
    fromDate: null,
    toDate: null,
    activeRangeSelection: 'T', /* Date Range - D, Time Range - T */
    selectedFlight: null
}

export default function (state = initialState, action = {}) {
    const { selectedFlight } = state
    switch (action.type) {
        case FLIGHT_GRID_TAB_CHANGED:
            return {...state, activeTab: action.activeTab}
        case FLIGHT_GRID_SET_SELECTED_FLIGHT:
            return {...state, selectedFlight: action.flightSchedule}
        case FLIGHT_GRID_UNSET_SELECTED_FLIGHT:
            return {...state, selectedFlight: null}
        case PUSH_FLIGHTSCHEDULE:
            const { flightSchedule } = action
            if (selectedFlight && selectedFlight.arrivalFlightRefNo === flightSchedule.arrivalFlightRefNo
                && selectedFlight.departureFlightRefNo === flightSchedule.departureFlightRefNo) {
                return {...state, selectedFlight: action.flightSchedule}
            }
            return state
        case FLIGHT_GRID_RANGE_SELECTION_CHANGED:
            return { ...state, activeRangeSelection: action.activeRangeSelection }
        case GET_FLIGHTSCHEDULES_SUCCESS:
            const { flightSchedules } = action
            let _flight = selectedFlight
            if (flightSchedules && selectedFlight) {
                _flight = flightSchedules.find(flight => selectedFlight.arrivalFlightRefNo === flight.arrivalFlightRefNo
                                                && selectedFlight.departureFlightRefNo === flight.departureFlightRefNo)
            }
            return { ...state, selectedFlight: _flight, fromDate: action.fromDate, toDate: action.toDate }
        default:
            return state
    }
}