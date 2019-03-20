import {
    GET_TEMPLATES_STARTED, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILED,
    GET_TEMPLATE_SUCCESS, SAVE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_SUCCESS
} from '../../common/actionTypes'

const initialState = {
    data: [],
    isFetching: false,
    error: false,
    dataLoaded: false,
    deleted:false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_TEMPLATES_STARTED:
            return {...state, error: false, isFetching: true, data: []}
        case GET_TEMPLATES_SUCCESS:
            return { ...state, isFetching: false, data: action.templates, dataLoaded:true }
        case GET_TEMPLATES_FAILED:
            return {...state, isFetching: false, error: true}
        case GET_TEMPLATE_SUCCESS:
        case SAVE_TEMPLATE_SUCCESS:
            let templates = state.data.slice(0)
            let updated = false
            if (action.template) {
                templates = templates.map(template => {
                    if (template.id === action.template.id) {
                        updated = true
                        return action.template
                    } else {
                        return template
                    }
                })
                if (!updated) {
                    templates.push(action.template)
                }
            }
            return { ...state, isFetching: false, data: templates }
        case DELETE_TEMPLATE_SUCCESS:
            let _templates = state.data.filter(template => action.id !== template.id)
            return { ...state, isFetching: false, data: _templates, deleted: true }
        default:
            return state
    }
}