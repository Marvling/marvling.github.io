// Click to add a walker that circles with Perlin-noise wobble and leaves a shrinking trail.
import type P5 from 'p5';
import p5 from './lib/p5';

class Walker {
  x = 0;
  y = 0;
  size = 25;
  angle = Math.PI / 2;
  step = Math.PI / 64;
  trail: { x: number; y: number }[] = [];
  noiseOffset: number;
  r: number;

  constructor(private p: P5) {
    this.noiseOffset = p.random(0, 100);
    this.r = p.random(90, 180);
  }

  update() {
    const { p } = this;
    const wobble = p.noise(this.noiseOffset) * 200;
    this.x = Math.sin(this.angle) * this.r + wobble;
    this.y = Math.cos(this.angle) * this.r + wobble;
    this.noiseOffset += 0.03;
    this.angle += this.step;
    this.size = 25 * (2 + Math.sin(this.angle));
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 150) this.trail.shift();
  }

  draw() {
    const { p } = this;
    p.ellipse(this.x, this.y, this.size);
    let trailSize = 20;
    for (let i = 0; i < this.trail.length; i += 5) {
      p.ellipse(this.trail[i]!.x, this.trail[i]!.y, trailSize);
      trailSize -= trailSize / 18;
    }
  }
}

export default function followers(el: HTMLElement) {
  new p5((p) => {
    const walkers: Walker[] = [];
    let colors: P5.Color[] = [];

    p.setup = () => {
      p.createCanvas(el.clientWidth, el.clientHeight);
      colors = [p.color(0, 200, 80, 80), p.color(99, 104, 199, 80), p.color(241, 245, 69, 80)];
    };

    p.windowResized = () => p.resizeCanvas(el.clientWidth, el.clientHeight);

    p.mouseClicked = () => {
      walkers.push(new Walker(p));
    };

    p.draw = () => {
      // walkers orbit roughly (100, 100) from the origin, so offset to center them
      p.translate(p.width / 2 - 100, p.height / 2 - 100);
      p.background(210, 214, 214);
      p.noStroke();
      p.fill(255);
      p.text('click', 70, -130);
      walkers.forEach((walker, i) => {
        p.fill(colors[i % colors.length]!);
        walker.update();
        walker.draw();
      });
    };
  }, el);
}
