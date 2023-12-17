import Vector from "./Vector";

export class Ball {
  public position: Vector;
  public radius: number;

  constructor(x: number, y: number, radius: number) {
    this.position = new Vector(x, y);
    this.radius = radius;
  }
}
