"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import Layout from "@components/templates/Layout";

import ActionsSection from "./components/ActionsSection";
import { CustomizeGameSection } from "./components/CustomizeGameSection";
import GameBoard from "./components/GameBoard";
import useWindowEvent from "./hooks/useWindowEvent";

import { BOARD_HEIGHT, BOARD_WIDTH } from "../constants";

export default function MakeGame() {
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  const [scoreToWin, setScoreToWin] = useState("10");
  const [paddleColor, setPaddleColor] = useState("#7E2625");
  const [boardColor, setBoardColor] = useState("#EF9935");

  useWindowEvent("keydown", (e) => {
    e.preventDefault();
  });

  if (sessionStatus === "unauthenticated") {
    redirect("/sign-in");
  }

  if (sessionStatus === "loading") {
    return <h1>Loading</h1>;
  }

  function resetHandler() {
    setScoreToWin("10");
    setPaddleColor("#7E2625");
    setBoardColor("#EF9935");
  }

  function playHandler() {
    const searchParams = new URLSearchParams();
    searchParams.set("paddle_color", paddleColor);
    searchParams.set("board_color", boardColor);
    searchParams.set("score_to_win", scoreToWin);

    router.push(`/game?${searchParams.toString()}`);
  }

  return (
    <Layout>
      <section className="px-8 pt-8">
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
