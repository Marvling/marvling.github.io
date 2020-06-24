let bgColor;
let fillColor;

let button1;
let button2;

let looping = true;

function setup() {

    let canvasDiv = document.getElementById('p5-holder');
    let width = canvasDiv.offsetWidth - 272;
    let height = canvasDiv.offsetHeight;
    let sketchCanvas = createCanvas(width, height);
    sketchCanvas.parent("p5-holder");

    bgColor = color('#d2d6d6');
    fillColor = color('#7b7ebc');

    button1 = select('#but');
    button1.mousePressed(changeColor);

    button2 = select('#dur');
    button2.mousePressed(playPause);

    // frameRate(100);
}
//Button for stopping the loop
function playPause() {
    if (looping) {
        noLoop();
        looping = false
        button2.html('devamet')
    }
    else {
        loop();
        looping = true
        button2.html('bidur')
    }

}

//Button for changing the color
function changeColor() {
    fillColor = color(random(255), random(255), random(255));
}

function drawStrokeDiamond(centerX, centerY, side, strokeColor) {

    let diamondEdge = side * cos(PI / 4);

    push();
    noFill();
    stroke(strokeColor);
    rectMode(CENTER);
    translate(centerX, centerY);
    rotate(45 * PI / 180);
    rect(0, 0, diamondEdge, diamondEdge);
    pop();

}

function drawFillDimaond(centerX, centerY, side, fillColor) {

    let diamondEdge = side * cos(PI / 4);

    push();
    noStroke();
    fill(fillColor);
    rectMode(CENTER);
    translate(centerX, centerY);
    rotate(45 * PI / 180);
    rect(0, 0, diamondEdge, diamondEdge);
    pop();

}

function drawFillDiamondTime(centerX, centerY, fullHeight, duration, maxMilli) {

    push();
    translate(centerX, centerY);


    let yRange = map(duration, maxMilli, 0, -1 * fullHeight / 2, fullHeight / 2);
    let yRangeStop = map(duration, maxMilli, 0, -1 * fullHeight / 2, fullHeight / 2);

    let x1 = fullHeight / 2 - abs(yRange);
    let x1Stop = fullHeight / 2 - abs(yRange);

    if (duration > maxMilli / 2) {
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

function drawClock(centerX, centerY, fullHeight, duration, maxMilli, digit) {


    switch (digit) {
        case 0:
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli);
                }
            }
            break;
        case 1:
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli);
                }
            }
            break;
        case 2:
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli);
                }
            }
            break;
        case 3:
            for (let i = 0; i < 4; i++) {
                if (i == 2) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli);
                }
            }

            break;
        case 4:
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli);
                }
                if (i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 5:
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli);
                }
                if (i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 6:
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli);
                }
                if (i == 1 || i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 7:

            for (let i = 0; i < 4; i++) {
                if (i == 3) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli);
                }
            }
            break;
        case 8:
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli);
                }
                if (i == 3) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 9:
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli);
                }
                if (i == 3) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        default:
            break;
    }

}

function draw() {

    let systemTime = new Date();
    let k = systemTime.getTime();

    background(bgColor);

    let circleX = width / 2;
    let circleY = height / 2;
    let circleR = 100;

    drawClock(circleX, circleY, circleR, k % 1000, 1000, (k % 10000 - k % 1000) / 1000);
    drawClock(circleX - 50, circleY + 50, circleR, k % 10000, 10000, (k % 100000 - k % 10000) / 10000);
    // drawFillDiamondTime(circleX - 100, circleY, circleR, k % 10000, maxMilli = 10000);
    drawFillDiamondTime(circleX - 200, circleY, circleR, k % 60000, maxMilli = 60000);
    drawFillDiamondTime(circleX - 300, circleY, circleR, k % 600000, maxMilli = 600000);



    a = (k % 1000 + 1) / 1000 * width;
    b = (k % 10000 + 1) / 10000 * width;

    console.log((k % 10000 - k % 1000) / 1000);


    line(0, 120, a, 120);
    line(0, 100, b, 100);

    //OUTLINE
    for (let i = 0; i < 4; i++) {
        drawStrokeDiamond(circleX, circleY - (i * circleR), circleR, 255);
    }
}