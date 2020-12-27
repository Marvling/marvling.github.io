
class walker {
    constructor() {

        this.x = 0;
        this.y = 0;
        this.size = 25;

        this.noiseOffset = random(0, 100);

        this.angle = PI / 2;
        this.r = random(90, 180);
        this.step = PI / 64;

        this.trailHistory = [];

    }
    display() {
        ellipse(this.x, this.y, this.size);
    }

    changeSize() {
        this.size = 25 * (2 + sin(this.angle))
    }

    moveCircle() {

        this.x = sin(this.angle) * this.r + noise(this.noiseOffset) * 200;
        this.y = cos(this.angle) * this.r + noise(this.noiseOffset) * 200;

        this.noiseOffset += 0.03
        this.angle += this.step;
    }

    recordTrail(historyLength = 150, trailData) {

        trailData = createVector(this.x, this.y)
        this.trailHistory.push(trailData);

        if (this.trailHistory.length > historyLength) {
            this.trailHistory.shift();
        }
    }

    drawTrail(pos, trailSize = 20) {

        push();
        // noFill();
        // beginShape();
        for (let i = 0; i < this.trailHistory.length; i += 5) {
            pos = this.trailHistory[i];
            ellipse(pos.x, pos.y, trailSize);
            trailSize -= trailSize / 18
        }
        // endShape();
        pop();
    }
}
