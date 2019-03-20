/**
 * created @ 4/23/2018 9:38 AM
 * with WebStorm
 * by Mohamed Rihan <rihan.info@gmail.com>
 * for tnexus-ui3
 */
import { GET_SUMMARIZED_BAGS_START, GET_SUMMARIZED_BAGS_SUCCESS, ADD_COMPONENT_PROPERTY_USER_PREFERENCES} from "../../common/actionTypes";

const initialState = {
    bagsData: [],
    fullLoad: false
}

export default (state = initialState, action = {}) => {
    switch (action.type){
        case GET_SUMMARIZED_BAGS_START:
            return { ...state, bagsData: [], fullLoad: true}
        case GET_SUMMARIZED_BAGS_SUCCESS:
            return { ...state, bagsData: action.bagsData, fullLoad: true}
        case ADD_COMPONENT_PROPERTY_USER_PREFERENCES:
            return { ...state, fullLoad: false }
        default:
            return {...state}
    }

}
