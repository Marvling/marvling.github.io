/* Adding the font to the html head
works only if the sketch is called in the head tag */
let linkFont = document.createElement('link');
linkFont.setAttribute('rel', 'stylesheet');
linkFont.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap');
document.head.appendChild(linkFont);

let bgColor;
let defaultFillColor;

let button1;
let button2;

let looping = true;


const navbar = document.getElementsByClassName('nav');
const canvasHeight = Math.max(navbar.clientHeight || 0, window.innerHeight || 0);
const canvasWidth = Math.max(navbar.clientWidth || 0, window.innerWidth || 0) - 272;

function preload() {
    // font = loadFont('marvling.github.io/Assets/fonts/UbuntuMono-Regular.ttf');
    //if running on local server un-comment the next line
    // font = loadFont('assets/fonts/UbuntuMono-Regular.ttf');
}


function setup() {

    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("p5-holder");

    bgColor = color('#d2d6d6');
    defaultFillColor = color('#7b7ebc');
}

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

function changeColor() {
    defaultFillColor = color(random(255), random(255), random(255));
}

function drawStrokeDiamond(centerX, centerY, side, strokeColor = 255) {

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

function drawFillDimaond(centerX, centerY, side, fillColor = defaultFillColor) {

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

function drawFillDiamondTime(centerX, centerY, fullHeight, duration, maxMilli, fillColor = defaultFillColor) {

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

function drawClock(centerX, centerY, fullHeight, duration, maxMilli, digit, fillColor) {

    for (let i = 0; i < 4; i++) {
        drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, 255);
    }
    switch (digit) {
        case 0:
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 1:
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 2:
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 3:
            for (let i = 0; i < 4; i++) {
                if (i == 2) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }

            break;
        case 4:
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
                if (i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 5:
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
                if (i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 6:
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
                if (i == 1 || i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 7:

            for (let i = 0; i < 4; i++) {
                if (i == 3) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 8:
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
                if (i == 3) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case 9:
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, duration, maxMilli, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
                if (i == 3) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                    drawStrokeDiamond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
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

    let c1 = color('#7B7EBD');
    let c11 = lerpColor(c1, color('#FFFFFF'), 0.4); //light ((seconds))
    let c12 = lerpColor(c1, color('#000000'), 0.3); //dark (hours)

    background(bgColor);

    let circleX = 400;
    let circleY = 450;
    const circleR = 100;

    drawClock(circleX, circleY, circleR, k % 1000, 1000, (k % 10000 - k % 1000) / 1000, c11);
    drawClock(circleX - 53, circleY + 50, circleR, k % 10000, 10000, (k % 100000 - k % 10000) / 10000, c11);
    drawClock(circleX - 106, circleY, circleR, k % 60000, 60000, systemTime.getMinutes() % 10, c1);
    drawClock(circleX - 159, circleY + 50, circleR, k % 600000, 600000, (systemTime.getMinutes() - (systemTime.getMinutes() % 10)) / 10, c1);
    drawClock(circleX - 212, circleY, circleR, k % 6000000, 6000000, systemTime.getHours() % 10, c12);
    drawClock(circleX - 265, circleY + 50, circleR, k % 60000000, 60000000, (systemTime.getHours() - (systemTime.getHours() % 10)) / 10, c12);

    // Text
    push();
    fill(0);
    textAlign(CENTER);
    textSize(48);
    textFont('Ubuntu Mono');
    fill(255);
    text(nf(systemTime.getHours(), 2), circleX - 2.25 * circleR, circleY + 1.75 * circleR);
    text(':', circleX - 1.75 * circleR, circleY + 1.75 * circleR);
    text(nf(systemTime.getMinutes(), 2), circleX - 1.25 * circleR, circleY + 1.75 * circleR);
    text(':', circleX - 0.75 * circleR, circleY + 1.75 * circleR);
    text(nf(systemTime.getSeconds(), 2), circleX - 0.25 * circleR, circleY + 1.75 * circleR);
    pop();
}
