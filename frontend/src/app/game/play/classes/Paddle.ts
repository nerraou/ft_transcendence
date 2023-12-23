import { Vector } from "p5";

import Base from "./Base";
import UninitializedP5InstanceError from "./UninitializedP5InstanceError";

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
    if (!this.p5) {
      throw new UninitializedP5InstanceError();
    }

    this.p5.fill(color);
    this.p5.noStroke();
    this.p5.rect(this.position.x, this.position.y, this.width, this.height);
  }
}
