import {
    DATA_TYPE_CHANGE_START,
    DATA_TYPE_CHANGE_SUCCESS,
    GET_DATA_AUDIT_STARTED,
    GET_DATA_AUDIT_SUCCESS,
    SELECTED_DATA_AUDIT
} from '../../common/actionTypes'

const initialState = {
    selectedAudit: null,
    isSelected: false,
    reRender: true,
    updateGridState: false,
    gridDataType: 'AUDIT_FLIGHT',
    readOnly: true
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_DATA_AUDIT_STARTED:
            return { ...state, isSelected: true, readOnly: true}
        case SELECTED_DATA_AUDIT:
            return {...state, isSelected: true, reRender: false, selectedAudit: action.dataAudit}
        case GET_DATA_AUDIT_SUCCESS:
            return { ...state, reRender: false, isSelected: true, selectedAudit : action.dataAudit, readOnly: true }
        case DATA_TYPE_CHANGE_START:
            return {...state, isSelected: false}
        case DATA_TYPE_CHANGE_SUCCESS:
            return {...state, isSelected: false, gridDataType: action.dataType,selectedAudit:[]  }
        default:
            return state
    }
}