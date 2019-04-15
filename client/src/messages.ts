import {Message} from './models/Message'
import {Action} from 'redux'

export interface State {
    messages: Array<Message>
}

export enum ActionTypes {
    SEND_MESSAGE = 'SEND_MESSAGE',
    UPDATE_MESSAGE = 'UPDATE_MESSAGE'
}

export interface SendMessageAction extends Action {
    type: typeof ActionTypes.SEND_MESSAGE
    payload: Message
}

export interface UpdateMessagesAction extends Action {
    type: typeof ActionTypes.UPDATE_MESSAGE
    payload: Array<Message>
}

type MessageActionType = SendMessageAction | UpdateMessagesAction

export function messageReducer(state: State = {messages: []}, action: MessageActionType) {
    switch (action.type) {
        case ActionTypes.SEND_MESSAGE:
            return {...state, messages: [...state.messages, action.payload]}
        case ActionTypes.UPDATE_MESSAGE:
            return {...state, messages: action.payload}
        default:
            return state
    }
}