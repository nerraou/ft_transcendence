import { useEffect, useState } from "react";
import { Vector } from "p5";

import { useSocket } from "@contexts/socket";

import useBall from "./useBall";
import usePlayer, { PaddleSide } from "./usePlayer";

export interface PlayerEntity {
  id: number;
  rating: number;
  socketId: string;
  avatar: string;
  username: string;
}

export interface GameConfig {
  gameId: string;
  scoreToWin: number;
  ballSpeed: number;
  paddleSpeed: number;
  ballDirection: number;
  opponentId: number;
  isPlayer: boolean;
  ballPosition: {
    x: number;
    y: number;
  };
  player: PlayerEntity;
  opponent: PlayerEntity;
}

interface UseGameParams {
  userId: number;
  gameConfig: GameConfig;
  width: number;
  height: number;
}

function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function useGame(params: UseGameParams) {
  const { gameConfig, width, height } = params;

  const socketClient = useSocket();

  const [xDirection, setXDirection] = useState(-1);
  const [yDirection, setYDirection] = useState(-1);

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

  const { ball } = useBall({
    radius: 20,
  });

  const { incrementScore: incrementPlayerScore } = player;
  const { incrementScore: incrementOpponentScore } = opponent;

  useEffect(() => {
    if (!socketClient || !gameConfig) {
      return;
    }

    function onOpponentMoved(data: any) {
      if (gameConfig?.isPlayer) {
        opponent.paddle.position.y = data.y;
      } else {
        player.paddle.position.y = data.y;
      }
    }

    socketClient.on("opponent-moved", onOpponentMoved);

    return () => {
      socketClient.removeListener("opponent-moved", onOpponentMoved);
    };
  }, [socketClient, opponent.paddle, player.paddle, gameConfig]);

  useEffect(() => {
    if (!socketClient) {
      return;
    }

    function onBallMoved(data: any) {
      ball.position.x = data.x;
      ball.position.y = data.y;
    }

    socketClient.on("ball-moved", onBallMoved);

    return () => {
      socketClient.removeListener("ball-moved", onBallMoved);
    };
  }, [socketClient, ball]);

  useEffect(() => {
    if (!socketClient) {
      return;
    }

    function onBallOut(data: any) {
      const { scoreFor } = data;
      if (scoreFor == "player") {
        incrementPlayerScore();
      } else {
        incrementOpponentScore();
      }
    }

    socketClient.on("ball-out", onBallOut);

    return () => {
      socketClient.removeListener("ball-out", onBallOut);
    };
  }, [socketClient, incrementPlayerScore, incrementOpponentScore]);

  function handleLeftPaddleTouch() {
    const p = player;

    if (ball.position.y < p.paddle.position.y) {
      return false;
    }

    if (ball.position.y > p.paddle.position.y + p.paddle.height) {
      return false;
    }

    if (ball.position.x > p.paddle.position.x + p.paddle.width) {
      return false;
    }

    ball.position.x = p.paddle.position.x + p.paddle.width + ball.radius + 1;

    return true;
  }

  function handleRightPaddleTouch() {
    const p = opponent;

    if (ball.position.y < p.paddle.position.y) {
      return false;
    }

    if (ball.position.y > p.paddle.position.y + p.paddle.height) {
      return false;
    }

    if (ball.position.x < p.paddle.position.x) {
      return false;
    }

    ball.position.x = p.paddle.position.x - ball.radius - 1;

    return true;
  }

  function resetBall(outSide: PaddleSide) {
    ball.position = new Vector(width / 2, height / 2);

    if (outSide == "left") {
      setXDirection(1);
    } else {
      setXDirection(-1);
    }

    const yDirections = [-1, 1];
    setYDirection(yDirections[randomInt(0, 1)]);
  }

  function bounceBall() {
    let newXDirection: -1 | 1 | undefined;
    let newYDirection: -1 | 1 | undefined;
    let outSide: PaddleSide | undefined;

    if (ball.position.x <= 0) {
      outSide = "left";
    } else if (ball.position.x >= width) {
      outSide = "right";
    }

    if (outSide) {
      resetBall(outSide);
      // onBallOut(outSide);
      return;
    }

    if (handleLeftPaddleTouch()) {
      newXDirection = 1;
    } else if (handleRightPaddleTouch()) {
      newXDirection = -1;
    }

    if (ball.position.y <= 0) {
      newYDirection = 1;
    } else if (ball.position.y >= height) {
      newYDirection = -1;
    }

    if (newXDirection) {
      ball.position.x += newXDirection * gameConfig.ballSpeed;
      setXDirection(newXDirection);
    } else {
      ball.position.x += xDirection * gameConfig.ballSpeed;
    }

    if (newYDirection) {
      ball.position.y += newYDirection * gameConfig.ballSpeed;
      setYDirection(newYDirection);
    } else {
      ball.position.y += yDirection * gameConfig.ballSpeed;
    }
  }

  return {
    ball,
    player,
    opponent,
    bounceBall,
  };
}
