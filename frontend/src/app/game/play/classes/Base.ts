export default abstract class Base {
  public p5: Record<string, any> | null;

  constructor() {
    this.p5 = null;
  }

  setP5(instance: any) {
    this.p5 = instance;
  }

  abstract draw(): void;
}
