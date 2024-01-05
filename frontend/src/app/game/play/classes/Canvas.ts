export type SetupFunction = (instance: Canvas) => void;
export type DrawFunction = (instance: Canvas) => void;

export type WindowEventWrapper = (e: KeyboardEvent) => void;

export type KeyPressedFunction = (e: KeyboardEvent, instance: Canvas) => void;
export type KeyReleasedFunction = (e: KeyboardEvent, instance: Canvas) => void;
export type SketchFunction = (instance: Canvas) => void;

export class Canvas {
  private canvas: HTMLCanvasElement | undefined;
  private container: HTMLElement;
  private width: number | undefined;
  private height: number | undefined;

  private _intervalId: NodeJS.Timeout | undefined;
  private context: CanvasRenderingContext2D | undefined | null;

  private fillStyle: string | CanvasGradient | CanvasPattern = "#000";
  private strokeStyle: string | CanvasGradient | CanvasPattern = "#000";

  private setup: SetupFunction | undefined;
  private draw: DrawFunction | undefined;
  private keyPressed: WindowEventWrapper | undefined;
  private keyReleased: WindowEventWrapper | undefined;

  constructor(sketch: SketchFunction, element: HTMLElement) {
    this.container = element;

    sketch(this);
    this.start();
  }

  create(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;

    this.context = this.canvas.getContext("2d");

    this.container.appendChild(this.canvas);
  }

  background(color: string) {
    if (this.width && this.height) {
      this.fill(color);
      this.rect(0, 0, this.width, this.height);
    }
  }

  fill(fillStyle: string | CanvasGradient | CanvasPattern) {
    this.fillStyle = fillStyle;
  }

  stroke(strokeStyle: string | CanvasGradient | CanvasPattern) {
    if (!this.context) {
      return;
    }

    this.context.strokeStyle = strokeStyle;
  }

  line(x1: number, y1: number, x2: number, y2: number) {
    if (!this.context) {
      return;
    }

    this.context.beginPath();

    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);

    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();

    this.context.closePath();
  }

  rect(x: number, y: number, width: number, height: number) {
    if (!this.context) {
      return;
    }

    this.context.beginPath();
    this.context.fillStyle = this.fillStyle;

    this.context.fillRect(x, y, width, height);

    this.context.fill();
    this.context.closePath();
  }

  circle(x: number, y: number, radius: number) {
    if (!this.context) {
      return;
    }

    this.context.beginPath();
    this.context.arc(x, y, radius / 2, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
  }

  onSetup(handler: SetupFunction) {
    this.setup = handler;
  }

  onDraw(handler: DrawFunction) {
    this.draw = handler;
  }

  onKeyPressed(handler: KeyPressedFunction) {
    const handlerWrapper = (e: KeyboardEvent) => {
      handler(e, this);
    };

    this.keyPressed = handlerWrapper;

    window.addEventListener("keydown", handlerWrapper);
  }

  onKeyReleased(handler: KeyReleasedFunction) {
    const handlerWrapper = (e: KeyboardEvent) => {
      handler(e, this);
    };

    this.keyReleased = handlerWrapper;

    window.addEventListener("keyup", handlerWrapper);
  }

  getCanvas() {
    return this.canvas;
  }

  getContext() {
    return this.context;
  }

  private start() {
    this.invokeSetup(this);
    this.invokeDraw(this);
  }

  private invokeSetup(instance: Canvas) {
    if (this.setup) {
      this.setup(instance);
    }
  }

  private invokeDraw(instance: Canvas) {
    this._intervalId = setInterval(() => {
      if (this.draw) {
        this.draw(instance);
      }
    }, 1000 / 60);
  }

  remove() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }

    if (this.keyPressed) {
      window.removeEventListener("keydown", this.keyPressed);
    }

    if (this.keyReleased) {
      window.removeEventListener("keyup", this.keyReleased);
    }

    if (this.canvas) {
      this.canvas.parentNode?.removeChild(this.canvas);
    }
  }
}
