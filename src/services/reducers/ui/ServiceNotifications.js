export const actionTypes = {
    SHOW_NOTIFICATION: 'ui/SHOW_SERVICE_NOTIFICATION',
    DISMISS_NOTIFICATION: 'ui/DISMISS_SERVICE_NOTIFICATION'
}

const initialState = {
    queue: [{id: 1, data: {label: 'Hello...', timeout: 3000} }]
}

export default (state = initialState, { type, payload } = {}) => {
    let queue;
    switch (type) {
        case actionTypes.SHOW_NOTIFICATION:
            queue = state.queue.slice();
            queue.push({ id: payload.id, data: payload.data });
            return { queue };
        case actionTypes.DISMISS_NOTIFICATION:
            queue = state.queue.filter((snack) => {
                return snack.id !== payload.id;
            });
            return { queue };
        default:
            return state;
    }
};
