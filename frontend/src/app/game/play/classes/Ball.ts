import { Vector } from "p5";

import Base from "./Base";
import UninitializedP5InstanceError from "./UninitializedP5InstanceError";

export class Ball extends Base {
  public position: Vector;
  public radius: number;

  constructor(x: number, y: number, radius: number) {
    super();

    this.position = new Vector(x, y);
    this.radius = radius;
  }

  draw() {
    if (!this.p5) {
      throw new UninitializedP5InstanceError();
    }

    this.p5.circle(this.position.x, this.position.y, this.radius);
  }
}
