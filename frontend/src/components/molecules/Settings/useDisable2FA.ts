import { useMutation } from "@tanstack/react-query";
import baseQuery, { RequestError } from "@utils/baseQuery";

interface UseDisable2FAParams {
  jwt: string | unknown;
}

export default function useDisable2FA(params: UseDisable2FAParams) {
  return useMutation<void, RequestError>({
    async mutationFn() {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/tfa/disable";

      const response = await baseQuery(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${params.jwt}`,
        },
      });

      return await response.json();
    },
  });
}
