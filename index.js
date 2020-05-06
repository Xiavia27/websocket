var express = require('express');
var socket = require('socket.io');
var http = require('https');

//Server Variables
var playerIds = [];


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
    //For Agario
    socket.on('newPlayer', function(playerId, mousePosition){
        playerIds.push(playerId);
        socket.broadcast.emit('newPlayer', playerId, mousePosition);
        playerIds.forEach(element =>{
            console.log(element);
            socket.emit('updatePlayers', playerId, element);
        });
    });

    socket.on('exit', function(playerId){
        console.log('exiting');
        playerIds.pop(playerId);
        socket.broadcast.emit('exit', playerId);
    });

    socket.on('move', function(playerId, mousePosition){
        socket.broadcast.emit('move', playerId, mousePosition);
        console.log('move: ' + playerId);
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //For the chat box
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
        console.log("chat");
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
        console.log("typing");
    });

    socket.on('joined', function(mousePosition){
        socket.broadcast.emit('joined', mousePosition);
        console.log('joined');
    })


});
