let linesNumber = 8;
let angle;
let canvas;

let bgColor;
let strokeColor;

let trailHistory = [];

function setup() {

    

    let canvasDiv = document.getElementById('p5-holder');
    let width = canvasDiv.offsetWidth - 272;
    let height = canvasDiv.offsetHeight;
    let sketchCanvas = createCanvas(width, height);

    sketchCanvas.parent("mandalina");
    translate(width/2, height/2)
    bgColor = color('#d2d6d6');
    strokeColor = color('#7b7ebc');

    angle = 2 * PI / linesNumber;
}



function drawMandala (){

    if (mouseIsPressed) {
        for (let i = 0; i < linesNumber; i++){
            // noStroke();
            rotate(angle);

            // beginShape(LINES);
            // vertex(mouseX - width/2, mouseY - height/2);
            // vertex(pmouseX - width/2, pmouseY - height/2);
            // endShape();

            let trailData = createVector(mouseX - width/2, mouseY - height/2);
            trailHistory.push(trailData);
            
            if(trailHistory.length > 299){
                trailHistory.shift();
            }
            
        }
    }
}

function drawTrails() {
    
    for (let i = 0; i < linesNumber; i++){
        rotate(angle);
        
        beginShape(LINES);
        for (let i = 0; i < trailHistory.length; i++){
            // beginShape(LINES);
            let pos = trailHistory[i];
            vertex(pos.x, pos.y);
            // endShape();
        }
        endShape();
    }
}

function mouseReleased(){
    console.log('a');
    trailHistory=[]
}


function draw() {

    background(bgColor);
    translate(width / 2, height / 2);
    
    fill(strokeColor);
    stroke(strokeColor);
    strokeWeight(5);

    drawMandala();
    drawTrails();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        strokeColor = color(255, 204, 0)
    } else if (keyCode === RIGHT_ARROW) {
        strokeColor = color(187, 246, 250);
    } else if (keyCode === UP_ARROW) {
        saveCanvas(canvas, 'mandal', 'png')
    }
}