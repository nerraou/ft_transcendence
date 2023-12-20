import { useEffect, useState } from "react";
import clsx from "clsx";

import useP5 from "../../hooks/useP5";
import usePlayer from "../../hooks/usePlayer";

interface GameBoardProps {
  width: number;
  height: number;
  paddleColor: string;
  boardColor: string;
  margin?: string;
  position?: string;
}

export default function GameBoard(props: GameBoardProps) {
  const { width, height, paddleColor, boardColor, margin, position } = props;

  const player = usePlayer({
    side: "left",
    board: {
      width,
      height,
    },
  });

  const opponent = usePlayer({
    side: "right",
    board: {
      width,
      height,
    },
  });

  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement>();
  const { elementRef: boardRef } = useP5<HTMLDivElement>({
    setup(p5) {
      const instance = p5.createCanvas(width, height);
      setCanvasRef(instance.canvas);
    },
    draw(p5) {
      player.paddle.setP5(p5);
      opponent.paddle.setP5(p5);

      p5.background(boardColor);

      player.updatePosition(height);

      player.paddle.draw(paddleColor);
      opponent.paddle.draw(paddleColor);

      p5.stroke(paddleColor);
      p5.drawingContext.setLineDash([3, 3]);
      p5.line(width / 2, height - 10, width / 2, 10);

      p5.noStroke();
      p5.circle(width / 2 + 100, height / 2 - 50, 20);
    },

    keyPressed(p5) {
      switch (p5.keyCode) {
        case p5.DOWN_ARROW:
          player.moveDown();
          break;
        case p5.UP_ARROW:
          player.moveUp();
          break;
      }
    },

    keyReleased() {
      player.stopMoving();
    },
  });

  useEffect(() => {
    if (!canvasRef) {
      return;
    }

    canvasRef.style.width = "100%";
    canvasRef.style.height = "auto";
  }, [canvasRef]);

  return (
    <section
      className={clsx(
        "max-w-2xl p-10 rounded-xl border-light-fg-primary",
        "bg-light-fg-link border-4",
        "dark:bg-dark-bg-tertiary border-4",
        "sm:border-none sm:p-0",
        position,
        margin,
      )}
    >
      <div
        ref={boardRef}
        className="w-full border-4 border-light-fg-primary rounded-xl px-5 py-px"
        style={{
          backgroundColor: boardColor,
        }}
      />
    </section>
  );
}
