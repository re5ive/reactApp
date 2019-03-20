import { Criterion } from '../../../models'

import {
	GET_MASTER_DATA_HOME_AIRPORTS_SUCCESS, GET_AIRCRAFT_TYPES_SUCCESS, GET_AIRLINES_SUCCESS, GET_AIRPORTS_SUCCESS,
	GET_TERMINALS_BY_AIRPORT_SUCCESS, GET_COUNTRIES_SUCCESS, GET_SERVICE_TYPES_SUCCESS, GET_DEPARTMENTS_SUCCESS,
	GET_NATURE_CODES_SUCCESS, GET_RULE_CRITERIA_TYPES_STARTED, GET_RULE_CRITERIA_TYPES_SUCCESS,GET_MESSAGETYPE_SUCCESS,
	GET_RULE_CRITERIA_STARTED, GET_RULE_CRITERIA_SUCCESS, GET_FLIGHTS_STATUS_SUCCESS, GET_CABIN_CLASS_LIST_SUCCESS,
    GET_CABIN_CLASS_MAP_SUCCESS, GET_ALL_DESTINATION_NAMES_SUCCESS, GET_PAYMENTS_SUCCESS, UPDATE_MASTER_DATA, GET_REGISTRATION_SUCCESS, CHANGE_CUREENT_TAB,
    GET_ALL_REGISTRATIONS_SUCCESS,
    //LOCATION_CHANGE_UPDATED
} from '../../common/actionTypes'

const updateCriteriaMap = (state, action) => {

    let criteriaMap = JSON.parse(JSON.stringify(state.criteriaMap))
    let criteria = { Groups: action.data.criteria }
    const criteriaType = action.data.criteriaType
    if (criteriaType === 'aircraftType') {
        let individual = []
        state.aircraftTypes.forEach(aircraftType => individual.push(new Criterion({ id: aircraftType.id, name: aircraftType.icaoType, type: criteriaType })))
        criteria['values'] = individual
    } else if (criteriaType === 'airline') {
        let individual = []
        state.airlines.forEach(airline => individual.push(new Criterion({ id: airline.id, name: airline.icaoCode, type: criteriaType })))
        criteria['values'] = individual
    } else if (criteriaType.indexOf('Country') > -1) {
        let individual = []
        state.countries.forEach(country => individual.push(new Criterion({ id: country.id, name: country.label, type: criteriaType })))
        criteria['values'] = individual
    } else if (criteriaType === 'serviceType') {
        let individual = []
        state.serviceTypes.forEach(service => individual.push(new Criterion({ id: service.id, name: service.label, type: criteriaType })))
        criteria['values'] = individual
    } else if (criteriaType.indexOf('Airport') > -1) {
        let individual = []
        state.airports.forEach(airport => individual.push(new Criterion({ id: airport.id, name: airport.icaoCode, type: criteriaType })))
        criteria['values'] = individual
    } else if (criteriaType === 'natureCode') {
        let individual = []
        state.natureCodes.forEach(natureCode => individual.push(new Criterion({ id: natureCode.id, name: natureCode.label, type: criteriaType })))
        criteria['values'] = individual
    }
    criteriaMap[criteriaType] = criteria
    return criteriaMap
}

const updateTerminalsByAirportMap = (state, action) => {

    let terminalsByAirportMap = JSON.parse(JSON.stringify(state.terminalsByAirportMap))
    const { airportId, terminals } = action.data
    terminalsByAirportMap[airportId] = terminals
    return terminalsByAirportMap
}

const initialState = {
    departments: [],
    aircraftTypes: [],
    airlines: [],
    countries: [],
    airports: [],
    natureCodes: [],
    serviceTypes: [],
    criteriaTypes: [],
    criteriaMap: {},
    noFlightSelected: false,
    terminalsByAirportMap: {},
    flightStatuss:[],
    homeAirports: [],
    cabinClassList: [],
    cabinClassMap: [],
    destinationNames: [],
    fltPayment: [],
    messageType: [],
    registrations: [],
    masterDataUpdated: false,
    allregistrations: [],
   // tabChangeIndex:0,
    currentTab:''
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_DEPARTMENTS_SUCCESS:
            return {...state, departments: action.departments}
        case GET_AIRCRAFT_TYPES_SUCCESS:
           return {...state, aircraftTypes: action.aircraftTypes}
        case GET_AIRLINES_SUCCESS:
            return {...state, airlines: action.airlines}
        case GET_PAYMENTS_SUCCESS:
            return {...state, fltPayment: action.fltPayments}
        case GET_COUNTRIES_SUCCESS:
            return {...state, countries: action.countries}
        case GET_AIRPORTS_SUCCESS:
            return {...state, airports: action.airports}
        case GET_MESSAGETYPE_SUCCESS:
            return {...state, messageType: action.messageType}
        case GET_NATURE_CODES_SUCCESS:
            return {...state, natureCodes: action.natureCodes}
        case GET_SERVICE_TYPES_SUCCESS:
            return { ...state, serviceTypes: action.serviceTypes }
        case GET_FLIGHTS_STATUS_SUCCESS:
            return { ...state, noFlightSelected: true, flightStatuss: action.flightStatus }
        case GET_RULE_CRITERIA_TYPES_STARTED:
            return { ...state, criteriaTypes: [] }
        case GET_RULE_CRITERIA_TYPES_SUCCESS:
            return { ...state, criteriaTypes: action.criteriaTypes }
        case GET_RULE_CRITERIA_STARTED:
            return { ...state }
        case GET_RULE_CRITERIA_SUCCESS:
            return { ...state, criteriaMap: updateCriteriaMap(state, action) }
        case GET_TERMINALS_BY_AIRPORT_SUCCESS:
            return { ...state, terminalsByAirportMap: updateTerminalsByAirportMap(state, action) }
        case GET_MASTER_DATA_HOME_AIRPORTS_SUCCESS:
            return { ...state, homeAirports: action.homeAirports }
        case GET_CABIN_CLASS_LIST_SUCCESS:
            return { ...state, cabinClassList: action.cabinClassList }
        case GET_CABIN_CLASS_MAP_SUCCESS:
            return { ...state, cabinClassMap: action.cabinClassMap }
        case GET_ALL_DESTINATION_NAMES_SUCCESS:
            return { ...state, destinationNames: action.destinationNames }
        case UPDATE_MASTER_DATA:
            return { ...state, masterDataUpdated: action.masterDataUpdated }
        case GET_REGISTRATION_SUCCESS:
            return { ...state, registrations: action.data }
        case GET_ALL_REGISTRATIONS_SUCCESS:
            return { ...state, allregistrations: action.allRegistrations }
        case CHANGE_CUREENT_TAB:
            return { ...state, currentTab: action.tabName }
        //case LOCATION_CHANGE_UPDATED:
        //    let tabIndex = state.tabChangeIndex
        //    tabIndex=tabIndex+1
        //    return {
               
        //        ...state, tabChangeIndex: tabIndex }
        default:
           return state;
    }
}

