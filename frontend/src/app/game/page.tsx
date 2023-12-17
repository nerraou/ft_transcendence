"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import Button from "@components/atoms/Button";
import { useSocket } from "@contexts/socket";

import Game from "./Game";
import { GameConfig } from "./hooks/useGame";
import { Circle } from "@uiw/react-color";

function useDecodeAccessToken(params: any) {
  const [payload, setPayload] = useState<any>();

  useEffect(() => {
    if (!params.accessToken) {
      return;
    }

    const decoded = jwtDecode(params.accessToken);
    setPayload(decoded);
  }, [params.accessToken]);

  return payload;
}

export default function Page() {
  const { data: session, status: sessionStatus } = useSession();
  const socketClient = useSocket();
  const [hex, setHex] = useState("#fff");

  const [gameConfig, setGameConfig] = useState<GameConfig>();
  const [gameStatus, setGameStatus] = useState<"idle" | "pending" | "started">(
    "idle",
  );

  const payload = useDecodeAccessToken({
    accessToken: session?.user.accessToken,
  });

  useEffect(() => {
    if (!socketClient || !payload) {
      return;
    }

    function onGameStarted(data: GameConfig) {
      setGameStatus("started");

      const isPlayer = data.opponentId != payload.sub;

      setGameConfig({
        ...data,
        isPlayer,
      });
    }

    socketClient.on("game-started", onGameStarted);

    return () => {
      socketClient.removeListener("game-started", onGameStarted);
    };
  }, [socketClient, payload]);

  if (sessionStatus === "unauthenticated") {
    redirect("/sign-in");
  }

  if (sessionStatus === "loading" || !payload) {
    return <h1>Loading</h1>;
  }

  if (gameStatus == "pending") {
    return <h1>Pending...</h1>;
  }

  if (gameStatus == "idle") {
    return (
      <div>
        <Circle
          style={{ width: "200px" }}
          colors={[
            "#f44336",
            "#e91e63",
            "#9c27b0",
            "#673ab7",
            "#3f51b5",
            "#2196f3",
            "#03a9f4",
            "#00bcd4",
            "#009688",
            "#4caf50",
            "#8bc34a",
            "#cddc39",
            "#ffeb3b",
            "#ffc107",
            "#ff9800",
            "#ff5722",
            "#795548",
            "#607d8b",
          ]}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
          }}
        />

        <Button
          text="Start game"
          onClick={() => {
            setGameStatus("pending");
            socketClient?.emit("player-join-queue");
          }}
        />
      </div>
    );
  }

  if (!gameConfig) {
    return <p>Something went wrong</p>;
  }

  return <Game userId={payload.sub} config={gameConfig} />;
}
