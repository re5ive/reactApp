import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import AppWithRouter from './pages/PageRouter'
import { routeChanged } from './services/actions/route'
class App extends Component {

    render() {

        return (
            <div className={`app`}>
                <Router>
                    <AppWithRouter routeChanged={routeChanged} />
                </Router>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return { }
}

export default connect(mapStateToProps, { })(App);
