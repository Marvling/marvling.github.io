let bgColor;
let fillColor;

let button;

function setup() {

    let canvasDiv = document.getElementById('p5-holder');
    let width = canvasDiv.offsetWidth - 272;
    let height = canvasDiv.offsetHeight;
    let sketchCanvas = createCanvas(width, height);

    sketchCanvas.parent("p5-holder");
    bgColor = color('#d2d6d6');
    fillColor = color('#7b7ebc');

    button = document.getElementById('but');
    // button.mousePressed(changeColor)

    frameRate(100);
}

function drawBinaryClock(decimal, xCoord = 500) {

    switch (decimal) {
        case '0':
            for (let i = 0; i < 4; i++) {
                ellipse(xCoord, (i + 6) * 40, 30)
            }
            break;
        case '1':
            ellipse(xCoord, 6 * 40, 30);
            ellipse(xCoord, 7 * 40, 30);
            ellipse(xCoord, 8 * 40, 30);
            fill(255);
            ellipse(xCoord, 9 * 40, 30);
            fill(0);
            break;
        case '2':
            ellipse(xCoord, 6 * 40, 30);
            ellipse(xCoord, 7 * 40, 30);
            fill(255);
            ellipse(xCoord, 8 * 40, 30);
            fill(0);
            ellipse(xCoord, 9 * 40, 30);
            break;
        case '3':
            ellipse(xCoord, 6 * 40, 30);
            ellipse(xCoord, 7 * 40, 30);
            fill(255);
            ellipse(xCoord, 8 * 40, 30);
            ellipse(xCoord, 9 * 40, 30);
            fill(0);
            break;
        case '4':
            ellipse(xCoord, 6 * 40, 30);
            fill(255);
            ellipse(xCoord, 7 * 40, 30);
            fill(0);
            ellipse(xCoord, 8 * 40, 30);
            ellipse(xCoord, 9 * 40, 30);
            break;
        case '5':
            ellipse(xCoord, 6 * 40, 30);
            fill(255);
            ellipse(xCoord, 7 * 40, 30);
            fill(0);
            ellipse(xCoord, 8 * 40, 30);
            fill(255);
            ellipse(xCoord, 9 * 40, 30);
            fill(0);
            break;
        case '6':
            ellipse(xCoord, 6 * 40, 30);
            fill(255);
            ellipse(xCoord, 7 * 40, 30);
            ellipse(xCoord, 8 * 40, 30);
            fill(0);
            ellipse(xCoord, 9 * 40, 30);
            break;
        case '7':
            ellipse(xCoord, 6 * 40, 30);
            fill(255);
            ellipse(xCoord, 7 * 40, 30);
            ellipse(xCoord, 8 * 40, 30);
            ellipse(xCoord, 9 * 40, 30);
            fill(0);
            break;
        case '8':
            fill(255);
            ellipse(xCoord, 6 * 40, 30);
            fill(0);
            ellipse(xCoord, 7 * 40, 30);
            ellipse(xCoord, 8 * 40, 30);
            ellipse(xCoord, 9 * 40, 30);
            break;
        case '9':
            fill(255);
            ellipse(xCoord, 6 * 40, 30);
            fill(0);
            ellipse(xCoord, 7 * 40, 30);
            ellipse(xCoord, 8 * 40, 30);
            fill(255)
            ellipse(xCoord, 9 * 40, 30);
            fill(0)
            break;
        default:
            break;
    }
}

function drawFillDiamond(centerX, centerY, fullHeight, duration) {

    push();

    translate(centerX, centerY);

    let yRange = map(duration, 100, 0, -1 * fullHeight / 2, fullHeight / 2);
    let yRangeStop = map(duration, 100, 0, -1 * fullHeight / 2, fullHeight / 2);

    let x1 = fullHeight / 2 - abs(yRange);
    let x1Stop = fullHeight / 2 - abs(yRange);

    if (duration > 50) {
        x1Stop = fullHeight / 2 //duranlar
        yRangeStop = 0 //duranlar
    }

    fill(fillColor);
    noStroke();

    beginShape();
    vertex(-x1Stop, yRangeStop) // left vertex 
    vertex(-x1, yRange) // left vertex riser
    vertex(0, yRange) // middle vertex
    vertex(x1, yRange); // right vertex riser
    vertex(x1Stop, yRangeStop); // right vertex
    vertex(0, fullHeight / 2) // bottom vertex
    endShape(CLOSE);

    pop();
}

function drawOutlineDimaond(centerX, centerY, side) {

    let diamondEdge = side * cos(PI / 4);

    push();
    noFill();
    stroke(255);
    rectMode(CENTER);
    translate(centerX, centerY);
    rotate(45 * PI / 180);
    rect(0, 0, diamondEdge, diamondEdge);
    pop();

}

function changeColor() {
    fillColor = color(random(255), random(255), random(255));
}

function draw() {
    let getTime = new Date();
    let getMilli1000 = getTime.getMilliseconds();
    let getMilli = map(getMilli1000, 0, 1000, 0, 100);
    let getSecond = getTime.getSeconds();
    let getMinute = getTime.getMinutes();
    let getHour = getTime.getHours();

    background(bgColor);

    let circleX = width / 2;
    let circleY = height / 2;
    let circleR = 100;

    //TODO: circleR value offets the fill and outline

    // DRAW THE LAYOUT
    for (let i = 0; i < 4; i++) {
        for (let k = 0; k < 4; k++) {
            drawOutlineDimaond(circleX + (k * circleR) - 200, circleY - (i * circleR) + 100, circleR);
            drawOutlineDimaond(circleX + (k * circleR) - (circleR / 2) - 200, circleY + (circleR / 2) - (i * circleR) + 100, circleR)
        }
    }

    drawFillDiamond(circleX, circleY, circleR, getMilli);
    drawFillDiamond(circleX + circleR / 2, circleY + circleR / 2, circleR, getMilli);
    drawFillDiamond(circleX, circleY + circleR, circleR, getMilli);
}