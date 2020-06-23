let linesNumber = 8;
let angle;

let bgColor;
let strokeColor;

let trailHistory = [];

let buttonSave;
let buttonColorW;
let buttonColorY;
let buttonColorP;
let buttonColorG;

function setup() {

    let canvasDiv = document.getElementById('p5-holder');
    let width = canvasDiv.offsetWidth - 272;
    let height = canvasDiv.offsetHeight;
    let sketchCanvas = createCanvas(width, height);
    sketchCanvas.parent("p5-holder");

    buttonSave = select('#p5-save');
    buttonSave.mousePressed(buttonSaveImage);

    buttonColorW = select('#p5-c-white');
    buttonColorW.mousePressed(buttonChangeColorWhite);
    buttonColorY = select('#p5-c-yellow');
    buttonColorY.mousePressed(buttonChangeColorYellow);
    buttonColorP = select('#p5-c-purple');
    buttonColorP.mousePressed(buttonChangeColorPurple);
    buttonColorG = select('#p5-c-green');
    buttonColorG.mousePressed(buttonChangeColorGreen);

    translate(width / 2, height / 2)
    bgColor = color('#d2d6d6');
    strokeColor = color('#7b7ebc');

    angle = 2 * PI / linesNumber;
}

function buttonChangeColorWhite() {
    let element = document.querySelector('#p5-c-white')
    let style = getComputedStyle(element)
    let styleColor = style.color

    strokeColor = styleColor
}
function buttonChangeColorPurple() {
    let element = document.querySelector('#p5-c-purple')
    let style = getComputedStyle(element)
    let styleColor = style.color

    strokeColor = styleColor
}
function buttonChangeColorYellow() {
    let element = document.querySelector('#p5-c-yellow')
    let style = getComputedStyle(element)
    let styleColor = style.color

    strokeColor = styleColor
}
function buttonChangeColorGreen() {

    let element = document.querySelector('#p5-c-green')
    let style = getComputedStyle(element)
    let styleColor = style.color

    strokeColor = styleColor
}
function buttonSaveImage() {
    saveCanvas(canvas, 'mandal', 'png')
}

function drawMandala() {

    if (mouseIsPressed) {
        for (let i = 0; i < linesNumber; i++) {
            // noStroke();
            rotate(angle);

            beginShape(LINES);
            vertex(mouseX - width / 2, mouseY - height / 2);
            vertex(pmouseX - width / 2, pmouseY - height / 2);
            endShape();

            let trailData = createVector(mouseX - width / 2, mouseY - height / 2);
            trailHistory.push(trailData);

            if (trailHistory.length > 299) {
                trailHistory.shift();
            }

        }
    }
}

function drawTrails() {

    for (let i = 0; i < linesNumber; i++) {
        rotate(angle);


        if (trailHistory.length > 0) {
            beginShape(LINES);
            let pos = trailHistory[0];
            // console.log(pos);
            vertex(pos.x, pos.y)
            endShape();
        }

        // beginShape(LINES);
        // for (let i = 0; i < trailHistory.length; i++) {
        //     let pos = trailHistory[i];
        //     vertex(pos.x, pos.y);
        // }
        // endShape();

    }
}

function mouseReleased() {
    console.log('a');
    trailHistory = []
}

//Make it so that the image stays on the screen after the mouse is released
function draw() {

    background(bgColor);
    translate(width / 2, height / 2);

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