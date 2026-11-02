// Slim p5 build: core plus only the modules our sketches use (full p5 is ~350KB gzipped).
// If a sketch needs another p5 feature, add its module here (see node_modules/p5/package.json exports).
import type P5 from 'p5';
import core from 'p5/core';
import color from 'p5/color';
import events from 'p5/events';
import math from 'p5/math';
import shape from 'p5/shape';
import type from 'p5/type';

const p5 = core as unknown as typeof P5;
for (const addon of [color, events, math, shape, type]) addon(p5);

export default p5;
