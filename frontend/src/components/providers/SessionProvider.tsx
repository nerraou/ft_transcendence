"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode | ReactNode[];
}

function AuthSessionProvider(props: SessionProviderProps) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      {props.children}
    </SessionProvider>
  );
}

export default AuthSessionProvider;
