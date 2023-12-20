"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import Button from "@components/atoms/Button";
import { useSocket } from "@contexts/socket";

import Game from "./Game";
import { GameConfig } from "./hooks/useGame";

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
