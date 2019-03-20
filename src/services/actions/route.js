/**
 * created @ 12/4/17 9:22 AM
 * with PhpStorm
 * by Kamaal ABOOTHALIB <kamaal.aboothalib@gmail.com>
 * for tnexus-ui
 */
import {LOCATION_CHANGE} from 'react-router-redux'
export const routeChanged = (pathname, history) => {
    return dispatch => {
        dispatch({
            type: LOCATION_CHANGE,
            location:pathname,
            history:history
        })
    }
}
