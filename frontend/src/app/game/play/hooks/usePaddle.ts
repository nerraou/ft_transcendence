import { useState } from "react";

import Paddle from "../classes/Paddle";
import { Vector } from "../classes/Vector";

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
