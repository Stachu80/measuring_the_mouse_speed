import { fromEvent } from "rxjs";
import { bufferTime, map, pairwise, tap } from "rxjs/operators";

const element = document.getElementById("stripe");
const coordinatesFromEvent = () =>
  map(e => ({
    coordinates: {
      x: (e as MouseEvent).clientX,
      y: (e as MouseEvent).clientY
    }
  }));

const getDistance = () =>
  map(e => {
    const element = e as any;
    return distance(
      element[0].coordinates.x,
      element[1].coordinates.x,
      element[0].coordinates.y,
      element[1].coordinates.y
    );
  });

const distance = (x1: number, x2: number, y1: number, y2: number): number => {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
};

const mediumLenght = () =>
  map(e => {
    const element = e as Array<number>;
    const num = element.reduce((acc, val) => acc + val, 0);
    return num != 0 ? num / element.length : num;
  });

const mouseMove$ = fromEvent(document, "mousemove").pipe(
  coordinatesFromEvent(),
  pairwise(),
  getDistance(),
  bufferTime(100),
  mediumLenght()
);

mouseMove$.subscribe(speed => {
  element.style.width = speed + "px";
});
