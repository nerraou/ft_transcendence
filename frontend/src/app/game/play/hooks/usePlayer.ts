import { useCallback, useState } from "react";
import { Vector } from "p5";

import usePaddle from "./usePaddle";
import { PADDLE_PADDING, PADDLE_SPEED } from "../../constants";

export const PADDLE_WIDTH = 15;
export const PADDLE_HEIGHT = 100;

export type PaddleSide = "left" | "right";

export interface Board {
  width: number;
  height: number;
}

export interface UsePlayerParams {
  board: Board;
  side: PaddleSide;
}

interface ComputePositionFunctionArgs {
  board: Board;
  paddle: {
    width: number;
    height: number;
    side: PaddleSide;
  };
}

function computePosition(args: ComputePositionFunctionArgs) {
  const { board, paddle } = args;

  const y = board.height / 2 - paddle.height / 2;
  let x: number;

  if (paddle.side == "left") {
    x = PADDLE_PADDING;
  } else {
    x = board.width - PADDLE_PADDING - paddle.width;
  }

  return new Vector(x, y);
}

export default function usePlayer(params: UsePlayerParams) {
  const [yDirection, setYDirection] = useState(0);
  const [score, setScore] = useState(0);

  const paddle = usePaddle({
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,

    getPosition() {
      return computePosition({
        board: params.board,
        paddle: {
          side: params.side,
          width: PADDLE_WIDTH,
          height: PADDLE_HEIGHT,
        },
      });
    },
  });

  const moveUp = useCallback(function moveUp() {
    setYDirection(-1);
  }, []);

  const moveDown = useCallback(function moveDown() {
    setYDirection(1);
  }, []);

  const stopMoving = useCallback(function stopMoving() {
    setYDirection(0);
  }, []);

  const incrementScore = useCallback(function incrementScore() {
    setScore((value) => value + 1);
  }, []);

  const updatePosition = useCallback(
    function updatePosition(height: number) {
      let newY = paddle.position.y + yDirection * PADDLE_SPEED;

      if (newY < 0) {
        newY = 0;
      } else if (newY + paddle.height > height) {
        newY = height - paddle.height;
      }

      paddle.position.y = newY;
    },
    [paddle, yDirection],
  );

  return {
    paddle,
    isMoving: yDirection != 0,
    direction: yDirection,
    score,
    moveUp,
    moveDown,
    stopMoving,
    updatePosition,
    incrementScore,
  };
}
