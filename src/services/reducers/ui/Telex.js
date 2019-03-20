import {
    GET_ALL_TELEX_BY_ID_SUCCESS,
    GET_SUMMARIZED_LOADS_START
    , TELEX_SEARCH_EPIC_SUCCESS
    , GET_ALL_TELEX_BY_ID_STARTED
    , TELEX_SEARCH_EPIC_TRIGGER
    , GET_TELEX_CONTENT_BY_ID_SUCCESS
    , GET_ALL_TELEX_BY_DATE_TRIGGERED
    , SET_SELECTED_TELEX
    , GET_TELEX_BY_ID_EPIC_SUCCESS
    , GET_TELEX_BY_ID_EPIC_STARTED
    , GET_TELEX_BY_ID_EPIC_FAILED
    , UPDATE_TELEX_CONTENT_CANCEL
    , UPDATE_TELEX_CONTENT_SUCCESS
    , AIDX_MESSAGE_SEND_START
    , AIDX_MESSAGE_SEND_SUCCESS
    , AIDX_MESSAGE_SEND_FAILED
    , AIDX_MESSAGE_SEND_RESET
    , AIDX_MESSAGE_DIALOG_TOGGLE
    , SET_FDM_TELEX_SELECTED_FLIGHT
    , PUSH_MESSAGE_HUB_RECEIVED
    , CLEAR_TELEX_CONTENT_BY_SELECTING_FLIGHT
    , ADD_COMPONENT_PROPERTY_USER_PREFERENCES
    , OPEN_WIDGET_DIALOGBOX
    , CLOSE_WIDGET_DIALOGBOX
    , MAKE_MESSAGEHUB_EDITABLE
    , SELECTED_MODAL_TAB
    , FILTER_VALUE_FROM_LOAD_SUM
    , ASSIGN_FLIGHT_SUCCESS
    //, FILTER_VALUE_FROM_LOAD_BAG
    , RENDER_TELEX_WIDGET
    , OPEN_ASSIGN_DIALOGBOX_MESSAGEHUB
    , CLOSE_ASSIGN_DIALOGBOX_MESSAGEHUB
    , OPEN_SEARCH_FLIGHT_DIALOGBOX_MESSAGEHUB
    , CLOSE_SEARCH_FLIGHT_DIALOGBOX_MESSAGEHUB
    , SET_TBX_TELEX_TABS
    , CLEAR_TELEX_FLOATING_FILTER
    , MESSAGE_HUB_STOP_FULL_LOAD
    , MESSAGEHUB_FILTER_SUCCESS

} from "../../common/actionTypes";

const initialState = {
    selectedFlight: null,
    search: null,
    telex: [],
    clearSearchValue:false,
    telexFiltered: [],
    selectedTelexRow:[],
    dateRange: {from:10, to:13},
    selectedTelex: null,
    telexContentFetched: false,
    aidxMessageConfirmDialog: false,
    aidxMessageSending: false,
    aidxMessage: null,
    aidxMessageStatusFailed: false,
    dateTimeMode: 'TIME', //OR 'DATE',
    fullLoad: false,
    readOnly: true,
    widgetBoxOpen: false,
	modalTabs: [],
    selectedModalTab: null,
    receivedMsgHub:null,
    loadCellValue: "",
    rerenderTelex: false,
    openAssign: false,
    openMessageBox: false,
    openSearchFlight: false

}
//loadCellValue
export default (state = initialState, action ={}) => {
    let telex = state.selectedTelex
    switch (action.type) {
        case SET_FDM_TELEX_SELECTED_FLIGHT:
            return {...state, selectedFlight:action.flight}
        case GET_SUMMARIZED_LOADS_START:
            return {...state}
        case OPEN_SEARCH_FLIGHT_DIALOGBOX_MESSAGEHUB:
            return {...state, openSearchFlight: true}
        case CLOSE_SEARCH_FLIGHT_DIALOGBOX_MESSAGEHUB:
            return {...state, openSearchFlight: false}
        case OPEN_ASSIGN_DIALOGBOX_MESSAGEHUB:
            return {...state, openAssign: true}
        case CLOSE_ASSIGN_DIALOGBOX_MESSAGEHUB:
            return {...state, openAssign: false}
        case RENDER_TELEX_WIDGET:
            return {...state, rerenderTelex: action.IsTrue}
        case FILTER_VALUE_FROM_LOAD_SUM:
            return {...state, loadCellValue: action.loadCellValue}
        case CLEAR_TELEX_FLOATING_FILTER:
            return {...state, loadCellValue:""}
        case SELECTED_MODAL_TAB:
            return {...state, selectedModalTab: action.selectedModalTab}
        case MAKE_MESSAGEHUB_EDITABLE:
            return {...state, readOnly: false}
        case TELEX_SEARCH_EPIC_TRIGGER:
            return {...state, search:action.search}
        case GET_ALL_TELEX_BY_ID_STARTED:
            return {...state, clearSearchValue: true}
        case OPEN_WIDGET_DIALOGBOX:
            return {...state, widgetBoxOpen: true}
        case CLOSE_WIDGET_DIALOGBOX:
            return {...state, loadCellValue: '', telexContentFetched: false, widgetBoxOpen: false, openSearchFlight: false, openAssign:false, selectedModalTab: "a", rerenderTelex: false}
        case GET_ALL_TELEX_BY_ID_SUCCESS:
            return { ...state, telex: action.telex, clearSearchValue: false, telexContentFetched: true}
        case TELEX_SEARCH_EPIC_SUCCESS:
            return { ...state, telex: action.finalResult, telexContentFetched: true}
        case GET_ALL_TELEX_BY_DATE_TRIGGERED:
            return { ...state, dateRange: action.dateRange, dateTimeMode: action.dateTimeMode, fullLoad: true, telexContentFetched: false }
        case PUSH_MESSAGE_HUB_RECEIVED:
            return { ...state, fullLoad: false, receivedMsgHub: action.receivedMsgHub }
        case MESSAGEHUB_FILTER_SUCCESS:
            return { ...state, fullLoad: true }
        case ADD_COMPONENT_PROPERTY_USER_PREFERENCES:
            return { ...state, fullLoad: false }
        case GET_TELEX_BY_ID_EPIC_STARTED:
            return {...state, telexContentFetched: false}
        case SET_SELECTED_TELEX:
            return {...state, selectedTelex: action.selectedTelex, telexContentFetched: false}
        case GET_TELEX_BY_ID_EPIC_SUCCESS:
            telex = state.selectedTelex
            return {...state, openAssign: false, openSearchFlight: false, selectedTelex: {...telex, content:action.selectedTelex.content}, telexContentFetched:true}
        case UPDATE_TELEX_CONTENT_SUCCESS:
            telex = state.selectedTelex
            return {...state, selectedTelex: {...telex, content:action.selectedTelex.content}, telexContentFetched:false}
        case GET_TELEX_BY_ID_EPIC_FAILED:
            return {...state, telexContentFetched: false}
        case UPDATE_TELEX_CONTENT_CANCEL:
            return {...state, telexContentFetched: false, readOnly: true}
        case GET_TELEX_CONTENT_BY_ID_SUCCESS:
            return { ...state, selectedTelexRow : action.telexContent}
        case CLEAR_TELEX_CONTENT_BY_SELECTING_FLIGHT:
            return {...state, selectedTelexRow: []}
        case ASSIGN_FLIGHT_SUCCESS:
            return {...state, openSearchFlight: false, openAssign: false, telexContentFetched: false}
        // aidx
        case AIDX_MESSAGE_DIALOG_TOGGLE:
            return {...state, aidxMessageConfirmDialog:action.aidxMessageConfirmDialog}
        case AIDX_MESSAGE_SEND_START:
            return {...state, aidxMessageSending: true, aidxMessageConfirmDialog: false}
        case AIDX_MESSAGE_SEND_SUCCESS:
            return {...state, aidxMessageSending: true, readOnly: true, aidxMessage: action.aidxMessage, aidxMessageStatusFailed: false}
        case AIDX_MESSAGE_SEND_RESET:
            return {...state, aidxMessageSending: false, aidxMessage: null, aidxMessageStatusFailed: false, aidxMessageConfirmDialog: false}
        case AIDX_MESSAGE_SEND_FAILED:
            return {...state, aidxMessageSending: true, aidxMessage: action.aidxMessage, aidxMessageStatusFailed: true}
        case SET_TBX_TELEX_TABS:
            return { ...state, modalTabs: action.tabs }
        case MESSAGE_HUB_STOP_FULL_LOAD:
            return {...state, fullLoad: false }
        default:
            return {...state}
    }
}
