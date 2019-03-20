import {
    DQC_CUSTOM_FILTER_CHANGE, PTS_RULE_CUSTOM_FILTER_CHANGE
} from '../../common/actionTypes'

const initialState = {
    serviceTypes: [{ id: 0, code: 'ALL' }],
    selectedNatureCodes: [{ id: 0, code: 'ALL' }],
    homeAirport: [{ key: 0, name: 'ALL' }],
    type: [{ id: 0, name: 'ALL' }],
    flightType: [{ id: 0, name: 'ALL' }],
    status: [{ id: 0, name: 'ALL' }],
    canCofirm: [{ id: 0, name: 'ALL' }],
    ignoreOnFail: [{ id: 0, name: 'ALL' }],
    arrivalTemplates: [{ id: 0, name: 'ALL' }],
    departureTemplates: [{ id: 0, name: 'ALL' }],
    turnaroundTemplates: [{ id: 0, name: 'ALL' }]
}

export default function (state = initialState, action) {

    switch (action.type) {
        case DQC_CUSTOM_FILTER_CHANGE:
            return {
                ...state, serviceTypes: action.filter.serviceTypes, selectedNatureCodes: action.filter.selectedNatureCodes,
                homeAirport: action.filter.homeAirport, type: action.filter.type, status: action.filter.status,
                flightType: action.filter.flightType, ignoreOnFail: action.filter.ignoreOnFail, canCofirm: action.filter.canCofirm
            }
        case PTS_RULE_CUSTOM_FILTER_CHANGE:
            return {
                ...state, serviceTypes: action.filter.serviceTypes, selectedNatureCodes: action.filter.selectedNatureCodes,
                homeAirport: action.filter.homeAirport, status: action.filter.status, arrivalTemplates: action.filter.arrivalTemplates,
                departureTemplates: action.filter.departureTemplates, turnaroundTemplates: action.filter.turnaroundTemplates
            }
        default:
            return {
                ...state
            }
    }
}