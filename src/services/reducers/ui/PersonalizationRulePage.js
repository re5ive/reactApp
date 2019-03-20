import {
    GET_PERSONALIZATION_RULE_STARTED, GET_PERSONALIZATION_RULE_SUCCESS, ADD_PERSONALIZATION_RULE,
    COPY_PERSONALIZATION_RULE, CANCEL_PERSONALIZATION_RULE, MAKE_PERSONALIZATION_RULE_EDITABLE,
    DELETE_PERSONALIZATION_RULE_SUCCESS, SAVE_PERSONALIZATION_RULE_SUCCESS,
    GET_PERSONALIZATION_RULE_ACTIONS_SUCCESS,SELECTED_PERSONALIZATION_RULE, GET_ALL_FIELDS_PERSONALIZATION_RULE_SUCCESS,
    GET_FUNCTIONS_PERSONALIZATION_RULE_SUCCESS, GET_FUNCTIONS_PERSONALIZATION_RULE_STARTED,CLOSE_SMARTR_RULE,
    UPDATE_FUCNTIONS_PERSONALIZATION_RULE, GET_FIELD_MAPPING_SUCCESS, GET_PERSONALIZATION_RULES_STARTED
} from '../../common/actionTypes'
const initialState = {
    selectedPersonlizationRule: null,
    busRuleActions: null,
    getPersonalizationRuleStarted: false,
    allFields: null,
    fieldMapping: {suggestions: null, formulae: null},
    isNew: false,
    isCopy: false,
    isSelected: false,
    readOnly: true,
    sources: [],
    objects:[],
    groupSuggestions: [],
    expectedTokens:[],
    functions: null,
    serviceTypes: [{ id: 0, code: 'ALL' }],
    selectedNatureCodes: [{ id: 0, code: 'ALL' }],
    homeAirport: [{ key: 0, name: 'ALL' }],
    status: [{ id: 0, name: 'ALL' }],
    clonedPersonlizationRuleObject: {},
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_PERSONALIZATION_RULES_STARTED:
            return { ...state, isSelected: false, selectedPersonlizationRule: null}
        case GET_FIELD_MAPPING_SUCCESS:
            return { ...state, fieldMapping: action.data, sources:action.sources, objects:action.objects, groupSuggestions:action.groupSuggestions, expectedTokens: action.expectedTokens }
        case GET_PERSONALIZATION_RULE_STARTED:
            return { ...state, isSelected: false, getPersonalizationRuleStarted: true, selectedPersonlizationRule: null, isNew: false }
        case GET_PERSONALIZATION_RULE_SUCCESS:
            let selectedPersonlizationRule = action.personalizationRule
            return { ...state, isNew: false, isSelected: true, selectedPersonlizationRule, clonedPersonlizationRuleObject:action.clonedPersonlizationRuleObject, readOnly: true , getPersonalizationRuleStarted: false}
        case SELECTED_PERSONALIZATION_RULE:
            return {...state, isSelected: true, selectedPersonlizationRule: action.personalizationRule, readOnly: true}
        case GET_PERSONALIZATION_RULE_ACTIONS_SUCCESS:
            let busRuleActions = action.busRuleActions
            return { ...state, busRuleActions }
        case SAVE_PERSONALIZATION_RULE_SUCCESS:
            return { ...state, isNew: false, isSelected: true, isCopy: false, selectedPersonlizationRule: action.personalizationRule, clonedPersonlizationRuleObject: action.clonedPersonlizationRuleObject, readOnly: true  }
        case ADD_PERSONALIZATION_RULE:
            return { ...state, isNew: true, isSelected: true, selectedPersonlizationRule: action.personalizationRule, readOnly: false  }
        case DELETE_PERSONALIZATION_RULE_SUCCESS:
            return { ...state, isSelected: false, selectedPersonlizationRule: null, readOnly: true }
        case CANCEL_PERSONALIZATION_RULE:
            return { ...state,  isSelected: true, isCopy: false, isNew: false,  readOnly: true }
        case CLOSE_SMARTR_RULE:
            return { ...state,  isSelected: false,selectedPersonlizationRule: null, isCopy: false, isNew: false,  readOnly: true }
        case MAKE_PERSONALIZATION_RULE_EDITABLE:
            return { ...state,  readOnly: false }
        case GET_ALL_FIELDS_PERSONALIZATION_RULE_SUCCESS:
            return { ...state, allFields: action.fields }
        case COPY_PERSONALIZATION_RULE:
            return { ...state, isCopy: true, isNew: true, isSelected: true, readOnly: false, selectedPersonlizationRule: action.personalizationRule }
        case GET_FUNCTIONS_PERSONALIZATION_RULE_STARTED:
            return { ...state, functions: null}
        case GET_FUNCTIONS_PERSONALIZATION_RULE_SUCCESS:
            return { ...state, functions: action.functions }
        case UPDATE_FUCNTIONS_PERSONALIZATION_RULE:
            let updatedPersonlizationRule = action.personalizationRule
            return { ...state, selectedPersonlizationRule: updatedPersonlizationRule }
        default:
            return {
                ...state
            }
    }
}
