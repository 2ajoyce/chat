import React, {Component, ReactNode} from 'react'
import './App.css'
import * as socket from './socket'
import {User} from './models/User'
import {Button, Grid, Input} from '@material-ui/core'
import {ActionTypes, State} from './messages'
import {Message} from './models/Message'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'

interface AppProps {
    messages?: Array<Message>,
    sendMessage?: (message: Message) => void
}

interface AppState {
    message: string
    user: User
}

class App extends Component<AppProps, AppState> {
    state: AppState

    constructor(props: AppProps) {
        super(props)
        this.state = {
            message: '',
            user: {name: 'client', address: 'tbd'}
        }
    }

    sendMessage = () => {
        const message: Message = {from: this.state.user, content: this.state.message}
        socket.sendMessage(message)
        this.props.sendMessage!(message)
    }

    handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.state.message = e.currentTarget.value
    }

    render() {
        return (
            <Grid container className="App">
                <Grid item xs={12}>
                    {this.props.messages!.map((message: Message, index: number): ReactNode => (
                        <Grid container key={index}>
                            <Grid item xs={6}>
                                <div>{message.from.name}</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>{message.content}</div>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Input multiline={true} onChange={this.handleInput}/>
                    <Button onClick={this.sendMessage}>Send</Button>
                </Grid>
            </Grid>
        )
    }
}


const mapStateToProps = (state: State): AppProps => {
    return {
        messages: state.messages
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: (message: Message): void => {
            dispatch({type: ActionTypes.SEND_MESSAGE, payload: message})
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
