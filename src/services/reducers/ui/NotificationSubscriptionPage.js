import { SET_SELECTED_TOPIC } from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up
const initialState = {selectedTopic: null, isSelected: false}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_TOPIC:
            return {...state, selectedTopic: action.selectedTopic}
        default:
            return state;
    }
}