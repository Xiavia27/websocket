document.addEventListener('DOMContentLoaded', function(){
var socket = io.connect('http://localhost:4000');

//Need to create an array of circles that are on the browser (needs to be one server side as well)
var mousePosition;
var offset = [-100,-100];
var circle;
var isDown = false;
var myId = (Math.random() * 10000);
var otherPlayers= [];
var otherCircle;

console.log(myId);

//Create id for the user and assign that id to the circle
socket.emit('newPlayer', myId, mousePosition);

circle = createCircle(myId);

window.onbeforeunload = function(){
    socket.emit('exit', myId);
    socket.close();
}

window.onunload = function(){
    socket.emit('exit', myId);
    socket.close();
}

socket.on('newPlayer', function(id, otherMouse){
    otherPlayers.push(id);
    createCircle(id);
});

// socket.on('updatePlayers', function(id, otherId){
//     if(myId == id){
//         if(myId != otherId){
//             createCircle(otherId);
//         }
//     }
// });

socket.on('exit', function(id){
    otherPlayers.pop(id);
});

socket.on('move', function(id, mouse){
    otherCircle = document.getElementById(id);
    move(otherCircle, mouse);
})


document.addEventListener('mousemove', function(event) {
    event.preventDefault();
        mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        socket.emit('move', myId ,mousePosition);
        move(circle, mousePosition);
});

function move (circleUsed, mousePos){
    circleUsed.style.left = (mousePos.x + offset[0]) + 'px';
    circleUsed.style.top  = (mousePos.y + offset[1]) + 'px';
}


});