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

    getTime = new Date();
    getMilli = getTime.getMilliseconds();


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

function drawFillDiamondTime(centerX, centerY, fullHeight, duration, maxMilli = 1000) {

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

//clock parameter only takes second, minute, or hour
//decimal parameter only takes 1 or 0
function drawClock1(centerX, centerY, fullHeight, clock, decimal = 1) {


    switch (switchState) {
        case '0':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock, decimal);
                }
            }
            break;
        case '1':
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock, decimal);
                }
            }
            break;
        case '2':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock, decimal);
                }
            }
            break;
        case '3':
            for (let i = 0; i < 4; i++) {
                if (i == 2) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock, decimal);
                }
            }

            break;
        case '4':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock, decimal);
                }
                if (i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '5':
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock, decimal);
                }
                if (i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '6':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock, decimal);
                }
                if (i == 1 || i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '7':

            for (let i = 0; i < 4; i++) {
                if (i == 3) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock, decimal);
                }
            }
            break;
        case '8':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock, decimal);
                }
                if (i == 3) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '9':
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock, decimal);
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
function drawClock10(centerX, centerY, fullHeight, clock, decimal = 0) {

    switch (clock) {
        case second:
            clock = getMilli;
            switchState = nf(getSecond, 2).charAt(decimal);
            break;
        case minute:
            clock = getSecond
            switchState = nf(getMinute, 2).charAt(decimal);
            break;
        case hour:
            clock = getMinute;
            switchState = nf(getHour, 2).charAt(decimal);
            break;
    }

    switch (switchState) {
        case '0':
            break;
        case '1':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
            }
            break;
        case '2':
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
            }
            break;
        case '3':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
            }
            break;
        case '4':
            for (let i = 0; i < 4; i++) {
                if (i == 2) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
            }
            break;
        case '5':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
                if (i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '6':
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
                if (i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '7':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
                if (i == 1 || i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '8':
            for (let i = 0; i < 4; i++) {
                if (i == 3) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
            }
            break;
        case '9':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
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

    background(bgColor);

    let circleX = width / 2;
    let circleY = height / 2;
    let circleR = 100;

    drawFillDiamondTime(circleX, circleY, circleR, systemTime.getTime() % 1000);
    drawFillDiamondTime(circleX - 100, circleY, circleR, systemTime.getTime() % 10000, maxMilli = 10000);
    drawFillDiamondTime(circleX - 200, circleY, circleR, systemTime.getTime() % 60000, maxMilli = 60000);
    drawFillDiamondTime(circleX - 300, circleY, circleR, systemTime.getTime() % 600000, maxMilli = 600000);



    a = (systemTime.getTime() % 1000 + 1) / 1000 * width;
    b = (systemTime.getTime() % 10000 + 1) / 10000 * width;

    console.log(systemTime.getMilliseconds());

    line(0, 120, a, 120);
    line(0, 100, b, 100);

    //OUTLINE
    for (let i = 0; i < 4; i++) {
        drawStrokeDiamond(circleX, circleY - (i * circleR), circleR, 255);
    }
}