import { Canvas } from "./Canvas";

export default abstract class Base {
  public canvas: Canvas | null;

  constructor() {
    this.canvas = null;
  }

  setCanvas(instance: Canvas) {
    this.canvas = instance;
  }

  abstract draw(): void;
}
