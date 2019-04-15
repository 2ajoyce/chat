import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ConnectedApp from './App'
import * as serviceWorker from './serviceWorker'
import * as socket from './socket'
import {createStore, Store} from 'redux'
import {messageReducer} from './messages'
import {Provider} from 'react-redux'

const store: Store = createStore(messageReducer)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp/>
    </Provider>,
    document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

socket.register(store)
