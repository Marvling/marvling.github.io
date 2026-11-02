// "Nakit": a clock of diamond columns. Each column is one digit of hh:mm:ss;
// one diamond fills up over that digit's period, others stay solid to encode the value.
import type P5 from 'p5';
import p5 from './lib/p5';
import '@fontsource/ubuntu-mono/latin-400.css';

// digit -> [diamond that fills over time, diamonds drawn solid], diamonds indexed bottom-up
const DIGITS: [number, number[]][] = [
  [0, []],
  [1, []],
  [1, [0]],
  [2, []],
  [0, [2]],
  [1, [2]],
  [0, [1, 2]],
  [3, []],
  [0, [3]],
  [1, [3]],
];
const SIZE = 100;
const X = 400;
const Y = 450;
// the drawing spans roughly 0..500 x 0..650 at scale 1
const BOX = { w: 500, h: 680 };

export default function nakit(el: HTMLElement) {
  new p5((p) => {
    const diamond = (x: number, y: number, side: number) => {
      const edge = side * Math.cos(Math.PI / 4);
      p.push();
      p.rectMode(p.CENTER);
      p.translate(x, y);
      p.rotate(Math.PI / 4);
      p.rect(0, 0, edge, edge);
      p.pop();
    };

    // bottom part of a diamond, filled in proportion to elapsed/period
    const filling = (x: number, y: number, side: number, elapsed: number, period: number) => {
      const yRange = p.map(elapsed, period, 0, -side / 2, side / 2);
      const x1 = side / 2 - Math.abs(yRange);
      const pastHalf = elapsed > period / 2;
      const xStop = pastHalf ? side / 2 : x1;
      const yStop = pastHalf ? 0 : yRange;
      p.push();
      p.translate(x, y);
      p.beginShape();
      p.vertex(-xStop, yStop);
      p.vertex(-x1, yRange);
      p.vertex(0, yRange);
      p.vertex(x1, yRange);
      p.vertex(xStop, yStop);
      p.vertex(0, side / 2);
      p.endShape(p.CLOSE);
      p.pop();
    };

    const column = (
      x: number,
      y: number,
      elapsed: number,
      period: number,
      digit: number,
      color: P5.Color,
    ) => {
      const [growing, solid] = DIGITS[digit]!;
      p.noFill();
      p.stroke(255);
      for (let i = 0; i < 4; i++) diamond(x, y - i * SIZE, SIZE);
      for (let i = 0; i < 4; i++) {
        if (i !== growing && !solid.includes(i)) continue;
        p.noStroke();
        p.fill(color);
        if (i === growing) filling(x, y - i * SIZE, SIZE, elapsed, period);
        else diamond(x, y - i * SIZE, SIZE);
        p.noFill();
        p.stroke(color);
        diamond(x, y - i * SIZE, SIZE);
      }
    };

    p.setup = () => {
      p.createCanvas(el.clientWidth, el.clientHeight);
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) p.frameRate(1);
    };

    p.windowResized = () => p.resizeCanvas(el.clientWidth, el.clientHeight);

    p.draw = () => {
      const now = new Date();
      const t = now.getTime();
      const h = now.getHours();
      const m = now.getMinutes();
      const base = p.color('#7B7EBD');
      const light = p.lerpColor(base, p.color('#FFFFFF'), 0.4);
      const dark = p.lerpColor(base, p.color('#000000'), 0.3);

      p.background('#d2d6d6');
      p.scale(Math.min(1, p.width / BOX.w, p.height / BOX.h));

      const digitOf = (period: number) => Math.floor((t % (period * 10)) / period);
      column(X, Y, t % 1000, 1000, digitOf(1000), light);
      column(X - 53, Y + 50, t % 10000, 10000, digitOf(10000), light);
      column(X - 106, Y, t % 60000, 60000, m % 10, base);
      column(X - 159, Y + 50, t % 600000, 600000, Math.floor(m / 10), base);
      column(X - 212, Y, t % 6000000, 6000000, h % 10, dark);
      column(X - 265, Y + 50, t % 60000000, 60000000, Math.floor(h / 10), dark);

      p.noStroke();
      p.fill(255);
      p.textAlign(p.CENTER);
      p.textSize(48);
      p.textFont('Ubuntu Mono');
      const textY = Y + 1.75 * SIZE;
      const two = (n: number) => String(n).padStart(2, '0');
      [two(h), ':', two(m), ':', two(now.getSeconds())].forEach((s, i) =>
        p.text(s, X - (2.25 - i * 0.5) * SIZE, textY),
      );
    };
  }, el);
}
