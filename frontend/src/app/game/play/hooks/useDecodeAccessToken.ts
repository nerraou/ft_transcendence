import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface UseDecodeAccessTokenParams {
  accessToken: string | unknown;
}

function useDecodeAccessToken(params: UseDecodeAccessTokenParams) {
  const [payload, setPayload] = useState<JwtPayload>();

  useEffect(() => {
    if (typeof params.accessToken != "string") {
      return;
    }

    const decoded = jwtDecode(params.accessToken);

    setPayload(decoded);
  }, [params.accessToken]);

  return payload;
}

export default useDecodeAccessToken;
