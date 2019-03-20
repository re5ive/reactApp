import {
    GET_PROP_STARTED,
    GET_PROP_SUCCESS,
    ADD_PROP,
    COPY_PROP,
    CANCEL_PROP,
    SET_SELECTED_PROP,
    MAKE_PROP_EDITABLE,
    DELETE_PROP_SUCCESS,
    SAVE_PROP_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    selectedProp: null,
    isNew: false,
    isCopy: false,
    isSelected: false,
    copiedProp: null,
    readOnly: true,
    saveFinished: false,
    deleted: false
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_PROP_STARTED:
            return { ...state, isSelected: false, selectedProp: null, isNew: false }
        case GET_PROP_SUCCESS:
            return { ...state, isNew: false, isSelected: true, selectedProp : action.prop, readOnly: true }
        case SAVE_PROP_SUCCESS:
            return { ...state, isNew: false, isSelected: null, selectedProp: action.prop, readOnly: true ,saveFinished: true  }
        case SET_SELECTED_PROP:
            return {...state, isSelected: true, selectedProp: action.prop, readOnly: true,}
        case ADD_PROP:
            return { ...state, isNew: true, isSelected: true, selectedProp: action.prop, readOnly: false  }
        case DELETE_PROP_SUCCESS:
            return { ...state, isSelected: false, selectedProp: null, readOnly: true, deleted:true }
        case CANCEL_PROP:
            return { ...state,  isSelected: false, isCopy: false, isNew: false, selectedProp: null , readOnly: true }
        case MAKE_PROP_EDITABLE:
            return { ...state, readOnly: false }
        case COPY_PROP:
            return { ...state, isCopy: true, copiedProp: action.prop, isNew: true, isSelected: true, readOnly: false, selectedProp: action.prop }
        default:
            return state
    }
}