import { useEffect, useState } from "react";
import clsx from "clsx";

import useCanvas from "../../play/hooks/useCanvas";
import usePlayer from "../../play/hooks/usePlayer";

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
  const { elementRef: boardRef } = useCanvas<HTMLDivElement>({
    setup(instance) {
      instance.create(width, height);
      setCanvasRef(instance.getCanvas());
    },
    draw(canvas) {
      player.paddle.setCanvas(canvas);
      opponent.paddle.setCanvas(canvas);

      canvas.background(boardColor);
      player.updatePosition(height);

      player.paddle.draw(paddleColor);
      opponent.paddle.draw(paddleColor);

      canvas.stroke(paddleColor);
      canvas.getContext()?.setLineDash([3, 3]);
      canvas.line(width / 2, height - 10, width / 2, 10);

      canvas.circle(width / 2 + 100, height / 2 - 50, 20);
    },

    keyPressed(e) {
      switch (e.code) {
        case "ArrowDown":
          player.moveDown();
          break;
        case "ArrowUp":
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
