import {

    GET_AIRCRAFT_BASICS_STARTED,
    //SELECTED_AIRCRAFT_BASIC,
    GET_AIRCRAFT_BASICS_SUCCESS

} from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    reRender: true,
    error: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_AIRCRAFT_BASICS_STARTED:
            return { ...state, reRender: true, isFetching: true, data: [] }
        // case SELECTED_AIRCRAFT_BASIC:
        // return {...state, isSelected: true, reRender: false, selectedAircraftBasic: action.aircraftBasic}
        case GET_AIRCRAFT_BASICS_SUCCESS:
            return { ...state,reRender: true, isFetching: false, data: action.aircraftBasics }
        default:
            return state;
    }
}