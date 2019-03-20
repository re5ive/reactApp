import { HTTP_ERROR_UI } from '../../common/actionTypes'

const initialState = {
    isError: false,
    errorMessage: ''
}


export default function (state = initialState, action) {
    switch (action.type) {
        case HTTP_ERROR_UI:
            return { ...state, errorMessage: action.eMessage }
        default:
            return state
    }
};
