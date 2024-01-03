import { ToastChallenge } from "@components/atoms/Toast";
import { useSocket } from "@contexts/socket";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useOnChallengeRecieved() {
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) {
      return;
    }

    function onMessage(data: any) {
      const toastId = toast.custom(
        <ToastChallenge
          username={data.username}
          scoreToWin={data.scoreToWin}
          token={data.token}
          onAccept={(token) => {
            toast.remove(toastId);

            const params = new URLSearchParams();
            params.append("token", token);
            params.append("mode", "accepted");

            router.push("/game/play?" + params.toString());
          }}
          onDecline={(token) => {
            toast.remove(toastId);

            socket?.emit("challenge-player-response", {
              token: token,
              action: "decline",
            });
          }}
        />,
        {
          duration: 10000,
        },
      );
    }

    socket.on("game-challenge", onMessage);

    return () => {
      socket.removeListener("game-challenge", onMessage);
    };
  }, [socket, router]);
}
