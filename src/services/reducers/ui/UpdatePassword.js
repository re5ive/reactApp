/**
 *  @fileOverview acdm Write what's going on in the file here.
 *
 *  @file         UpdatePassword Created at 2/11/18 with WebStorm
 *
 *  @author       Kamaal ABOOTHALIB in milano
 *
 */

import {
    UPDATE_NEW_PASSWORD_STARTED,
    UPDATE_NEW_PASSWORD_FAILED,
    UPDATE_NEW_PASSWORD_SUCCESS,
    UPDATE_NEW_PASSWORD_REVERT
} from '../../common/actionTypes'

const initialState = {
    updated: false,
    failed: false,
    started: false,
    message: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_NEW_PASSWORD_STARTED:
            return {...state, started: true}
        case UPDATE_NEW_PASSWORD_SUCCESS:
            return {...state, started: false, updated: action.success, message: action.message, failed: !action.success}
        case UPDATE_NEW_PASSWORD_FAILED:
            return {...state, started: false, updated: action.success, message: action.message, failed: !action.success}
        case UPDATE_NEW_PASSWORD_REVERT:
            return {...initialState}
        default:
            return state
    }
}