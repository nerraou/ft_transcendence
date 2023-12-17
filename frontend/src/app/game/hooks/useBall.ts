import { useState } from "react";

import { Ball } from "../classes/Ball";

interface UseBallParams {
  radius: number;
}

export default function useBall(params: UseBallParams) {
  const { radius } = params;

  const [ball] = useState(() => {
    const p = new Ball(0, 0, radius);

    return p;
  });

  return { ball };
}
