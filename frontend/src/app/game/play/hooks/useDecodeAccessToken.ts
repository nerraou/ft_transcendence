import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface UseDecodeAccessTokenParams {
  accessToken: string | unknown;
}

export interface AccessTokenPayload {
  sub: number;
}

function useDecodeAccessToken(params: UseDecodeAccessTokenParams) {
  const [payload, setPayload] = useState<AccessTokenPayload>();

  useEffect(() => {
    if (typeof params.accessToken != "string") {
      return;
    }

    const decoded = jwtDecode<AccessTokenPayload>(params.accessToken);

    setPayload(decoded);
  }, [params.accessToken]);

  return payload;
}

export default useDecodeAccessToken;
