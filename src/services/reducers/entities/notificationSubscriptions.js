import {
    GET_NOTIFICATION_SUBSCRIPTIONS_SUCCESS,
} from '../../common/actionTypes'

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an alert when app first boots up

const initialState = {
    isFetching: false,
    byProfile: null,
    byTopic: null,
    error: false
}

const getByTopic = notificationSubscriptions => {
    let byTopic = {}
    notificationSubscriptions.forEach(notification => {
        notification.subscribedProfiles.forEach(_profile => {
            let topic = {id: notification.id, name: notification.name, description: notification.description}
            let profiles = []
            if (byTopic[notification.name] === undefined) {
                byTopic[notification.name] = topic
                topic.profiles = profiles
            }
            profiles = byTopic[notification.name].profiles
            profiles.push({id: _profile.id, name: _profile.name, active: _profile.active, minHours: _profile.minHours, maxHours: _profile.maxHours})
        })
    })
    return byTopic
}

const getByProfile = notificationSubscriptions => {
    let byProfile = {}
    notificationSubscriptions.forEach(notification => {
        notification.subscribedProfiles.forEach(_profile => {
            let profile = {}
            let topics = []
            if (byProfile[_profile.name] === undefined) {
                byProfile[_profile.name] = profile
                profile.topics = topics
            }
            topics = byProfile[_profile.name].topics
            //topics.push(notification)
            topics.push({id: notification.id, name: notification.name, description: notification.description, minHours: _profile.minHours, maxHours: _profile.maxHours})
        })
    })
    return byProfile
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_NOTIFICATION_SUBSCRIPTIONS_SUCCESS:
            const byProfile = getByProfile(action.notificationSubscriptions)
                , byTopic = getByTopic(action.notificationSubscriptions)
            return {...state, isFetching: false, byProfile, byTopic, data: action.notificationSubscriptions}
        default:
            return state;
    }
}
