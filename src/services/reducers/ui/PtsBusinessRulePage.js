import {
    GET_PTS_BUS_RULE_STARTED,
    GET_PTS_BUS_RULE_SUCCESS,
    ADD_PTS_BUS_RULE,
    COPY_PTS_BUS_RULE,
    CANCEL_PTS_BUS_RULE,
    MAKE_PTS_BUS_RULE_EDITABLE,
    DELETE_PTS_BUS_RULE_SUCCESS,
    SAVE_PTS_BUS_RULE_SUCCESS,
    GET_PTS_BUS_RULES_STARTED,
    SELECTED_PTS_BUS_RULE,
    CLOSE_PTS_RULE
} from '../../common/actionTypes'
const initialState = {
    selectedPtsBusRule: null,
    allFields: null,
    fieldMapping: { suggestions: null, formulae: null },
    isNew: false,
    isCopy: false,
    isSelected: false,
    getBusinessRuleStarted: false,
    readOnly: true,
    sources: [],
    objects: [],
    groupSuggestions: [],
    expectedTokens: [],
    functions: null,
    serviceTypes: [{ id: 0, code: 'ALL' }],
    selectedNatureCodes: [{ id: 0, code: 'ALL' }],
    homeAirport: [{ key: 0, name: 'ALL' }],
    status: [{ id: 0, name: 'ALL' }],
    clonedPtsBusRuleObject: {}
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_PTS_BUS_RULE_STARTED:
            return { ...state, isSelected: false, selectedPtsBusRule: null, isNew: false, getBusinessRuleStarted: true }
        case GET_PTS_BUS_RULES_STARTED:
            return { ...state, readOnly: true , isSelected: false}
        case GET_PTS_BUS_RULE_SUCCESS:
            let selectedPtsBusRule = action.ptsBusinessRule
            return { ...state, isNew: false, isSelected: true, selectedPtsBusRule,clonedPtsBusRuleObject: action.clonedPtsBusRuleObject, readOnly: true, getBusinessRuleStarted: false }
        case SELECTED_PTS_BUS_RULE:
            return { ...state, isSelected: true, selectedPtsBusRule: action.ptsBusRule, readOnly: true }
        case SAVE_PTS_BUS_RULE_SUCCESS:
            return { ...state, isCopy: false,  isNew: false, isSelected: true, selectedPtsBusRule: action.ptsBusRule,clonedPtsBusRuleObject: action.clonedPtsBusRuleObject, readOnly: true }
        case ADD_PTS_BUS_RULE:
            return { ...state, isNew: true, isSelected: true, selectedPtsBusRule: action.ptsBusRule, readOnly: false }
        case DELETE_PTS_BUS_RULE_SUCCESS:
            return { ...state, isSelected: false, selectedPtsBusRule: null, readOnly: true }
        case CANCEL_PTS_BUS_RULE:
            return { ...state, isSelected: true, isCopy: false, isNew: false, readOnly: true }
        case CLOSE_PTS_RULE:
            return { ...state, isSelected: false, isCopy: false, isNew: false, readOnly: true, selectedPtsBusRule: null }
        case MAKE_PTS_BUS_RULE_EDITABLE:
            return { ...state, readOnly: false }
        case COPY_PTS_BUS_RULE:
            return { ...state, isCopy: true, isNew: true, isSelected: true, readOnly: false, selectedPtsBusRule: action.ptsBusinessRule }
        default:
            return {
                ...state
            }
    }
}
