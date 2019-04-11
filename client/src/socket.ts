import * as io from 'socket.io-client'

export function register() {
    const socket = io.connect('http://localhost');
    socket.on('news', function (data: any) {
        console.log(data);
        socket.emit('my other event', {my: 'data'});
    });
}
