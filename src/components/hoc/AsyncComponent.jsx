import React, { Component } from 'react'

export default (getComponent) => {

    return class AsyncComponent extends Component {

        static Component = null
        state = { Component: AsyncComponent.Component }

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(Component => {
                    AsyncComponent.Component = Component
                    this.setState({ Component })
                })
            }
        }

        componentDidMount() {
            this._mounted = true
        }

        render() {
            const { Component } = this.state
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
}


