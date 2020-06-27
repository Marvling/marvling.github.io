let linesNumber = 8;
let angle;

let bgColor;
let strokeColor;

let trailHistory = [];

let buttonModeSelect;
let disappearingTrail;

function toggleDisappearingTrail() {
    disappearingTrail = !disappearingTrail;
    trailHistory = [];
}

function setup() {

    let canvasDiv = document.getElementById('p5-holder');
    let width = canvasDiv.offsetWidth - 272;
    let height = canvasDiv.offsetHeight;
    let sketchCanvas = createCanvas(width, height);
    sketchCanvas.parent("p5-holder");

    buttonModeSelect = select('#p5-mode');
    buttonModeSelect.mousePressed(toggleDisappearingTrail);

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

function getTrailPoints() {
    if (mouseIsPressed && mouseX > 0) {
        for (let i = 0; i < linesNumber; i++) {
            rotate(angle);

            let trailData = createVector(mouseX - width / 2, mouseY - height / 2);
            trailHistory.push(trailData);


            if (disappearingTrail) {
                if (trailHistory.length > 149) {
                    trailHistory.shift();
                }
            }
        }
    }
}

function drawTrail() {

    for (let i = 0; i < linesNumber; i++) {
        rotate(angle);

        beginShape();
        for (let i = 0; i < trailHistory.length; i++) {
            let pos = trailHistory[i];
            vertex(pos.x, pos.y);
        }
        endShape();
    }
}

function mouseReleased() {
    if (disappearingTrail) {
        trailHistory = [];
    }
}

function draw() {

    background(bgColor);
    translate(width / 2, height / 2);

    stroke(strokeColor);
    strokeWeight(5);
    noFill();

    getTrailPoints();
    drawTrail();
}