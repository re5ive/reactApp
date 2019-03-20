import {
    GET_CLIENTS_STARTED,
    GET_CLIENTS_SUCCESS,
    DELETE_CLIENT_SUCCESS,
    SAVE_CLIENT_SUCCESS
} from '../../common/actionTypes'

//import { flatMap } from 'lodash'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_CLIENTS_STARTED:
            return {...state, isFetching: true, clientsById: {}}
        case GET_CLIENTS_SUCCESS:
            return { ...state, isFetching: false, data: action.clients }
        case SAVE_CLIENT_SUCCESS:
            let clients = state.data.slice(0)
            let updated = false
            clients = clients.map(client => {
                if (client.code === action.client.code) {
                    updated =true
                    return action.client
                } else {
                    return client
                }
            })
            if (!updated) {
                clients.push(action.client)
            }
            return { ...state, isFetching: false, data: clients }
        case DELETE_CLIENT_SUCCESS:
            let allClients = state.data.slice(0)
            allClients = allClients.filter(client => {
               return client.code !== action.code
            })
            return { ...state, isFetching: false, data: allClients }
        default:
            return state
    }
}
