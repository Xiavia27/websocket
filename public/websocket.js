//Make connection
var socket = io.connect('http://localhost:4000');

//Dom
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    button = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


//Emitters

button.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value, 
        handle: handle.value
    });
});


//Listeners

socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
    feedback.innerHTML = '';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...<em><p>';
});

//Broadcasters

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

var agario = document.getElementById('agario');
agario.addEventListener('click',function(){
    console.log('hey');
    window.open("/agario.html");
});