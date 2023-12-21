import { useCallback, useEffect, useRef, useState } from "react";
import P5 from "p5";

type SetupFunction = (p5: any) => void;
type DrawFunction = (p5: any) => void;

type KeyPressedFunction = (p5: any, e: KeyboardEvent) => void;
type KeyReleasedFunction = (p5: any, e: KeyboardEvent) => void;

interface UseP5Params {
  draw: SetupFunction;
  setup: DrawFunction;
  keyPressed?: KeyPressedFunction;
  keyReleased?: KeyReleasedFunction;
}

export default function useP5<T extends HTMLElement>(params: UseP5Params) {
  const { setup, draw } = params;

  const elementRef = useRef<T>(null);

  const setupFunctionRef = useRef<SetupFunction>();
  const drawFunctionRef = useRef<DrawFunction>();
  const keyPressedFunctionRef = useRef<KeyPressedFunction>();
  const keyReleasedFunctionRef = useRef<KeyReleasedFunction>();

  const [p5Instance, setP5Instance] = useState<any>(null);

  useEffect(() => {
    setupFunctionRef.current = setup;
    drawFunctionRef.current = draw;

    keyPressedFunctionRef.current = params.keyPressed;
    keyReleasedFunctionRef.current = params.keyReleased;
  });

  const sketch = useCallback(function sketch(p: any) {
    p.setup = () => {
      if (setupFunctionRef.current) {
        setupFunctionRef.current(p);
      }
    };

    p.draw = () => {
      if (drawFunctionRef.current) {
        drawFunctionRef.current(p);
      }
    };

    p.keyPressed = (e: KeyboardEvent) => {
      if (keyPressedFunctionRef.current) {
        keyPressedFunctionRef.current(p, e);
      }
    };

    p.keyReleased = (e: KeyboardEvent) => {
      if (keyReleasedFunctionRef.current) {
        keyReleasedFunctionRef.current(p, e);
      }
    };
  }, []);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const instance = new P5(sketch, elementRef.current);
    setP5Instance(instance);

    return () => {
      instance.remove();
    };
  }, [sketch]);

  return {
    p5: p5Instance,
    elementRef,
  };
}
