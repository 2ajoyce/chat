import * as io from 'socket.io-client'
import {Message} from './models/Message'
import {Store} from 'redux'
import {ActionTypes} from './messages'

const socket = io.connect('http://localhost')

export function register(store: Store) {
    socket.on('messages', function (messages: Array<Message>): void {
        store.dispatch({type: ActionTypes.UPDATE_MESSAGE, payload: messages})
    })
}

export function sendMessage(data: Message): void {
    socket.emit('private message', data)
}
