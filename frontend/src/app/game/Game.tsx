"use client";

import { useEffect } from "react";

import { useSocket } from "@contexts/socket";

import useGame, { GameConfig } from "./hooks/useGame";
import useP5 from "./hooks/useP5";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./constants";

interface GameProps {
  userId: number;
  config: GameConfig;
}

export default function Game(props: GameProps) {
  const { userId, config: gameConfig } = props;

  const socketClient = useSocket();

  const { player, opponent, ball /* bounceBall */ } = useGame({
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    userId: userId,
    gameConfig: gameConfig,
  });

  const { elementRef } = useP5<HTMLDivElement>({
    setup(p5) {
      p5.background(0);
      p5.createCanvas(BOARD_WIDTH, BOARD_HEIGHT);
    },

    draw(p5) {
      p5.background("gray");
      player.paddle.setP5(p5);
      opponent.paddle.setP5(p5);
      ball.setP5(p5);

      //   bounceBall();
      player.updatePosition(BOARD_HEIGHT);
      opponent.updatePosition(BOARD_HEIGHT);

      const p = gameConfig.isPlayer ? player : opponent;

      if (p.isMoving) {
        socketClient?.emit("player-moved", {
          gameId: gameConfig.gameId,
          y: p.paddle.position.y,
        });
      }

      player.paddle.draw();
      opponent.paddle.draw();
      ball.draw();
    },

    keyPressed(p5) {
      const p = gameConfig.isPlayer ? player : opponent;

      switch (p5.keyCode) {
        case p5.DOWN_ARROW:
          p.moveDown();
          break;
        case p5.UP_ARROW:
          p.moveUp();
          break;
      }
    },

    keyReleased() {
      if (gameConfig.isPlayer) {
        player.stopMoving();
      } else {
        opponent.stopMoving();
      }
    },
  });

  const { elementRef: debugElementRef, p5 } = useP5<HTMLDivElement>({
    setup() {
      //
    },
    draw() {
      //
    },
  });

  useEffect(() => {
    if (!socketClient || !p5) {
      return;
    }

    function onGameDebug(data: any) {
      const {
        paddleWidth,
        paddleHeight,
        leftPaddle,
        rightPaddle,
        boardWidth,
        boardHeight,
        ballX,
        ballY,
        ballRadius,
      } = data;

      p5.createCanvas(boardWidth, boardHeight);
      p5.background("gray");

      p5.noStroke();
      p5.fill("white");
      p5.rect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
      p5.rect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

      p5.circle(ballX, ballY, ballRadius);
    }

    function onGameAborted() {
      alert("game aborted");
    }

    function onGameOver() {
      alert("game over");
    }

    socketClient.on("game-debug", onGameDebug);
    socketClient.on("game-aborted", onGameAborted);
    socketClient.on("game-over", onGameOver);

    return () => {
      socketClient.removeListener("game-debug", onGameDebug);
      socketClient.removeListener("game-aborted", onGameAborted);
      socketClient.removeListener("game-over", onGameOver);
    };
  }, [p5, socketClient]);

  return (
    <main>
      <div ref={elementRef} className="flex justify-center pt-10" />
      <div ref={debugElementRef} className="flex justify-center pt-10" />
    </main>
  );
}
