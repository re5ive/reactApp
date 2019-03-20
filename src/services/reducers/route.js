/**
 * created @ 12/4/17 9:31 AM
 * with PhpStorm
 * by Kamaal ABOOTHALIB <kamaal.aboothalib@gmail.com>
 * for tnexus-ui
 */
import {LOCATION_CHANGE} from 'react-router-redux'
const initialState = {
    location: null
}

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */
export function routerReducer(state = initialState, { type, history } = {}) {
    if (type === LOCATION_CHANGE) {
        return { ...state, location:history.location.pathname, history }
    }

    return state
}