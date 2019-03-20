import {
    GET_COMPONENTS_STARTED,
    GET_ALL_COMPONENTS_SUCCESS
} from '../../common/actionTypes'
//import {flatMap} from "lodash";

const initialState = {
    data: [],
    isFetching: false,
    error: false,
    updated: false,
    tree: {},
    componentsById: {}
}

// const _componentsById = (clients, cli = {} )  => {
//     return clients.reduce((result, next) => {
//         result[next.id] = next
//         return result
//     }, cli)
// }

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case GET_COMPONENTS_STARTED:
            return {...state, isFetching: true, updated: false}
        case GET_ALL_COMPONENTS_SUCCESS:
            return { ...state, tree: action.root, isFetching: false, data: action.components.slice(0), updated: true }
        default:
            return state
    }
}
