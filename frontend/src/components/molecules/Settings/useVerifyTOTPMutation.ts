import { useMutation } from "@tanstack/react-query";
import baseQuery, { RequestError } from "@utils/baseQuery";

interface UseVerifyTOTPMutationParams {
  jwt: string | unknown;
}

interface UseVerifyTOTPMutationPayload {
  secret: string;
  token: string;
}

interface UseVerifyTOTPMutationResponse {
  secret: string;
  keyuri: string;
}

export default function useVerifyTOTPMutation(
  params: UseVerifyTOTPMutationParams,
) {
  return useMutation<
    UseVerifyTOTPMutationResponse,
    RequestError,
    UseVerifyTOTPMutationPayload
  >({
    async mutationFn(data) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/totp/verify";

      const response = await baseQuery(url, {
        method: "POST",
        body: JSON.stringify({
          secret: data.secret,
          token: data.token,
        }),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${params.jwt}`,
        },
      });

      return await response.json();
    },
  });
}
