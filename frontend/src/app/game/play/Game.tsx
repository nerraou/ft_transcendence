"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";

import { useSocket } from "@contexts/socket";
import Layout from "@components/templates/Layout";
import Bar from "@components/atoms/decoration/Bar";

import useGame, { GameConfig } from "./hooks/useGame";
import useCanvas from "./hooks/useCanvas";
import { MakeGameOptions } from "./page";

import { BOARD_HEIGHT, BOARD_WIDTH } from "../constants";

interface GameProps {
  userId: number;
  config: GameConfig;
  preferences: MakeGameOptions;
}

export default function Game(props: GameProps) {
  const { userId, config: gameConfig, preferences } = props;

  const socketClient = useSocket();

  const { player, opponent, ball /* bounceBall */ } = useGame({
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    userId: userId,
    gameConfig: gameConfig,
  });
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement>();

  useEffect(() => {
    if (!canvasRef) {
      return;
    }

    canvasRef.style.width = "100%";
    canvasRef.style.height = "auto";
  }, [canvasRef]);

  const { elementRef } = useCanvas<HTMLDivElement>({
    setup(canvas) {
      canvas.create(BOARD_WIDTH, BOARD_HEIGHT);
      setCanvasRef(canvas.getCanvas());
    },

    draw(canvas) {
      canvas.background(preferences.boardColor);

      player.paddle.setCanvas(canvas);
      opponent.paddle.setCanvas(canvas);
      ball.setCanvas(canvas);

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

      player.paddle.draw(preferences.paddleColor);
      opponent.paddle.draw(preferences.paddleColor);

      canvas.stroke(preferences.paddleColor);
      canvas.getContext()?.setLineDash([3, 3]);
      canvas.line(BOARD_WIDTH / 2, BOARD_HEIGHT - 10, BOARD_WIDTH / 2, 10);

      ball.draw();
    },

    keyPressed(e) {
      const p = gameConfig.isPlayer ? player : opponent;

      switch (e.code) {
        case "ArrowDown":
          p.moveDown();
          break;
        case "ArrowUp":
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

  return (
    <Layout>
      <section className="px-16 sm:px-4">
        <Bar width="w-2/3" margin="my-6" />

        <section className="flex justify-between">
          <PlayerScore
            score={player.score}
            scoreToWin={gameConfig.scoreToWin}
            username={gameConfig.player.username || "(no name)"}
            image={gameConfig.player.avatar}
          />

          <PlayerScore
            score={opponent.score}
            scoreToWin={gameConfig.scoreToWin}
            username={gameConfig.opponent.username || "(no name)"}
            image={gameConfig.opponent.avatar}
            reverse
          />
        </section>

        <section
          className={clsx(
            "max-w-2xl p-10 mt-5 rounded-xl border-light-fg-primary m-auto",
            "bg-light-fg-link border-4",
            "dark:bg-dark-bg-tertiary border-4",
            "sm:border-none sm:p-0",
          )}
        >
          <div
            ref={elementRef}
            className="w-full border-4 border-light-fg-primary rounded-xl px-5 py-px"
            style={{
              backgroundColor: preferences.boardColor,
            }}
          />
        </section>
        {/* <div ref={debugElementRef} className="flex justify-center pt-10" /> */}
      </section>
    </Layout>
  );
}

interface PlayerScoreProps {
  username: string;
  image: string;
  scoreToWin: number;
  score: number;
  reverse?: boolean;
}

function PlayerScore(props: PlayerScoreProps) {
  const imageUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/" + props.image;

  return (
    <div
      className={clsx(
        "border-b border-light-fg-primary dark:border-dark-accent mb-10",
        {
          "rounded-bl-lg": !props.reverse,
          "rounded-br-lg": props.reverse,
        },
      )}
    >
      <label
        className={clsx(
          "block text-light-fg-primary text-xl",
          "dark:text-dark-fg-tertiary",
          "sm:text-base md:text-base sm:text-light-bg-tertiary",
          {
            "text-right": props.reverse,
          },
        )}
      >
        {props.username}
      </label>
      <section
        className={clsx("flex items-end gap-4", {
          "flex-row-reverse": props.reverse,
        })}
      >
        <div
          className={clsx(
            "relative shrink-0 w-32 h-32",
            "md:w-24 md:h-24 sm:w-16 sm:h-16",
          )}
        >
          <Image
            src={imageUrl}
            alt="user image"
            fill
            sizes="w-32 h-32"
            className="rounded-lg object-cover appearance-none"
          />
        </div>
        <output className="text-xxl sm:text-lg md:text-lg leading-none">
          <span className="text-light-fg-tertiary">{props.score}</span>
          <span className="text-light-fg-primary dark:text-dark-accent">
            /{props.scoreToWin}
          </span>
        </output>
      </section>
    </div>
  );
}
