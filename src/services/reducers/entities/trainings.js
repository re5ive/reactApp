import {
    GET_TRAININGS_STARTED,
    GET_TRAININGS_SUCCESS,
    GET_TRAININGS_FAILED,
    GET_TRAINING_SUCCESS,
    DELETE_TRAINING_SUCCESS
} from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    data: [],
    isFetching: false,
    error: false
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_TRAININGS_STARTED:
            return {...state, isFetching: true, data: []}
        case GET_TRAININGS_SUCCESS:
            return {...state, isFetching: false, data: action.trainings};
        case GET_TRAININGS_FAILED:
            return {...state, isFetching: false, error: true};
        case GET_TRAINING_SUCCESS:
            //case SAVE_USER_SUCCESS:
            const training = action.training;
            let trainings = state.data.slice(0);
            let updated = false
            if (trainings) {
                trainings = trainings.map(tran => {
                    if (tran.id === training.id) {
                        updated =true
                        return training
                    } else {
                        return tran
                    }
                })
            }
            if (!updated) {
                trainings.push(training);
            }
            return { ...state, isFetching: false, data: trainings}
        case DELETE_TRAINING_SUCCESS:
            const id = action.id
            let _trainings = []
            if (state.data) {
                _trainings = state.data.filter(tran => tran.id !== id)
            }
            return { ...state, isFetching: false, data: _trainings}
        default:
            return state;
    }
}