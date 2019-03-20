/**
 * created @ 11/29/17 10:12 AM
 * with PhpStorm
 * by Kamaal ABOOTHALIB <kamaal.aboothalib@gmail.com>
 * for tnexus-ui
 */
import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import asyncComponent from "../components/hoc/AsyncComponent";
import Header from '../components/header/Header'
const Home = asyncComponent(() => import('./home/Home.jsx').then(module => module.default))
const About = asyncComponent(() => import('./about/About.jsx').then(module => module.default))

class PageRouter extends Component {

    constructor(props) {
        super(props);
        this.pathname = '/';
        this.unlisten = props.history.listen(this.routeLocationUpdated);
        this.routeLocationUpdated(props.history.location)
    }

    componentWillUnmount() {
        this.unlisten()
    }

    routeLocationUpdated = (location) => {
        const { history, routeChanged } = this.props
            , { pathname } = location

        routeChanged(pathname, history)
    }

    render() {
        const baseName = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? '' : ''
        return (
            <div className={`app`}>
                <Header/>
                <Route path={`${baseName}/`} exact component={Home} />
                <Route path={`${baseName}/about`} component={About} />
            </div>
        )
    }
}

export default withRouter(PageRouter)
