"use client";

import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

interface SocketProviderProps {
  children: ReactNode | ReactNode[];
}

const socketContext = createContext<Socket | null>(null);

export function useSocket() {
  return useContext(socketContext);
}

export function SocketProvider(props: SocketProviderProps) {
  const [socketClient, setSocketClient] = useState<Socket | null>(null);
  const { status, data } = useSession();

  useEffect(() => {
    if (status != "authenticated") {
      return;
    }

    const client = io(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
      extraHeaders: {
        authorization: `Bearer ${data.user.accessToken}`,
      },
    });

    setSocketClient(client);

    return () => {
      client.close();
    };
  }, [status, data]);

  return (
    <socketContext.Provider value={socketClient}>
      {props.children}
    </socketContext.Provider>
  );
}
