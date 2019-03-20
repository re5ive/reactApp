import React from 'react'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './App'
import { Provider } from 'react-redux'
import { rootEpic } from './services/epics/index'
import { createEpicMiddleware } from 'redux-observable'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './services/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'


const epicMiddleware = createEpicMiddleware(rootEpic)

const muiTheme = getMuiTheme({
    fontFamily: 'Arial, sans-serif',
    palette:{
        primary1Color: 'rgba(46, 79, 107, 1.000)',
        textColor: 'rgba(46, 79, 107, 1.000)',
        primary3Color: 'rgba(46, 79, 107, .1)',
        accent3Color: 'rgba(46, 79, 107, .1)',
    }
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, epicMiddleware)))

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <App />
        </MuiThemeProvider>
    </Provider>
    ,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        ReactDOM.render(
            <Provider store={store}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <NextApp />
                </MuiThemeProvider>
            </Provider>,
            document.getElementById('root')
        )
    })
}

if (window.Cypress) {
    window.store = store
}
