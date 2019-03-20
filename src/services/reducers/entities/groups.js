import { GET_GROUPS_STARTED, GET_GROUPS_SUCCESS, GET_GROUPS_FAILED, SAVE_GROUP_SUCCESS, DELETE_GROUP_SUCCESS } from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
    dataLoaded: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_GROUPS_STARTED:
            return { ...state, isFetching: true, data: [] }
        case GET_GROUPS_SUCCESS:
            return {
                ...state, isFetching: false, data: action.groups, dataLoaded: true }
        case GET_GROUPS_FAILED:
            return {...state, isFetching: false, error: true}
        case SAVE_GROUP_SUCCESS:
            let groups = state.data.slice(0)
            let updated = false
            groups = groups.map(group => {
                if (group.id === action.group.id) {
                    updated =true
                    return action.group
                } else {
                    return group
                }
            })
            if (!updated) {
                groups.push(action.group)
            }
            return { ...state, isFetching: false, data: groups }
        case DELETE_GROUP_SUCCESS:
            const _groups = state.data.filter(group => group.id !== action.id)
            return { ...state, isFetching: false, data: _groups, deleted: true }
        default:
            return state;
    }
}