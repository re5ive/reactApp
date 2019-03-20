import { GET_AUTHORIZED_TILES_SUCCESS, GET_LAUNCHPAD_CONFIG_SUCCESS } from '../../common/actionTypes'
import {uniqBy} from 'lodash'
/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */
// "state = null" is set so that we don't throw an alert when app first boots up

const _orderByOrderProp = (a, b) => {
    const orderA = (a.properties || []).find(p => p.name === 'order') || {value: Number.MAX_VALUE}
        , orderB = (b.properties || []).find(p => p.name === 'order') || {value: Number.MAX_VALUE - 1}
    return  orderA.value - orderB.value
}

const populateLaunchpadConfig = (tileGroups, config) => {
    if (tileGroups && config) {
        return tileGroups
            .sort(_orderByOrderProp)
            .map(
                group => {
                    group.tiles = (group.tiles || [])
                            .map(tile => {
                            if (config[tile.title] !== null) { // to be removed
                                const props = (config[tile.title] || []).map(p => {
                                    return {name: p.property, value: p.value}
                                })

                                tile.properties = uniqBy(tile.properties.concat(props), 'name')
                            }
                            return tile
                        })
                    return group
                }
        )
    }
    return tileGroups
}

export default function (state = {tileGroups: [], config: null}, action) {

    switch (action.type) {
        case GET_LAUNCHPAD_CONFIG_SUCCESS:
            let tileGroups = populateLaunchpadConfig(state.tileGroups, action.launchpadConfig)
            return {...state, config: action.launchpadConfig, tileGroups}
        case GET_AUTHORIZED_TILES_SUCCESS:
            tileGroups = populateLaunchpadConfig(action.tileGroups, state.config)
            return {...state, tileGroups}
        default:
            return state
    }
}

//[{"tile":"FPM","properties":[]},{"tile":"User Management","properties":[{"property":"Active Users Count","value":27}]},{"tile":"Alerts","properties":[{"property":"Alerts Count","value":4}]}]
