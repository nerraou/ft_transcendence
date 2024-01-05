import Base from "./Base";
import { Vector } from "./Vector";
import UninitializedCanvasInstanceError from "./UninitializedCanvasInstanceError";

export class Ball extends Base {
  public position: Vector;
  public radius: number;

  constructor(x: number, y: number, radius: number) {
    super();

    this.position = new Vector(x, y);
    this.radius = radius;
  }

  draw() {
    if (!this.canvas) {
      throw new UninitializedCanvasInstanceError();
    }

    this.canvas.circle(this.position.x, this.position.y, this.radius);
  }
}
