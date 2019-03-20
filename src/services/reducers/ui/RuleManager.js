import { GET_RULES_STARTED, GET_RULES_SUCCESS, GET_RULE_STARTED, GET_RULE_SUCCESS, SAVE_RULE_FAILED,
    SAVE_RULE_SUCCESS, ADD_RULE, SET_SELECTED_RULE, CANCEL_RULE, COPY_RULE, DELETE_RULE_SUCCESS, MAKE_RULE_EDITABLE,
        GET_AIRPORTS_BY_TERMINALS_SUCCESS } from '../../common/actionTypes'
import { Rule } from '../../../models'

const initialState = {
    rules: [],
    isNew: false,
    deleted: false,
    isCopy: false,
    isSelected: false,
    selectedRule: null,
    readOnly: true,
    copiedRule: null,
    saveFinished: false,
    dataLoaded: false,
    serviceTypes: [{ id: 0, code: 'ALL' }],
    selectedNatureCodes: [{ id: 0, code: 'ALL' }],
    airportsByTerminalsMap: {}
}

const updateTerminalAirport = (rule, airportsByTerminalsMap) => {

    if (rule && rule.criteria) {
        rule.criteria = rule.criteria.map(c => {
            if (c.type === 'terminal' && airportsByTerminalsMap[c.id]) {
                c.terminalAirport = airportsByTerminalsMap[c.id].airportId
            }
            return c
        })
    }
    return rule
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RULES_STARTED:
            return {...state, rules: []}
        case GET_RULES_SUCCESS:
            return { ...state, rules: action.rules,dataLoaded:true}
        case SET_SELECTED_RULE:
            return { ...state, isSelected: true, selectedRule: action.rule, readOnly: true }
        case GET_RULE_STARTED:
            return { ...state, isSelected: false, selectedRule: null, isNew: false, isCopy: false, readOnly: true }
        case GET_RULE_SUCCESS:
        case SAVE_RULE_SUCCESS:
            let rules = state.rules.slice(0)
            let updated = false
            rules = rules.map(rule => {
                if (rule.id === action.rule.id) {
                    updated = true
                    return action.rule
                } else {
                    return rule
                }
            })
            if (!updated) {
                rules.push(action.rule)
            }
            //let selectedRule = action.rule
            let selectedRule = updateTerminalAirport(action.rule, state.airportsByTerminalsMap)
            return { ...state, rules, selectedRule, isNew: false, isCopy: false, isSelected: true, saveFinished: true, readOnly: true }
        case SAVE_RULE_FAILED:
            return { ...state, isSelected: true, selectedRule: action.rule }
        case DELETE_RULE_SUCCESS:
            const _rules = state.rules.filter(rule => rule.id !== action.id)
            return { ...state, rules: _rules, isNew: false, isCopy: false, saveFinished: true, readOnly: true, deleted: true, selectedRule: null, isSelected: false}
        case ADD_RULE:
            return { ...state, selectedRule: action.rule, readOnly: false, isNew: true, isCopy: false, isSelected: true}
        case COPY_RULE:
            return { ...state, isCopy: true, readOnly: false, isNew: true, isSelected: true, copiedRule: action.rule, selectedRule: new Rule({ name: '', description: '', priority: '' }), saveFinished: true }
        case CANCEL_RULE:
            return { ...state, isNew: false, readOnly: true, isSelected: true, isCopy: false, copiedRule: null}
        case MAKE_RULE_EDITABLE:
            return { ...state, readOnly: false }
        case GET_AIRPORTS_BY_TERMINALS_SUCCESS:
            let _airportsByTerminalsMap = state.airportsByTerminalsMap
            action.airportsByTerminals.forEach(terminal => {
                if (!_airportsByTerminalsMap[terminal.terminalId]) {
                    _airportsByTerminalsMap[terminal.terminalId] = terminal
                }
            })
            //let _selectedRule = state.selectedRule
            let _selectedRule = updateTerminalAirport(state.selectedRule, _airportsByTerminalsMap)
            return { ...state, selectedRule: _selectedRule, airportsByTerminalsMap: _airportsByTerminalsMap }
        default:
            return state;
    }
}
