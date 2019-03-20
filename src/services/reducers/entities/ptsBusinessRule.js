import { GET_PTS_BUS_RULES_STARTED, GET_PTS_BUS_RULES_SUCCESS, GET_PTS_BUS_RULES_FAILED, SAVE_PTS_BUS_RULE_SUCCESS, DELETE_PTS_BUS_RULE_SUCCESS } from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
    customFilter: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_PTS_BUS_RULES_STARTED:
            return { ...state, isFetching: true, data: [] }
        case GET_PTS_BUS_RULES_SUCCESS:
            return { ...state, isFetching: false, data: action.ptsBusRules, customFilter: action.customFilter }
        case GET_PTS_BUS_RULES_FAILED:
            return { ...state, isFetching: false, error: true }
        case SAVE_PTS_BUS_RULE_SUCCESS:
            let ptsBusRules = state.data.slice(0)
            let updated = false
            ptsBusRules = ptsBusRules.map(ptsBusRule => {
                if (ptsBusRule.id === action.ptsBusRule.id) {
                    updated = true
                    return action.ptsBusRule
                } else {
                    return ptsBusRule
                }
            })
            if (!updated) {
                ptsBusRules.push(action.ptsBusRule)
            }
            return { ...state, isFetching: false, data: ptsBusRules }
        case DELETE_PTS_BUS_RULE_SUCCESS:
            const _ptsBusRules = state.data.filter(ptsBusRule => ptsBusRule.id !== action.id)
            return { ...state, isFetching: false, data: _ptsBusRules }
        default:
            return state;
    }
}