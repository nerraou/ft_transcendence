import { useState } from "react";
import { Vector } from "p5";

import Paddle from "../classes/Paddle";

interface UsePaddleParams {
  width: number;
  height: number;

  getPosition: () => Vector;
}

export default function usePaddle(params: UsePaddleParams) {
  const { width, height, getPosition } = params;

  const [paddle] = useState(() => {
    const postion = getPosition();

    return new Paddle(postion.x, postion.y, width, height);
  });

  return paddle;
}
