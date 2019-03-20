import {
    GET_FDM_FLIGHT_SCHEDULES_STARTED, FDM_RECEIVED_FLIGHT_SET_NULL, GET_FDM_FLIGHT_SCHEDULES_SUCCESS, GET_FDM_FLIGHT_SCHEDULES_FAILED, PUSH_FDM_FLIGHT_SCHEDULE, RECEIVE_FDM_RULE_STATUS,
    FDM_FLIGHT_GRID_SET_SELECTED_FLIGHT, UPDATE_HOME_AIRPORT,
    UPDATE_TIME_ZONE,
    ADD_COMPONENT_PROPERTY_USER_PREFERENCES} from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    data: [],
    isFetching: false,
    receivedFlight: null,
    receivedRuleStatus: null,
    error: false,
    fullLoad:false,
    lastUpdatedRow: {from: null, to: null}
}

// const findAndUpdate = (flightSchedules, flightSchedule) => {
//     let indexes = [];
//     const filtered = flightSchedules.filter((fs, idx) => {
//         const foundDepartureFlight = flightSchedule.departureFlightRefNo !== null
//             && fs.departureFlightRefNo === flightSchedule.departureFlightRefNo
//             && fs.homeAirport === flightSchedule.homeAirport;
//         const foundArrivalFlight = flightSchedule.arrivalFlightRefNo !== null
//             && fs.arrivalFlightRefNo === flightSchedule.arrivalFlightRefNo
//             && fs.homeAirport === flightSchedule.homeAirport;
//         if (foundDepartureFlight || foundArrivalFlight) {
//             indexes.push(idx)
//         }
//         return (foundDepartureFlight || foundArrivalFlight)
//     })
//     //filtered.map()
//     if (filtered.length === 0) {
//         flightSchedules.push(flightSchedule)
//     } else { // Assuming that the connected flights will always have one record
//         indexes.forEach(index => flightSchedules[index] = flightSchedule)
//     }
//     return flightSchedules
// }

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case GET_FDM_FLIGHT_SCHEDULES_STARTED:
            return { ...state, isFetching: true, receivedFlight: null, receivedRuleStatus: null, fullLoad: false}
        case GET_FDM_FLIGHT_SCHEDULES_SUCCESS:
            let flightScheduleList = action.flightSchedules.map(fs => {
                const fields = fs.fltOpsFieldsMap
                return { ...fields, clonedRotFlightBusinessRuleViewList: fs.clonedRotFlightBusinessRuleViewList, dqcsStatus: fs.dqcsStatus, rotDqcsStatus: fs.rotDqcsStatus, flightBusinessRuleViewList: fs.flightBusinessRuleViewList, rotFlightBusinessRuleViewList: fs.rotFlightBusinessRuleViewList }
            });
            return { ...state, isFetching: false, data: flightScheduleList, receivedFlight: null, fullLoad: true, receivedRuleStatus: null}
        case GET_FDM_FLIGHT_SCHEDULES_FAILED:
            return { ...state, isFetching: false, error: true, receivedFlight: null, fullLoad: false, receivedRuleStatus: null}
        case RECEIVE_FDM_RULE_STATUS:
            return { ...state, isFetching: false, error: true, receivedFlight: null, fullLoad: false, receivedRuleStatus: action.ruleStatus }
        case FDM_FLIGHT_GRID_SET_SELECTED_FLIGHT:
            return { ...state, fullLoad: false }
        case UPDATE_HOME_AIRPORT:
            return { ...state, fullLoad: false }
        case UPDATE_TIME_ZONE:
            return { ...state, fullLoad: false }
        case PUSH_FDM_FLIGHT_SCHEDULE:
            const flightSchedule = action.flightSchedule
            const fields = flightSchedule.fltOpsFieldsMap
            let testExist = false
            let flightSchedules = state.data.slice(0)
            let testExistingFilght = flightSchedules.find(f => f.pkFltId === flightSchedule.id)
            if (typeof testExistingFilght !== 'undefined' && testExistingFilght !== null) {
                testExist=true
            }
            if (testExist === false) {
                flightSchedules.push(flightSchedule)
            }
            else {
                flightSchedules = flightSchedules.map(flight => {
                    if (flight.pkFltId === flightSchedule.id)
                        return { ...fields, clonedRotFlightBusinessRuleViewList: flightSchedule.clonedRotFlightBusinessRuleViewList, dqcsStatus: flightSchedule.dqcsStatus, rotDqcsStatus: flightSchedule.rotDqcsStatus, flightBusinessRuleViewList: flightSchedule.flightBusinessRuleViewList, rotFlightBusinessRuleViewList: flightSchedule.rotFlightBusinessRuleViewList }
                    else
                        return flight
                })
            }
            //flightSchedules = findAndUpdate(flightSchedules, flightSchedule) // A->T or D->T or T->A & T-> D
            return { ...state, receivedFlight: { ...fields, clonedRotFlightBusinessRuleViewList: flightSchedule.clonedRotFlightBusinessRuleViewList, dqcsStatus: flightSchedule.dqcsStatus, rotDqcsStatus: flightSchedule.rotDqcsStatus, flightBusinessRuleViewList: flightSchedule.flightBusinessRuleViewList, rotFlightBusinessRuleViewList: flightSchedule.rotFlightBusinessRuleViewList }, fullLoad: false, receivedRuleStatus: null }
        case FDM_RECEIVED_FLIGHT_SET_NULL:
            return { ...state, receivedFlight: null, receivedRuleStatus: null }
        case ADD_COMPONENT_PROPERTY_USER_PREFERENCES:
            return { ...state, fullLoad: false }
        default:
            return state
    }
}
