import {Request, Response} from 'express';
import {Socket} from 'socket.io';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req: Request, res: Response) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket: Socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});