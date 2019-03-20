import {
    GET_DQCS_BUSINESS_RULES_STARTED, GET_DQCS_HOME_AIRPORTS_STARTED, GET_DQCS_HOME_AIRPORTS_SUCCESS,
    GET_DQCS_BUSINESS_RULES_SUCCESS, GET_DQCS_BUSINESS_RULES_FAILED, SAVE_DQCS_BUSINESS_RULE_SUCCESS, DELETE_DQCS_BUSINESS_RULE_SUCCESS,
    GET_DQCS_SERVICE_TYPE_AND_NATURE_CODE_STARTED, GET_DQCS_SERVICE_TYPE_AND_NATURE_CODE_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    data: [],
    homeAirports: [],
    serviceTypes: [],
    isFetching: false,
    error: false,
    dataLoaded: false,
    customFilter:false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_DQCS_HOME_AIRPORTS_STARTED:
            return { ...state, homeAirports: [] }
        case GET_DQCS_HOME_AIRPORTS_SUCCESS:
            return { ...state, homeAirports: action.homeAirports }
        case GET_DQCS_SERVICE_TYPE_AND_NATURE_CODE_STARTED:
            return { ...state, serviceTypes: [] }
        case GET_DQCS_SERVICE_TYPE_AND_NATURE_CODE_SUCCESS:
            return { ...state, serviceTypes: action.serviceTypes }
        case GET_DQCS_BUSINESS_RULES_STARTED:
            return { ...state, isFetching: true, data: [] }
        case GET_DQCS_BUSINESS_RULES_SUCCESS:
            return {
                ...state, isFetching: false, data: action.dqcsBusRules, dataLoaded: true, customFilter: action.customFilter  }
        case GET_DQCS_BUSINESS_RULES_FAILED:
            return {...state, isFetching: false, error: true}
        case SAVE_DQCS_BUSINESS_RULE_SUCCESS:
            let dqcsBusinessRules = state.data.slice(0)
            let updated = false
            dqcsBusinessRules = dqcsBusinessRules.map(dqcsBusinessRule => {
                if (dqcsBusinessRule.id === action.dqcsBusRule.id) {
                    updated =true
                    return action.dqcsBusRule
                } else {
                    return dqcsBusinessRule
                }
            })
            if (!updated) {
                dqcsBusinessRules.push(action.dqcsBusRule)
            }
            return { ...state, isFetching: false, data: dqcsBusinessRules }
        case DELETE_DQCS_BUSINESS_RULE_SUCCESS:
            const _dqcsBusinessRules = state.data.filter(dqcsBusinessRule => dqcsBusinessRule.id !== action.id)
            return { ...state, isFetching: false, data: _dqcsBusinessRules, deleted: true }
        default:
            return state;
    }
}