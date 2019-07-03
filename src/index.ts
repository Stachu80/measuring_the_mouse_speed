import { fromEvent } from "rxjs";
import { bufferTime, map, pairwise, tap } from "rxjs/operators";
import { interpolate } from 'd3-interpolate'
import './style.css'

const colorInterpolator = interpolate('green', 'red')

class Point {
  constructor(readonly x: number, readonly y: number) {

  }
}

const element = document.getElementById("stripe");
const coordinatesFromEvent = () =>
  map((e: MouseEvent) => new Point(e.clientX, e.clientY));

const getDistance = () =>
  map(([p1, p2]: [Point, Point]) => {
    return distance(
      p1.x,
      p2.x,
      p1.y,
      p2.y
    );
  });

const distance = (x1: number, x2: number, y1: number, y2: number): number => {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
};

const mediumLenght = () =>
  map((e: Array<number>) => {
    const num = e.reduce((acc, val) => acc + val, 0);
    return num != 0 ? num / e.length : num;
  });

const clampMax = (max: number) =>
  map((val: number) => Math.min(max, val));

const mouseMove$ = fromEvent(document, "mousemove").pipe(
  coordinatesFromEvent(),
  pairwise(),
  getDistance(),
  bufferTime(50),
  mediumLenght(),
  clampMax(100)
);

mouseMove$.subscribe(speed => {
  element.style.backgroundColor = colorInterpolator(speed / 100);
  element.style.transform = `scaleX(${speed / 100})`;  
});