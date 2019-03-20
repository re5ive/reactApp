import {
    GET_FLIGHTSCHEDULES_STARTED, RESET_FLIGHTSCHEDULES, GET_FLIGHTSCHEDULES_SUCCESS,
    GET_FLIGHTSCHEDULES_FAILED, PUSH_FLIGHTSCHEDULE, GET_TELEXES_STARTED, GET_TELEXES_SUCCESS,
    FLIGHT_GRID_SET_SELECTED_FLIGHT, FLIGHT_GRID_TAB_CHANGED, UPDATE_HOME_AIRPORT,
    UPDATE_TIME_ZONE
} from '../../common/actionTypes'
import  moment from 'moment-timezone'
/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    arrivalFlightData: [],
    departureFlightData: [],
    turnaroundFlightData: [],
    isFetching: false,
    telexesData: [],
    updatedFlights: null,
    error: false,
    fullLoad: false,
    lastUpdatedRow: { from: null, to: null }
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_FLIGHTSCHEDULES_STARTED:
            return {
                ...state, isFetching: true,
                fullLoad:true
            }
        case GET_FLIGHTSCHEDULES_SUCCESS:
            return {
                ...state, isFetching: false, arrivalFlightData: action.arrivalFlightSchedules
                , departureFlightData: action.departureFlightSchedules
                , turnaroundFlightData: action.turnaroundFlightSchedules,
                fullLoad: true
            };
        case GET_FLIGHTSCHEDULES_FAILED:
            return {
                ...state, isFetching: false, error: true,
                fullLoad: true
            };
        case UPDATE_HOME_AIRPORT:
            return { ...state, fullLoad: true}
        case UPDATE_TIME_ZONE:
            return { ...state, fullLoad: false }
        case PUSH_FLIGHTSCHEDULE:
            const flightSchedule = action.flightSchedule
            const activeTab = action.activeTab
            const fromDate = action.fromDate
            const toDate = action.toDate
            //let flightSchedules = state.data.slice(0)
            //flightSchedules = findAndUpdate(flightSchedules, flightSchedule) // A->T or D->T or T->A & T-> D

            let arrivalFlightSchedule = state.arrivalFlightData
            let departureFlightSchedule = state.departureFlightData
            let turnaroundFlightSchedule = state.turnaroundFlightData
            //let fligthSchedules = state.data

            let arrivalFlightData = state.arrivalFlightData
            let departureFlightData = state.departureFlightData
            let turnaroundFlightData = state.turnaroundFlightData


            let previousProcessType = ""
            let flightScheduleProcessType = flightSchedule.processType

            let existingInTurnaroundFlights = turnaroundFlightSchedule.find(x => ((x.arrivalFlightRefNo === flightSchedule.arrivalFlightRefNo || x.departureFlightRefNo === flightSchedule.departureFlightRefNo) && x.processType === 'T'))

            if (typeof existingInTurnaroundFlights !== 'undefined' && existingInTurnaroundFlights !== null) {
                previousProcessType = existingInTurnaroundFlights.processType
            }

            if (previousProcessType !== "" && previousProcessType !== flightScheduleProcessType && previousProcessType === "T" && activeTab === 'T') {
                //remove flight from turnaround
                turnaroundFlightSchedule = turnaroundFlightSchedule.filter((fs, idx) => {
                    return (fs.departureFlightRefNo !== flightSchedule.departureFlightRefNo && fs.arrivalFlightRefNo !== flightSchedule.arrivalFlightRefNo && fs.processType === 'T')
                })
            }

            if (flightSchedule.arrivalFlightRefNo !== null && activeTab === 'A') {
                if (moment(flightSchedule.arrivalBestInBlockTime).isBetween(fromDate, toDate)) {
                    let arrivalFound = false
                    arrivalFlightData = arrivalFlightSchedule.map((fs, idx) => {
                        const foundArrivalFlight = flightSchedule.arrivalFlightRefNo !== null
                            && fs.arrivalFlightRefNo === flightSchedule.arrivalFlightRefNo
                            && fs.homeAirport === flightSchedule.homeAirport;
                        if (foundArrivalFlight) {
                            arrivalFound = true
                            flightSchedule.id = flightSchedule.arrivalFlightRefNo
                            return flightSchedule
                        }
                        else
                            return fs
                    })
                    if (!arrivalFound) {
                        flightSchedule.id = flightSchedule.arrivalFlightRefNo
                        arrivalFlightData.push(flightSchedule)
                    }
                }
            }

            if (flightSchedule.departureFlightRefNo !== null && activeTab === 'D') {
                if (moment(flightSchedule.departureBestOffBlockTime).isBetween(fromDate, toDate)) {
                    let departureFound = false
                    departureFlightData = departureFlightSchedule.map((fs, idx) => {
                        const foundDepartureFlight = flightSchedule.departureFlightRefNo !== null
                            && fs.departureFlightRefNo === flightSchedule.departureFlightRefNo
                            && fs.homeAirport === flightSchedule.homeAirport;
                        if (foundDepartureFlight) {
                            departureFound = true
                            flightSchedule.id = flightSchedule.departureFlightRefNo
                            return flightSchedule
                        }
                        else
                            return fs
                    })
                    if (!departureFound) {
                        flightSchedule.id = flightSchedule.departureFlightRefNo
                        departureFlightData.push(flightSchedule)
                    }
                }
            }

            if (flightSchedule.departureFlightRefNo !== null && flightSchedule.processType === 'T' && activeTab === 'T') {
                if ((flightSchedule.departureBestOffBlockTime !== null && moment(flightSchedule.departureBestOffBlockTime).isBetween(fromDate, toDate)) ||
                    (flightSchedule.arrivalBestInBlockTime !== null && moment(flightSchedule.arrivalBestInBlockTime).isBetween(fromDate, toDate))) {
                    let turnaroundFound = false
                    turnaroundFlightData = turnaroundFlightSchedule.map((fs, idx) => {
                        const foundDepartureFlight = flightSchedule.departureFlightRefNo !== null
                            && fs.departureFlightRefNo === flightSchedule.departureFlightRefNo
                            && fs.homeAirport === flightSchedule.homeAirport;
                        const foundArrivalFlight = flightSchedule.arrivalFlightRefNo !== null
                            && fs.arrivalFlightRefNo === flightSchedule.arrivalFlightRefNo
                            && fs.homeAirport === flightSchedule.homeAirport;
                        if (foundDepartureFlight || foundArrivalFlight) {
                            turnaroundFound = true
                            flightSchedule.id = flightSchedule.departureFlightRefNo + 'T'
                            return flightSchedule
                        }
                        else
                            return fs
                    })
                    if (!turnaroundFound) {
                        flightSchedule.id = flightSchedule.departureFlightRefNo + 'T'
                        turnaroundFlightData.push(flightSchedule)
                    }
                    turnaroundFlightData = Array.from(new Set(turnaroundFlightData));
                }
            }
            else if (flightSchedule.departureFlightRefNo !== null && previousProcessType === 'T' && flightSchedule.processType !== 'T' && activeTab === 'T') {
                turnaroundFlightData = turnaroundFlightSchedule
            }
            return {
                ...state, arrivalFlightData: arrivalFlightData, departureFlightData: departureFlightData, turnaroundFlightData: turnaroundFlightData, fullLoad: true
            }
        case FLIGHT_GRID_SET_SELECTED_FLIGHT:
            return { ...state,fullLoad: false  }
        case FLIGHT_GRID_TAB_CHANGED:
            return {  ...state, fullLoad: false  }
        case RESET_FLIGHTSCHEDULES:
            return {...initialState}
        case GET_TELEXES_STARTED:
            return {...state, telexesData: null}
        case GET_TELEXES_SUCCESS:
            return {...state, telexesData: action.telexes}
        default:
            return state;
    }
}

