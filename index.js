var express = require('express');
var socket = require('socket.io');


//App Setup
var app = express();
var server = app.listen(4000, function(){
    console.log("Listening to requests on port 4000")
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('Connection made with socket ', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
        console.log("chat");
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
        console.log("typing");
    });
});
