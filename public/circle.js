
//use circle object, then assign id to the circle
function createCircle(id){
    console.log('Creating circle');
    circle = document.createElement("div");
    circle.className = 'circle';
    circle.id = id;
    document.body.appendChild(circle);
    return circle;
}
