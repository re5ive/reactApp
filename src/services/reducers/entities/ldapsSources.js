import {
    GET_LDAPS_STARTED,
    GET_LDAPS_SUCCESS,
    SAVE_LDAP_SUCCESS,
    DELETE_LDAP_SUCCESS,
    GET_LDAPS_FAILED
} from '../../common/actionTypes'

const initialState = {
    data: null,
    isFetching: false,
    error: false,
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_LDAPS_STARTED:
            return {...state, isFetching: true}
        case GET_LDAPS_SUCCESS:
            return { ...state, isFetching: false, data: action.ldaps }
        case GET_LDAPS_FAILED:
            return {...state, isFetching: false, error: true}
        case SAVE_LDAP_SUCCESS:
            let ldaps = state.data.slice(0)
            let updated = false
            ldaps = ldaps.map(ldap => {
                if (ldap.id === action.ldap.id) {
                    updated =true
                    return action.ldap
                } else {
                    return ldap
                }
            })
            if (!updated) {
                ldaps.push(action.ldap)
            }
            return { ...state, isFetching: false, data: ldaps }
        case DELETE_LDAP_SUCCESS:
            const _ldaps = state.data.filter(ldap => ldap.id !== action.id)
            return { ...state, isFetching: false, data: _ldaps }
        default:
            return state

    }
}