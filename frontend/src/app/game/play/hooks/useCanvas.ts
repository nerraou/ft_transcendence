import { useCallback, useEffect, useRef } from "react";

import {
  Canvas,
  DrawFunction,
  KeyPressedFunction,
  KeyReleasedFunction,
  SetupFunction,
} from "../classes/Canvas";

interface UseCanvasParams {
  draw: SetupFunction;
  setup: DrawFunction;
  keyPressed?: KeyPressedFunction;
  keyReleased?: KeyReleasedFunction;
}

export default function useCanvas<T extends HTMLElement>(
  params: UseCanvasParams,
) {
  const { setup, draw } = params;

  const elementRef = useRef<T>(null);

  const setupFunctionRef = useRef<SetupFunction>();
  const drawFunctionRef = useRef<DrawFunction>();
  const keyPressedFunctionRef = useRef<KeyPressedFunction>();
  const keyReleasedFunctionRef = useRef<KeyReleasedFunction>();

  useEffect(() => {
    setupFunctionRef.current = setup;
    drawFunctionRef.current = draw;

    keyPressedFunctionRef.current = params.keyPressed;
    keyReleasedFunctionRef.current = params.keyReleased;
  });

  const sketch = useCallback(function sketch(canvas: Canvas) {
    canvas.onSetup(() => {
      if (setupFunctionRef.current) {
        setupFunctionRef.current(canvas);
      }
    });

    canvas.onDraw(() => {
      if (drawFunctionRef.current) {
        drawFunctionRef.current(canvas);
      }
    });

    canvas.onKeyPressed((e) => {
      if (keyPressedFunctionRef.current) {
        keyPressedFunctionRef.current(e, canvas);
      }
    });

    canvas.onKeyReleased((e) => {
      if (keyReleasedFunctionRef.current) {
        keyReleasedFunctionRef.current(e, canvas);
      }
    });
  }, []);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const instance = new Canvas(sketch, elementRef.current);

    return () => {
      instance.remove();
    };
  }, [sketch]);

  return {
    elementRef,
  };
}
