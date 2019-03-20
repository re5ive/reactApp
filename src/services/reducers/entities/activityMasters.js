import {
    GET_ALL_ACTIVITY_MASTERS_STARTED, GET_ALL_ACTIVITY_MASTERS_SUCCESS, GET_ALL_ACTIVITY_MASTERS_FAILED,
    SAVE_ACTIVITY_MASTER_SUCCESS, GET_ACTIVITY_MASTER_SUCCESS, DELETE_ACTIVITY_MASTER_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    data: null,
    isFetching: false,
    error: false,
    dataLoaded: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {

        case GET_ALL_ACTIVITY_MASTERS_STARTED:
            return {...state, error: false, isFetching: true, data: []}
        case GET_ALL_ACTIVITY_MASTERS_SUCCESS:
            return { ...state, isFetching: false, data: action.activities, dataLoaded: true }
        case GET_ALL_ACTIVITY_MASTERS_FAILED:
            return {...state, isFetching: false, error: true}
        case SAVE_ACTIVITY_MASTER_SUCCESS:
        case GET_ACTIVITY_MASTER_SUCCESS:
            let activities = state.data.slice(0)
            let updated = false
            if (action.activityMaster) {
                activities = activities.map(activity => {
                    if (activity.id === action.activityMaster.id) {
                        updated = true
                        return action.activityMaster
                    } else {
                        return activity
                    }
                })
                if (!updated) {
                    activities.push(action.activityMaster)
                }
            }
            return { ...state, isFetching: false, data: activities }
        case DELETE_ACTIVITY_MASTER_SUCCESS:
            let _activities = state.data.filter(activity => activity.id !== action.id)
            return { ...state, isFetching: false, data: _activities, deleted: true }
        default:
            return state
    }
}