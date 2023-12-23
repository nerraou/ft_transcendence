"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import dynamic from "next/dynamic";
import * as yup from "yup";

import Layout from "@components/templates/Layout";
import { useSocket } from "@contexts/socket";
import { useBoolean } from "@hooks/useBoolean";
import Loading from "@app/loading";
import useWindowEvent from "@hooks/useWindowEvent";

import { GameConfig } from "./hooks/useGame";
import ErrorModal from "./components/ErrorModal";
import GameOverModal, { GameOverStatus } from "./components/GameOverModal";

const Game = dynamic(() => import("./Game"), {
  ssr: false,
});

const HEX_COLOR_REGEX = /^#([0-9a-f]{3}){1,2}$/i;

const makeGameSchema = yup.object({
  paddleColor: yup
    .string()
    .matches(HEX_COLOR_REGEX, {
      message: "invalid color",
    })
    .required(),
  boardColor: yup
    .string()
    .matches(HEX_COLOR_REGEX, {
      message: "invalid color",
    })
    .required(),
  scoreToWin: yup.number().required().oneOf([3, 5, 10, 15, 20]),
});

export interface MakeGameOptions {
  paddleColor: string;
  boardColor: string;
  scoreToWin: number;
}

interface GameOverState {
  winnerId?: number;
  status?: "aborted" | "abandoned";
}

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

  useWindowEvent("keydown", (e) => {
    const cancelKeys = ["ArrowDown", "ArrowUp"];

    if (cancelKeys.includes(e.code)) {
      e.preventDefault();
    }
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const [makeGameOptions, setMakeGameOptions] = useState<MakeGameOptions>();
  const { value: isBadOptionsError, setTrue: raiseBadOptionsError } =
    useBoolean();

  const [gameConfig, setGameConfig] = useState<GameConfig>();
  const [gameStatus, setGameStatus] = useState<"idle" | "pending" | "started">(
    "idle",
  );
  const [gameOverState, setGameOverState] = useState<
    GameOverState | undefined
  >();
  // const { value: isGameAborted, setTrue } = useBoolean();

  const payload = useDecodeAccessToken({
    accessToken: session?.user.accessToken,
  });

  useEffect(() => {
    if (!socketClient) {
      return;
    }

    try {
      const paddleColor = searchParams.get("paddle_color");
      const boardColor = searchParams.get("board_color");
      const scoreToWin = searchParams.get("score_to_win");

      const options = makeGameSchema.validateSync({
        paddleColor,
        boardColor,
        scoreToWin,
      });

      setMakeGameOptions(options);

      setGameStatus("pending");

      socketClient?.emit("player-join-queue", {
        scoreToWin: options.scoreToWin,
      });
    } catch {
      raiseBadOptionsError();
    }
  }, [searchParams, socketClient, raiseBadOptionsError]);

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

  useEffect(() => {
    if (!socketClient) {
      return;
    }

    function onGameAborted() {
      setGameOverState({
        status: "aborted",
      });
    }

    function onGameOver(data: any) {
      setGameOverState(data);
    }

    socketClient.on("game-aborted", onGameAborted);
    socketClient.on("game-over", onGameOver);

    return () => {
      socketClient.removeListener("game-aborted", onGameAborted);
      socketClient.removeListener("game-over", onGameOver);
    };
  }, [socketClient]);

  function getGameOverStatus(): GameOverStatus | undefined {
    if (!gameOverState) {
      return;
    }

    if (gameOverState.status == "aborted") {
      return "aborted";
    }

    if (gameOverState.winnerId == payload.sub) {
      return "win";
    }

    return "lose";
  }

  if (sessionStatus === "unauthenticated") {
    redirect("/sign-in");
  }

  if (sessionStatus === "loading" || !payload) {
    return <Loading />;
  }

  if (isBadOptionsError) {
    return (
      <Layout>
        <ErrorModal
          isOpen={true}
          message="Failed to start game"
          onClose={() => null}
          onRetry={() => router.push("/game/make")}
        />
      </Layout>
    );
  }

  if (gameStatus == "pending") {
    return <h1>Pending...</h1>;
  }

  if (gameStatus == "idle") {
    return <Loading />;
  }

  if (!gameConfig || !makeGameOptions) {
    return <p>Something went wrong</p>;
  }

  const gameOverStatus = getGameOverStatus();

  return (
    <>
      <Game
        userId={payload.sub}
        config={gameConfig}
        preferences={makeGameOptions}
      />

      {gameOverStatus && (
        <GameOverModal
          isOpen={!!gameOverStatus}
          status={gameOverStatus}
          onClose={() => setGameOverState(undefined)}
          onNewGame={() => router.push("/game/make")}
          onRematch={() => {
            // handle rematch event
          }}
        />
      )}
    </>
  );
}
