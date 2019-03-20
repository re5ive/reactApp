import {
    GET_GROUP_STARTED, GET_GROUP_SUCCESS,SELECTED_GROUP, ADD_GROUP, CANCEL_GROUP, DELETE_GROUP_SUCCESS, SAVE_GROUP_SUCCESS,
    GET_AIRPORTS_BY_TERMINALS_SUCCESS, DISPLAY_MEMBER_PANEL, MAKE_GROUP_EDITABLE } from '../../common/actionTypes'

const initialState = {
    selectedGroup: null,
    airportsByTerminalsMap: {},
    isNew: false,
    readOnly: true,
    showMembersWidget: false,
    isSelected: false,
    saveFinished: false
}

const updateAirportName = (group, airportsByTerminalsMap) => {
    if (group && group.type === "terminal" && group.members) {
        group = JSON.parse(JSON.stringify(group))
        group.members = group.members.map(member => {
            if (member && airportsByTerminalsMap[member.id]) {
                member.label = airportsByTerminalsMap[member.id].airportName + " - " + member.name
            }
            return member
        })
    }
    return group
}
export default function (state = initialState, action) {

    switch (action.type) {
        case GET_GROUP_STARTED:
            return { ...state,showMembersWidget: false, isSelected: false, selectedGroup: null, isNew: false, readOnly: true  }
        case GET_GROUP_SUCCESS:
            let selectedGroup = updateAirportName(action.group, state.airportsByTerminalsMap)
            return { ...state, isNew: false, isSelected: true, selectedGroup, readOnly: true}
        case SAVE_GROUP_SUCCESS:
            return { ...state, isNew: false, showMembersWidget: false, isSelected: true, selectedGroup: action.group, saveFinished: true, readOnly: true }
        case SELECTED_GROUP:
            return { ...state, showMembersWidget: false, isSelected: true, selectedGroup: action.group, readOnly: true}
        case ADD_GROUP:
            return { ...state, isNew: true, isSelected: true, readOnly: false,  selectedGroup: action.group }
        case DELETE_GROUP_SUCCESS:
            return { ...state, isSelected: false, selectedGroup: null}
        case DISPLAY_MEMBER_PANEL:
            return { ...state, showMembersWidget: true }
        case MAKE_GROUP_EDITABLE:
                    return { ...state, readOnly: false }
        case GET_AIRPORTS_BY_TERMINALS_SUCCESS:
            let _airportsByTerminalsMap = state.airportsByTerminalsMap
            action.airportsByTerminals.forEach(terminal => {
                if (!_airportsByTerminalsMap[terminal.terminalId]) {
                    _airportsByTerminalsMap[terminal.terminalId] = terminal
                }
            })
            let _group = updateAirportName(state.selectedGroup, _airportsByTerminalsMap)
            return { ...state, selectedGroup: _group, airportsByTerminalsMap: _airportsByTerminalsMap }
        case CANCEL_GROUP:
            return { ...state, isNew: false, isSelected: false, selectedGroup: null, readOnly: true }
        default:
            return state
    }
}
