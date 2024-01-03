"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import Layout from "@components/templates/Layout";
import useWindowEvent from "@hooks/useWindowEvent";
import Bar from "@components/atoms/decoration/Bar";
import Loading from "@app/loading";

import ActionsSection from "./components/ActionsSection";
import { CustomizeGameSection } from "./components/CustomizeGameSection";

import { BOARD_HEIGHT, BOARD_WIDTH } from "../constants";

const GameBoard = dynamic(() => import("./components/GameBoard"), {
  ssr: false,
});

export default function MakeGame() {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [scoreToWin, setScoreToWin] = useState("10");
  const [paddleColor, setPaddleColor] = useState("#7E2625");
  const [boardColor, setBoardColor] = useState("#EF9935");

  useWindowEvent("keydown", (e) => {
    const cancelKeys = ["ArrowDown", "ArrowUp"];

    if (cancelKeys.includes(e.code)) {
      e.preventDefault();
    }
  });

  if (sessionStatus === "unauthenticated") {
    redirect("/sign-in");
  }

  if (sessionStatus === "loading") {
    return <Loading />;
  }

  function resetHandler() {
    setScoreToWin("10");
    setPaddleColor("#7E2625");
    setBoardColor("#EF9935");
  }

  function playHandler() {
    const gameParams = new URLSearchParams();

    gameParams.set("paddle_color", paddleColor);
    gameParams.set("board_color", boardColor);
    gameParams.set("score_to_win", scoreToWin);

    const username = searchParams.get("username");

    if (username) {
      gameParams.append("username", username);
      gameParams.append("mode", "challenge");
    }

    router.push(`/game/play?${gameParams.toString()}`);
  }

  return (
    <Layout>
      <section className="px-8">
        <Bar width="w-2/3" margin="my-6" />

        <ActionsSection
          width="w-11/12"
          onReset={resetHandler}
          onPlay={playHandler}
        />

        <CustomizeGameSection
          scoreToWin={scoreToWin}
          onScoreToWinChange={setScoreToWin}
          paddleColor={paddleColor}
          onPaddleColorChange={setPaddleColor}
          boardColor={boardColor}
          onBoardColorChange={setBoardColor}
        />

        <GameBoard
          margin="mt-16 mb-16"
          position="m-auto"
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
          paddleColor={paddleColor}
          boardColor={boardColor}
        />
      </section>
    </Layout>
  );
}
