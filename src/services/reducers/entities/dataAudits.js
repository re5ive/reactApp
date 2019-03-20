import {
    GET_DATA_AUDITS_STARTED,
    GET_DATA_AUDITS_SUCCESS,
    GET_DATA_AUDITS_FILTERVALUES_STARTED,
    GET_DATA_AUDITS_FILTERVALUES_SUCCESS,
    DATA_AUDIT_LOAD_FINISH
} from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    reRender: true,
    gridDataType: '',
    colDef: [],
    dataLoaded: false,
    filterValues: [],
    error: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_DATA_AUDITS_STARTED:
            return { ...state, reRender: true, isFetching: true, data: [] }
        case GET_DATA_AUDITS_SUCCESS:
            return { ...state, reRender: true, dataLoaded: true, isFetching: false, gridDataType: action.dataType, data: action.dataAudits }
        case GET_DATA_AUDITS_FILTERVALUES_STARTED:
            return { ...state, filterValues: [] }
        case GET_DATA_AUDITS_FILTERVALUES_SUCCESS:
            return { ...state, filterValues: action.filterValues }
        case DATA_AUDIT_LOAD_FINISH:
            return { ...state, dataLoaded: false}
        default:
            return state;
    }
}