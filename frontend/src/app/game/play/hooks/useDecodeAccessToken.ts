import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

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

export default useDecodeAccessToken;
