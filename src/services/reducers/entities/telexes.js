import {
	GET_SUMMARIZED_LOADS_START,
	GET_SUMMARIZED_LOADS_SUCCESS
	,GET_ALL_TELEX_BY_DATE_EPIC_SUCCESS,
	GET_TELEX_CONTENT_BY_ID_SUCCESS,
    GET_ALL_TELEX_BY_DATE_TRIGGERED,
    ADD_COMPONENT_PROPERTY_USER_PREFERENCES,
    MESSAGEHUB_FILTER_SUCCESS
} from "../../common/actionTypes";

const initialState = {
    loadData: [],
    fullLoad: false,
    telexes: [],
    telexesFullLoad: false
}
//filterData
export default (state = initialState, action = {}) => {
    switch (action.type){
        case GET_SUMMARIZED_LOADS_START:
            return { ...state, loadData: [], fullLoad: true}
        case GET_SUMMARIZED_LOADS_SUCCESS:
            return { ...state, loadData: action.loadData.slice(), fullLoad: true}
        case MESSAGEHUB_FILTER_SUCCESS:
            return { ...state, telexes: action.filterData}
        case GET_TELEX_CONTENT_BY_ID_SUCCESS:
            return { ...state, telexes: action.telexes, telexesFullLoad: true}
	    case GET_ALL_TELEX_BY_DATE_TRIGGERED:
            return { ...state, telexes: [], telexesFullLoad: true}
	    case GET_ALL_TELEX_BY_DATE_EPIC_SUCCESS:
            return { ...state, telexes: action.telexes, telexesFullLoad: true }
        case ADD_COMPONENT_PROPERTY_USER_PREFERENCES:
            return { ...state, fullLoad: false, telexesFullLoad:false }
        default:
            return {...state}
    }

}
