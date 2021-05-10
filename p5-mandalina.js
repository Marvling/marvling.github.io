let linesNumber = 8;
let angle;

let bgColor;
let strokeColor;

let trailHistory = [];

let buttonModeSelect;
let disappearingTrail = true;

//Canvas settigns
const navbar = document.getElementsByClassName('nav');
const canvasHeight = Math.max(navbar.clientHeight || 0, window.innerHeight || 0);
const canvasWidth = Math.max(navbar.clientWidth || 0, window.innerWidth || 0) - 272;

function toggleDisappearingTrail() {
    disappearingTrail = !disappearingTrail;
    trailHistory = [];
}

function setup() {

    textSize(32);

    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("p5-holder");

    buttonModeSelect = createButton('change mode');
    buttonModeSelect.position(canvasWidth, 40)
    buttonModeSelect.mousePressed(toggleDisappearingTrail);

    bgColor = color('#d2d6d6');
    strokeColor = color('#7b7ebc');

    angle = 2 * PI / linesNumber;
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

    push();
    noStroke();
    fill(255);
    text('click and drag', -50, height / -2 + 50);
    pop();

    stroke(strokeColor);
    strokeWeight(5);
    noFill();

    getTrailPoints();
    drawTrail();
}