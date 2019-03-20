import {
    ADD_DQCS_BUSINESS_RULE, COPY_DQCS_BUSINESS_RULE, CANCEL_DQCS_BUSINESS_RULE, GET_DQCS_BUSINESS_RULES_STARTED,
    GET_DQCS_BUSINESS_RULE_STARTED, GET_DQCS_BUSINESS_RULE_SUCCESS,
    DELETE_DQCS_BUSINESS_RULE_SUCCESS, SAVE_DQCS_BUSINESS_RULE_SUCCESS,
    MAKE_DQCS_BUSINESS_RULE_EDITABLE, COPY_DQCS_BUSINESS_RULE_STARTED, SET_SELECTED_DQCS_BUSINESS_RULE,CLOSE_FILTERBOX,
    OPEN_FILTERBOX,CLOSE_DQCS_BUSINESS_RULE
} from '../../common/actionTypes'

const initialState = {
    selectedDqcsBusRule: null,
    busRuleActions: null,
    allFields: null,
    fieldMapping: { suggestions: null, formulae: null },
    isNew: false,
    isCopy: false,
    isSelected: false,
    readOnly: true,

    openFilterBox: false,
    disableRowClick: false,
    saveFinished: false,
    deleted: false,
    clonedDqcsBusRuleObject: {},
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_DQCS_BUSINESS_RULE_STARTED:
            return { ...state, isNew: false, disableRowClick: false, }
        case GET_DQCS_BUSINESS_RULE_SUCCESS:
            return { ...state, isNew: false, disableRowClick: true, isSelected: true, selectedDqcsBusRule: action.dqcsBusinessRule, clonedDqcsBusRuleObject: action.clonedDqcsBusRuleObject,readOnly: false, saveFinished: false }
        case SET_SELECTED_DQCS_BUSINESS_RULE:
            return { ...state, isSelected: true, selectedDqcsBusRule: action.dqcsBusinessRule, readOnly: true, saveFinished: false   }
        case SAVE_DQCS_BUSINESS_RULE_SUCCESS:
            return { ...state, isNew: false, disableRowClick: false, isCopy: false, isSelected: true, selectedDqcsBusRule: action.dqcsBusRule, clonedDqcsBusRuleObject: action.clonedDqcsBusRuleObject, readOnly: true, saveFinished: true  }
        case GET_DQCS_BUSINESS_RULES_STARTED:
            return { ...state, isSelected: false, selectedDqcsBusRule: null, readOnly: true, saveFinished: false, disableRowClick: false }
        case ADD_DQCS_BUSINESS_RULE:
            return { ...state, isNew: true, isSelected: true, selectedDqcsBusRule: action.dqcsBusinessRule, readOnly: false, saveFinished: false, disableRowClick: false }
        case DELETE_DQCS_BUSINESS_RULE_SUCCESS:
            return { ...state, isSelected: false, selectedDqcsBusRule: null, readOnly: true, deleted: true, saveFinished: false }
        case CANCEL_DQCS_BUSINESS_RULE:
            return { ...state, isSelected: true,disableRowClick: false, isCopy: false, isNew: false,  readOnly: true, saveFinished: false }
        case CLOSE_DQCS_BUSINESS_RULE:
            return { ...state, selectedDqcsBusRule: null, isSelected: false,disableRowClick: false, isCopy: false, isNew: false,  readOnly: true, saveFinished: false }
        case MAKE_DQCS_BUSINESS_RULE_EDITABLE:
            return { ...state, readOnly: false, disableRowClick: true, saveFinished: false }
        case OPEN_FILTERBOX:
            return { ...state, openFilterBox: true}
        case CLOSE_FILTERBOX:
            return { ...state, openFilterBox: false}
        case COPY_DQCS_BUSINESS_RULE:
            return { ...state, isCopy: true, isNew: false, isSelected: true, readOnly: false, selectedDqcsBusRule: action.dqcsBusinessRule, saveFinished: false }
        case COPY_DQCS_BUSINESS_RULE_STARTED:
            return { ...state, isNew: false, isSelected: false, readOnly: false, selectedDqcsBusRule: null, saveFinished: false }
        default:
            return {
                ...state
            }
    }
}