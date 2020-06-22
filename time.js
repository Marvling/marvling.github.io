let bgColor;
let fillColor;

let button1;
let button2;

let looping = true;

let getTime;
let getMilli;
let getSecond;
let getMinute;
let getHour;

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

function drawFillDiamondTime(centerX, centerY, fullHeight, duration, decimal = 1) {

    push();
    translate(centerX, centerY);

    if (duration == getMilli) {
        stop1 = 1000
    }
    else {
        stop1 = 60
    }

    let yRange = map(duration, stop1, 0, -1 * fullHeight / 2, fullHeight / 2);
    let yRangeStop = map(duration, stop1, 0, -1 * fullHeight / 2, fullHeight / 2);

    let x1 = fullHeight / 2 - abs(yRange);
    let x1Stop = fullHeight / 2 - abs(yRange);

    if (duration > stop1 / 2) {
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

    // switch (switchState) {
    //     case '0':
    //         break;
    //     case '1':
    //         for (let i = 0; i < 4; i++) {
    //             if (i == 0) {
    //                 drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
    //             }
    //         }
    //         break;
    //     case '2':
    //         for (let i = 0; i < 4; i++) {
    //             if (i == 1) {
    //                 drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
    //             }
    //         }
    //         break;
    //     case '3':
    //         for (let i = 0; i < 4; i++) {
    //             if (i == 0) {
    //                 drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
    //             }
    //             if (i == 1) {
    //                 drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
    //             }
    //         }
    //         break;
    //     case '4':
    //         for (let i = 0; i < 4; i++) {
    //             if (i == 2) {
    //                 drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
    //             }
    //         }
    //         break;
    //     case '5':
    //         for (let i = 0; i < 4; i++) {
    //             if (i == 0) {
    //                 drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
    //             }
    //             if (i == 2) {
    //                 drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
    //             }
    //         }
    //         break;
    //     case '6':
    //         for (let i = 0; i < 4; i++) {
    //             if (i == 1) {
    //                 drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
    //             }
    //             if (i == 2) {
    //                 drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
    //             }
    //         }
    //         break;
    //     case '7':
    //         for (let i = 0; i < 4; i++) {
    //             if (i == 0) {
    //                 drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
    //             }
    //             if (i == 1 || i == 2) {
    //                 drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
    //             }
    //         }
    //         break;
    //     case '8':
    //         for (let i = 0; i < 4; i++) {
    //             if (i == 3) {
    //                 drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
    //             }
    //         }
    //         break;
    //     case '9':
    //         for (let i = 0; i < 4; i++) {
    //             if (i == 0) {
    //                 drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
    //             }
    //             if (i == 3) {
    //                 drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
    //             }
    //         }
    //         break;
    //     default:
    //         break;
    // }

    switch (switchState) {
        case '0':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
            }
            break;
        case '1':
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
            }
            break;
        case '2':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
            }
            break;
        case '3':
            for (let i = 0; i < 4; i++) {
                if (i == 2) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
            }

            break;
        case '4':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
                if (i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '5':
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
                if (i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '6':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
                if (i == 1 || i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '7':

            for (let i = 0; i < 4; i++) {
                if (i == 3) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
            }
            break;
        case '8':
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    drawFillDiamondTime(centerX, centerY - (i * fullHeight), fullHeight, clock);
                }
                if (i == 3) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '9':
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
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
function drawClock10Alt(centerX, centerY, fullHeight, clock, decimal = 0) {

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
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '2':
            for (let i = 0; i < 4; i++) {
                if (i == 1) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '3':
            for (let i = 0; i < 4; i++) {
                if (i == 0 || i == 1) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '4':
            for (let i = 0; i < 4; i++) {
                if (i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '5':
            for (let i = 0; i < 4; i++) {
                if (i == 0 || i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '6':
            for (let i = 0; i < 4; i++) {
                if (i == 1 || i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '7':
            for (let i = 0; i < 4; i++) {
                if (i == 0 || i == 1 || i == 2) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '8':
            for (let i = 0; i < 4; i++) {
                if (i == 3) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        case '9':
            for (let i = 0; i < 4; i++) {
                if (i == 0 || i == 3) {
                    drawFillDimaond(centerX, centerY - (i * fullHeight), fullHeight, fillColor);
                }
            }
            break;
        default:
            break;
    }

}

function draw() {

    background(bgColor);

    getTime = new Date();
    getMilli = getTime.getMilliseconds();
    getSecond = getTime.getSeconds();
    getMinute = getTime.getMinutes();
    getHour = getTime.getHours();

    let circleX = width / 2;
    let circleY = height / 2;
    let circleR = 100;

    drawClock1(circleX + 0, circleY, circleR, second);
    drawClock10Alt(circleX - 100, circleY, circleR, second);


    //TODO: circleR value offets the fill and outline

    //OUTLINE
    for (let i = 0; i < 4; i++) {
        drawStrokeDiamond(circleX, circleY - (i * circleR), circleR, 255);
    }
}