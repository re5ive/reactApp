/**
 * created @ 11/29/17 2:41 PM
 * with PhpStorm
 * by Kamaal ABOOTHALIB <kamaal.aboothalib@gmail.com>
 * for tnexus-ui
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import {LOCATION_CHANGE} from 'react-router-redux'

class ReduxRouter extends Component {
    static propTypes = {
        store: PropTypes.object,
        history: PropTypes.object,
        children: PropTypes.node
    }

    handleLocationChange = location => {
        this.store.dispatch({
            type: LOCATION_CHANGE,
            payload: location
        })
    }

    componentWillMount() {
        const { store:propsStore, history } = this.props
        this.store = propsStore || this.context.store
        this.handleLocationChange(history.location)
    }

    componentDidMount() {
        const { history } = this.props
        this.unsubscribeFromHistory = history.listen(this.handleLocationChange)
    }

    componentWillUnmount() {
        if (this.unsubscribeFromHistory) this.unsubscribeFromHistory()
    }

    render() {
        return (
            <Router {...this.props} />
        )
    }
}

export default ReduxRouter
