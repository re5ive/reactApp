import { GET_PERSONALIZATION_RULES_STARTED, GET_PERSONALIZATION_RULES_SUCCESS, GET_PERSONALIZATION_RULES_FAILED, SAVE_PERSONALIZATION_RULE_SUCCESS, DELETE_PERSONALIZATION_RULE_SUCCESS } from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
    customFilter: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_PERSONALIZATION_RULES_STARTED:
            return { ...state, isFetching: true, data: [] }
        case GET_PERSONALIZATION_RULES_SUCCESS:
            return { ...state, isFetching: false, data: action.persoRules, customFilter: action.customFilter }
        case GET_PERSONALIZATION_RULES_FAILED:
            return {...state, isFetching: false, error: true}
        case SAVE_PERSONALIZATION_RULE_SUCCESS:
            let personalizationRules = state.data.slice(0)
            let updated = false
            personalizationRules = personalizationRules.map(personalizationRule => {
                if (personalizationRule.id === action.personalizationRule.id) {
                    updated =true
                    return action.personalizationRule
                } else {
                    return personalizationRule
                }
            })
            if (!updated) {
                personalizationRules.push(action.personalizationRule)
            }
            return { ...state, isFetching: false, data: personalizationRules }
        case DELETE_PERSONALIZATION_RULE_SUCCESS:
            const _personalizationRules = state.data.filter(personalizationRule => personalizationRule.id !== action.id)
            return { ...state, isFetching: false, data: _personalizationRules }
        default:
            return state;
    }
}