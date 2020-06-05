let linesNumber = 8;
let angle;
let canvas;

let strokeColor;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent('p5-holder')
    background(150);

    angle = 2 * PI / linesNumber;
    strokeColor = color(255, 204, 0);
}

function mouseDragged() {
    translate(width / 2, height / 2);
    for (let i = 0; i < linesNumber; i++) {
        rotate(angle);
        if (i % 2 == 0) {
            beginShape(LINES);
            vertex(mouseX - width / 2, mouseY - height / 2);
            vertex(pmouseX - width / 2, pmouseY - height / 2);
            endShape();
        } else {
            beginShape(LINES);
            vertex(-(mouseX - width / 2), mouseY - height / 2);
            vertex(-(pmouseX - width / 2), pmouseY - height / 2);
            endShape();
        }

    }
}

function draw() {

    noFill();
    stroke(strokeColor);
    strokeWeight(3)
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