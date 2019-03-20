import {

    GET_ACTIVITY_GROUPS_STARTED,
    GET_ACTIVITY_GROUPS_SUCCESS,
    SAVE_ACTIVITY_GROUP_SUCCESS,
    GET_ACTIVITY_GROUPS_FAILED,
    DELETE_ACTIVITY_GROUP_SUCCESS
 } from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_ACTIVITY_GROUPS_STARTED:
            return { ...state, isFetching: true, data: [] }
        case GET_ACTIVITY_GROUPS_SUCCESS:
            return { ...state, isFetching: false, data: action.actvGroups }
        case GET_ACTIVITY_GROUPS_FAILED:
            return {...state, isFetching: false, error: true}

        case SAVE_ACTIVITY_GROUP_SUCCESS:
            let activityGroups = state.data.slice(0)
            let updated = false
            activityGroups = activityGroups.map(activityGroup => {
                if (activityGroup.id === action.activityGroup.id) {
                    updated =true
                    return action.activityGroup
                } else {
                    return activityGroup
                }
            })
            if (!updated) {
                activityGroups.push(action.activityGroup)
            }
            return { ...state, isFetching: false, data: activityGroups }
        case DELETE_ACTIVITY_GROUP_SUCCESS:
            const _activityGroups = state.data.filter(activityGroup => activityGroup.id !== action.id)
            return { ...state, isFetching: false, data: _activityGroups }
        default:
            return state;
    }
}