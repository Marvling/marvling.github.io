let linesNumber = 8;
let angle;
let canvas;

let strokeColor;

function setup() {

    let canvasDiv = document.getElementById('p5-holder');
    let width = canvasDiv.offsetWidth - 272;
    let height = canvasDiv.offsetHeight;
    let sketchCanvas = createCanvas(width, height);

    sketchCanvas.parent("mandalina");

    let bgColor = color('#d2d6d6')
    background(bgColor);

    angle = 2 * PI / linesNumber;
    strokeColor = color('#7b7ebc');


}

function mouseDragged() {
    for (let i = 0; i < linesNumber; i++) {
        rotate(angle);
        if (i % 2 == 0) {
            beginShape(LINES);
            vertex(mouseX - width / 2, mouseY - height / 2);
            vertex(pmouseX - width / 2, pmouseY - height / 2);
            endShape();
        }
        else {
            beginShape(LINES);
            vertex(-(mouseX - width / 2), mouseY - height / 2);
            vertex(-(pmouseX - width / 2), pmouseY - height / 2);
            endShape();
        }

    }
}

function draw() {

    translate(width / 2, height / 2);

    noFill();
    stroke(strokeColor);
    strokeWeight(3);

    push();
    fill(0);
    strokeWeight(0);
    stroke(color(0, 0));
    textAlign(CENTER);
    text('click and drag', 0, 400 - height);
    pop();
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