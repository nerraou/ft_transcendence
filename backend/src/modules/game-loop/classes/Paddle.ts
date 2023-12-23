import Vector from "./Vector";

export default class Paddle {
  public position: Vector;
  public width: number;
  public height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.position = new Vector(x, y);
    this.width = width;
    this.height = height;
  }
}
