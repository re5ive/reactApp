import {
    GET_AIRCRAFT_BASIC_STARTED,
    SELECTED_AIRCRAFT_BASIC,
    GET_AIRCRAFT_BASIC_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    selectedAircraftBasic: null,
    isSelected: false,
    reRender: true,
    readOnly: true
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_AIRCRAFT_BASIC_STARTED:
            return { ...state, isSelected: false, selectedAircraftBasic: null, readOnly: true}
        case SELECTED_AIRCRAFT_BASIC:
            return {...state, isSelected: true, reRender: false, selectedAircraftBasic: action.aircraftBasic}
        case GET_AIRCRAFT_BASIC_SUCCESS:
            return { ...state, isNew: false, reRender: false, isSelected: true, selectedAircraftBasic : action.aircraftBasic, readOnly: true }
        default:
            return state
    }
}