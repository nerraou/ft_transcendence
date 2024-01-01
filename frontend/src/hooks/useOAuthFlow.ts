import { useState } from "react";
import useWindow from "./useWindow";

interface OAuthData {
  isSuccess: boolean;
  isError: boolean;
  error: any;
  provider: "google" | "42";
}

interface State {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export default function useOAuthFlow() {
  const [state, setState] = useState<State>(() => {
    return {
      isError: false,
      isPending: false,
      isSuccess: false,
      isIdle: true,
    };
  });

  const { open: startOAuthFlow } = useWindow<OAuthData>({
    width: 500,
    height: 600,
    onMessage(data) {
      if (data.isSuccess) {
        setState({
          isSuccess: true,
          isError: false,
          isPending: false,
        });
      } else {
        setState({
          isSuccess: false,
          isError: true,
          isPending: false,
        });
      }
    },
  });

  function startGoogleOAuthFlow() {
    setState({
      ...state,
      isPending: true,
    });

    const authorizeUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/google/authorize";

    startOAuthFlow(authorizeUrl);
  }

  function start42OAuthFlow() {
    setState({
      ...state,
      isPending: true,
    });

    const authorizeUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/42/authorize";

    startOAuthFlow(authorizeUrl);
  }

  return {
    ...state,
    startGoogleOAuthFlow,
    start42OAuthFlow,
  };
}
