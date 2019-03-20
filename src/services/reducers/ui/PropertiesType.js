import {
    GET_PROPTYPE_STARTED,
    GET_PROPTYPE_SUCCESS,
    ADD_PROPTYPE,
    CANCEL_PROPTYPE,
    SET_SELECTED_PROPTYPE,
    MAKE_PROPTYPE_EDITABLE,
    DELETE_PROPTYPE_SUCCESS,
    SAVE_PROPTYPE_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    selectedPropType: null,
    isNew: false,
    isSelected: false,
    readOnly: true
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_PROPTYPE_STARTED:
            return { ...state, isSelected: false, selectedPropType: null, isNew: false }
        case GET_PROPTYPE_SUCCESS:
            return { ...state, isNew: false, isSelected: true, selectedPropType : action.propType, readOnly: true }
        case SAVE_PROPTYPE_SUCCESS:
            return { ...state, isNew: false, isSelected: null, selectedPropType: action.propType, readOnly: true  }
        case SET_SELECTED_PROPTYPE:
            return {...state, isSelected: true, selectedPropType: action.propType}
        case ADD_PROPTYPE:
            return { ...state, isNew: true, isSelected: true, selectedPropType: action.propType, readOnly: false  }
        case DELETE_PROPTYPE_SUCCESS:
            return { ...state, isSelected: false, selectedPropType: null, readOnly: true }
        case CANCEL_PROPTYPE:
            return { ...state,  isSelected: false, isCopy: false, isNew: false, selectedPropType: null , readOnly: true }
        case MAKE_PROPTYPE_EDITABLE:
            return { ...state, readOnly: false }
        default:
            return state
    }
}