import {Request, Response} from 'express'
import {Socket} from 'socket.io'
import {Message} from './models/Message'

const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const messages: Array<Message> = []

server.listen(80)
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req: Request, res: Response) {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket: Socket) {
    emitMessages(socket, messages)

    socket.on('private message', function (data: Message) {
        const {from, content} = data
        messages.push({from: from, content: content})
        console.log('I received a private message by ', from.name, ' saying ', content)
        emitMessages(socket, messages)
    })

    socket.on('disconnect', function () {
        io.emit('user disconnected')
    })
})

function emitMessages(socket: Socket, messages: Array<Message>): void {
    socket.emit('messages', messages)
}