import {
    FDM_TELEX_RECEIVED_FLIGHT_SET_NULL,
    GET_FDM_TELEX_FLIGHT_SCHEDULES_FAILED,
    PUSH_FDM_TELEX_FLIGHT_SCHEDULE,
    RECEIVE_FDM_TELEX_RULE_STATUS,
    FDM_TELEX_FLIGHT_GRID_SET_SELECTED_FLIGHT,
    UPDATE_HOME_AIRPORT,
    GET_TELEX_FDM_FLIGHT_SCHEDULES_SUCCESS,
    GET_TELEX_FDM_FLIGHT_SCHEDULES_STARTED,
    GET_AUTHORIZED_TILES_SUCCESS,
    UPDATE_TIME_ZONE,
    ADD_COMPONENT_PROPERTY_USER_PREFERENCES,
	FDM_TELEX_FLIGHT_GRID_TAB_CHANGED,
    SET_FDM_TELEX_SELECTED_FLIGHT,
    REFRESH_TELEX_FDM_FLIGHT_SCHEDULES_SUCCESS} from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    receivedFlight: null,
    receivedRuleStatus: null,
    error: false,
    fullLoad: false,
    lastUpdatedRow: {from: null, to: null}
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case FDM_TELEX_FLIGHT_GRID_TAB_CHANGED:
            return {...state, data: []}
        case GET_AUTHORIZED_TILES_SUCCESS:
            return{ ...state, data: []}
        case GET_TELEX_FDM_FLIGHT_SCHEDULES_STARTED:
            return { ...state, isFetching: true, receivedFlight: null, receivedRuleStatus: null}
        case GET_TELEX_FDM_FLIGHT_SCHEDULES_SUCCESS:
            let flightScheduleList = action.flightSchedules.map(fs => {
                const fields = fs.fltOpsFieldsMap
                return { ...fields, extraInfos:fs.extraInfos, clonedRotFlightBusinessRuleViewList: fs.clonedRotFlightBusinessRuleViewList, dqcsStatus: fs.dqcsStatus, rotDqcsStatus: fs.rotDqcsStatus, flightBusinessRuleViewList: fs.flightBusinessRuleViewList, rotFlightBusinessRuleViewList: fs.rotFlightBusinessRuleViewList }
            });
            return { ...state, isFetching: false, data: flightScheduleList, receivedFlight: null, fullLoad: true, receivedRuleStatus: null}
        case REFRESH_TELEX_FDM_FLIGHT_SCHEDULES_SUCCESS:
            return { ...state, isFetching: false, data: action.flightSchedules, receivedFlight: null, fullLoad: true, receivedRuleStatus: null}
        case GET_FDM_TELEX_FLIGHT_SCHEDULES_FAILED:
            return { ...state, isFetching: false, error: true, receivedFlight: null, fullLoad: false, receivedRuleStatus: null}
        case RECEIVE_FDM_TELEX_RULE_STATUS:
            return { ...state, isFetching: false, error: true, receivedFlight: null, fullLoad: false, receivedRuleStatus: action.ruleStatus }
        case FDM_TELEX_FLIGHT_GRID_SET_SELECTED_FLIGHT:
            return { ...state, fullLoad: false }
        case UPDATE_HOME_AIRPORT:
            return { ...state, fullLoad: false }
        case UPDATE_TIME_ZONE:
            return { ...state, fullLoad: false }
        case PUSH_FDM_TELEX_FLIGHT_SCHEDULE:
            const flightSchedule = action.flightSchedule
            let fields = flightSchedule.fltOpsFieldsMap
            fields = {
                ...fields, extraInfos:flightSchedule.extraInfos
            }
            const flightSchedules = state.data.slice(0)
            const flightIndex = flightSchedules.findIndex(f => f.pkFltId === flightSchedule.id)
            if (flightIndex > -1) {
                flightSchedules[flightIndex]={ ...fields}
            } else {
                flightSchedules.push({ ...fields})
            }
            return { ...state, data: flightSchedules , receivedFlight: { ...fields}, fullLoad: false}
        case SET_FDM_TELEX_SELECTED_FLIGHT:
            return { ...state, receivedFlight: null, fullLoad: false }
        case FDM_TELEX_RECEIVED_FLIGHT_SET_NULL:
            return { ...state, receivedFlight: null, receivedRuleStatus: null, fullLoad: false }
        case ADD_COMPONENT_PROPERTY_USER_PREFERENCES:
            return { ...state, fullLoad: false }
        default:
            return state
    }
}
