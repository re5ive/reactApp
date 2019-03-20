import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {




    render() {

        return (
            <div className={`app`}>
                <h3>Welcome to React HOME</h3>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, {})(Home)

