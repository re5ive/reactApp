import { GET_TRAINING_SUCCESS, ADD_TRAINING, DELETE_TRAINING_SUCCESS } from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

export default function (state = {selectedTraining: null, isNew: false, isSelected: false}, action) {

    switch (action.type) {
        case GET_TRAINING_SUCCESS:
            return { ...state, isNew: false, isSelected: true, selectedTraining: action.training}
        case ADD_TRAINING:
            return { ...state, isNew: true, isSelected: true, selectedTraining: action.training}
        case DELETE_TRAINING_SUCCESS:
            return { ...state, isSelected: false, selectedTraining: null}
        default:
            return state;
    }
}