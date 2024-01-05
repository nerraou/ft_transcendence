import Base from "./Base";
import { Vector } from "./Vector";
import UninitializedCanvasInstanceError from "./UninitializedCanvasInstanceError";

export default class Paddle extends Base {
  public position: Vector;
  public width: number;
  public height: number;

  constructor(x: number, y: number, width: number, height: number) {
    super();

    this.position = new Vector(x, y);
    this.width = width;
    this.height = height;
  }

  draw(color = "#fff") {
    if (!this.canvas) {
      throw new UninitializedCanvasInstanceError();
    }

    this.canvas.fill(color);
    this.canvas.rect(this.position.x, this.position.y, this.width, this.height);
  }
}
