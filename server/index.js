"use strict";
exports.__esModule = true;
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [];
server.listen(80);
// WARNING: app.listen(80) will NOT work here!
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    emitMessages(socket, messages);
    socket.on('private message', function (data) {
        var from = data.from, content = data.content;
        messages.push({ from: from, content: content });
        console.log('I received a private message by ', from.name, ' saying ', content);
        emitMessages(socket, messages);
    });
    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });
});
function emitMessages(socket, messages) {
    socket.emit('messages', messages);
}
