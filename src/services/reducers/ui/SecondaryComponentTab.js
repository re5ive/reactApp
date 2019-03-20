/**
 *  @fileOverview tnexus-ui Write what's going on in the file here.
 *  @file         SecondaryComponentTab Created at 5/29/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import Tab from '../../../models/Tab'
import {
    SECONDARY_COMPONENT_TAB_CHANGED,
    SECONDARY_COMPONENT_TABS_ADDED,
    SECONDARY_COMPONENT_TABS_INSERTED,
    SECONDARY_COMPONENT_TABS_MENU_STATE

} from "../../common/actionTypes";

const initialState = {
    activeTab:  new Tab(),
    tabs: null,
    isOpen: false
}

export default (state = initialState, action) => {
    switch (action.type){
        case SECONDARY_COMPONENT_TAB_CHANGED:
            return {...state, activeTab:action.tab}
        case SECONDARY_COMPONENT_TABS_ADDED:
            return {...state, tabs: action.tabs}
        case SECONDARY_COMPONENT_TABS_INSERTED:
            const _tabs = state.tabs ? state.tabs.slice(0) : []
            _tabs.push(action.tab)
            return {...state, tabs: _tabs}
        case SECONDARY_COMPONENT_TABS_MENU_STATE:
            return {...state, isOpen: action.isOpen}
        default:
            return {...state}
    }
}
