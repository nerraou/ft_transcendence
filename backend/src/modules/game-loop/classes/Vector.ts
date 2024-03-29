export default class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}
