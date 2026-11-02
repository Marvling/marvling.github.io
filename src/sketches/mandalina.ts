// Click and drag to draw a trail mirrored around 8 axes. "change mode" keeps the drawing.
import type P5 from 'p5';
import p5 from './lib/p5';

const LINES = 8;
const TRAIL_LENGTH = 19;

export default function mandalina(el: HTMLElement) {
  new p5((p) => {
    let trail: P5.Vector[] = [];
    let disappearing = true;

    p.setup = () => {
      p.createCanvas(el.clientWidth, el.clientHeight);
      const button = document.createElement('button');
      button.className = 'sketch-button';
      button.textContent = 'change mode';
      button.addEventListener('click', () => {
        disappearing = !disappearing;
        trail = [];
      });
      el.append(button);
    };

    p.windowResized = () => p.resizeCanvas(el.clientWidth, el.clientHeight);

    p.mouseReleased = () => {
      if (disappearing) trail = [];
    };

    p.draw = () => {
      p.background('#d2d6d6');
      p.translate(p.width / 2, p.height / 2);
      p.stroke('#7b7ebc');
      p.strokeWeight(5);
      p.noFill();

      if (p.mouseIsPressed && p.mouseX > 0) {
        trail.push(p.createVector(p.mouseX - p.width / 2, p.mouseY - p.height / 2));
        if (disappearing && trail.length > TRAIL_LENGTH) trail.shift();
      }
      for (let i = 0; i < LINES; i++) {
        p.rotate(p.TWO_PI / LINES);
        p.beginShape();
        for (const point of trail) p.vertex(point.x, point.y);
        p.endShape();
      }
    };
  }, el);
}
